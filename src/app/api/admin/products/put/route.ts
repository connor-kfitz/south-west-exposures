import pool from '@/lib/db';
import { NextResponse } from 'next/server';
import { ProductImage } from '@/types/admin-products';
import { PoolClient } from 'pg';

export async function PUT(req: Request) {
  const client = await pool.connect();

  try {

    const formData = await parseFormData(req);

    if (!formData.productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await client.query('BEGIN');

    const checkResult = await checkProductExists(formData.productId, client);

    if (checkResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await client.query(
      `UPDATE products SET name = $1, description = $2, features = $3, material = $4 WHERE product_id = $5;`,
      [formData.name, formData.description, formData.features, formData.material, formData.productId]
    );

    await updateAttribute(client, formData.productId, formData.customizationOptions, 'products_customization_options', ['product_id', 'customization_option_id', 'filter_id'], formData.customizationOptionFilterId);
    await updateAttribute(client, formData.productId, formData.usages, 'products_usages', ['product_id', 'usage_id', 'filter_id'], formData.usageFilterId);
    await updateAttribute(client, formData.productId, formData.isotopes, 'products_isotopes', ['product_id', 'isotope_id', 'filter_id'], formData.isotopeFilterId);
    await updateAttribute(client, formData.productId, formData.volumes, 'products_volumes', ['product_id', 'volume_id', 'filter_id'], formData.volumeFilterId);
    await updateAttribute(client, formData.productId, formData.shields, 'products_shields', ['product_id', 'shield_id', 'filter_id'], formData.shieldFilterId);
    await updateAttribute(client, formData.productId, formData.accessories, 'products_accessories', ['product_id', 'accessory_id', 'filter_id'], formData.accessoryFilterId);
    await updateFaqs(client, formData);
    await updateImages(client, formData);
    await updateSpecifications(client, formData);
    await updateRealtedProducts(client, formData);
    await updatePurchasedTogether(client, formData);

    await client.query('COMMIT');

    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during PUT request:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  } finally {
    client.release();
  }
}

async function parseFormData(req: Request) {
  const formData = await req.formData();
  const images = JSON.parse(formData.get('images') as string || '[]');
  const imageFiles = formData.getAll('imageFiles');

  return {
    productId: formData.get('productId'),
    name: formData.get('name'),
    description: formData.get('description'),
    features: JSON.parse((formData.get('features') as string) || '[]'),
    material: formData.get('material'),
    customizationOptions: JSON.parse(formData.get('customizationOptions') as string || '[]'),
    customizationOptionFilterId: formData.get('customizationOptionFilterId'),
    usages: JSON.parse(formData.get('usages') as string || '[]'),
    usageFilterId: formData.get('usageFilterId'),
    isotopes: JSON.parse(formData.get('isotopes') as string || '[]'),
    isotopeFilterId: formData.get('isotopeFilterId'),
    volumes: JSON.parse(formData.get('volumes') as string || '[]'),
    volumeFilterId: formData.get('volumeFilterId'),
    shields: JSON.parse(formData.get('shields') as string || '[]'),
    shieldFilterId: formData.get('shieldFilterId'),
    accessories: JSON.parse(formData.get('accessories') as string || '[]'),
    accessoryFilterId: formData.get('accessoryFilterId'),
    specifications: JSON.parse(formData.get('specifications') as string || '[]'),
    faqs: JSON.parse(formData.get('faqs') as string || '[]'),
    relatedProducts: JSON.parse(formData.get('relatedProducts') as string || '[]'),
    purchasedTogether: JSON.parse(formData.get('purchasedTogether') as string || '[]'),
    images: images.map((image: ProductImage, index: number) => ({
      ...image,
      file: imageFiles[index]
    }))
  };
}

async function checkProductExists(productId: FormDataEntryValue | null, client: PoolClient) {
  return (await client.query('SELECT * FROM products WHERE product_id = $1', [productId]));
}

async function updateImages(client: PoolClient, formData: ProductFormData) {
  if (formData.images && Array.isArray(formData.images)) {
    const existingImages = await client.query(
      `SELECT image_id FROM product_images WHERE product_id = $1;`,
      [formData.productId]
    );
    const existingImageIds = existingImages.rows.map((img) => img.image_id);
    const incomingImageIds = formData.images.map((img) => img.id).filter((id) => id);
    const imagesToDelete = existingImageIds.filter((id) => !incomingImageIds.includes(id));

    if (imagesToDelete.length > 0) {
      await client.query(
        `DELETE FROM product_images WHERE image_id = ANY($1::uuid[]);`,
        [imagesToDelete]
      );
    }

    for (const [index, image] of formData.images.entries()) {
      const { id, file, src } = image;

      if (src) {
        await client.query(
          `UPDATE product_images SET display_order = $1 WHERE image_id = $2;`,
          [index, id]
        );
      } else if (file) {
        const uploadResponse = await fetch(
          `${process.env.DOMAIN_NAME}/api/vercel/uploadBlob?filename=${file.name}`,
          { method: 'POST', body: file }
        );

        const uploadData = await uploadResponse.json();
        if (uploadData.error) {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        await client.query(
          `INSERT INTO product_images (product_id, src, display_order) VALUES ($1, $2, $3);`,
          [formData.productId, uploadData.url, index]
        );
      }
    }
  }
}

async function updateAttribute(
  client: PoolClient,
  productId: FormDataEntryValue | null,
  dataArray: { id: string }[],
  tableName: string,
  columns: string[],
  filterId: FormDataEntryValue | null
) {
  if (!dataArray || !Array.isArray(dataArray)) return;

  const existingRecords = await client.query(
    `SELECT ${columns[1]} FROM ${tableName} WHERE product_id = $1;`,
    [productId]
  );

  const existingIds = existingRecords.rows.map((row) => row[columns[1]]);
  const newIds = dataArray.map((data) => data.id);
  const recordsToDelete = existingIds.filter((id) => !newIds.includes(id));

  if (recordsToDelete.length > 0) {
    await client.query(
      `DELETE FROM ${tableName} WHERE product_id = $1 AND ${columns[1]} = ANY($2::uuid[]);`,
      [productId, recordsToDelete]
    );
  }

  for (const data of dataArray) {
    if (!existingIds.includes(data.id)) {
      const values = [productId, data.id, filterId].slice(0, columns.length);
      await client.query(
        `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')});`,
        values
      );
    }
  }
}

async function updateSpecifications(client: PoolClient, formData: ProductFormData) {
  if (formData.specifications && Array.isArray(formData.specifications)) {
    const existingSpecs = await client.query(
      `SELECT volume_id FROM products_volume_metrics WHERE product_id = $1;`,
      [formData.productId]
    );

    const existingVolumeIds = existingSpecs.rows.map((row) => row.volume_id);
    const newVolumeIds = formData.specifications.map((spec) => spec.volume);
    const specsToDelete = existingVolumeIds.filter((id) => !newVolumeIds.includes(id));

    if (specsToDelete.length > 0) {
      await client.query(
        `DELETE FROM products_volume_metrics WHERE product_id = $1 AND volume_id = ANY($2::uuid[]);`,
        [formData.productId, specsToDelete]
      );
    }

    for (const spec of formData.specifications) {
      const existingSpec = await client.query(
        `SELECT * FROM products_volume_metrics WHERE product_id = $1 AND volume_id = $2;`,
        [formData.productId, spec.volume]
      );

      if (existingSpec.rows.length > 0) {
        await client.query(
          `UPDATE products_volume_metrics
             SET weight = $3, height = $4, inner_diameter = $5, outer_diameter = $6,
                 shielding_side = $7, shielding_side_pb_equiv = $8, 
                 top_shield = $9, top_shield_pb_equiv = $10, 
                 bottom = $11, bottom_pb_equiv = $12
             WHERE product_id = $1 AND volume_id = $2;`,
          [
            formData.productId, spec.volume, spec.weight, spec.height, spec.innerDiameter, spec.outerDiameter,
            spec.shieldingSide, spec.shieldingSidePbEquiv, spec.topShield, spec.topShieldPbEquiv,
            spec.bottom, spec.bottomPbEquiv
          ]
        );
      } else {
        await client.query(
          `INSERT INTO products_volume_metrics (
               product_id, volume_id, weight, height, inner_diameter, outer_diameter,
               shielding_side, shielding_side_pb_equiv, top_shield, top_shield_pb_equiv,
               bottom, bottom_pb_equiv
             ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
          [
            formData.productId, spec.volume, spec.weight, spec.height, spec.innerDiameter, spec.outerDiameter,
            spec.shieldingSide, spec.shieldingSidePbEquiv, spec.topShield, spec.topShieldPbEquiv,
            spec.bottom, spec.bottomPbEquiv
          ]
        );
      }
    }
  }
}

async function updateFaqs(client: PoolClient, formData: ProductFormData) {
  if (formData.faqs && Array.isArray(formData.faqs)) {
    const existingFaqs = await client.query(
      `SELECT product_faq_id FROM products_faqs WHERE product_id = $1;`,
      [formData.productId]
    );

    const existingFaqIds = existingFaqs.rows.map((row) => row.product_faq_id);
    const incomingFaqIds = formData.faqs.map((faq) => faq.id).filter((id) => id);
    const faqsToDelete = existingFaqIds.filter((id) => !incomingFaqIds.includes(id));

    if (faqsToDelete.length > 0) {
      await client.query(
        `DELETE FROM products_faqs WHERE product_faq_id = ANY($1::uuid[]);`,
        [faqsToDelete]
      );
    }

    for (const faq of formData.faqs) {
      if (faq.id) {
        await client.query(
          `UPDATE products_faqs SET question = $1, answer = $2 WHERE product_faq_id = $3;`,
          [faq.question, faq.answer, faq.id]
        );
      } else {
        if (!faq.question || !faq.answer) return;
        
        await client.query(
          `INSERT INTO products_faqs (product_id, question, answer) VALUES ($1, $2, $3);`,
          [formData.productId, faq.question, faq.answer]
        );
      }
    }
  }
}

async function updateRealtedProducts(client: PoolClient, formData: ProductFormData) {
  if (formData.relatedProducts && Array.isArray(formData.relatedProducts)) {
    const existingRelated = await client.query(
      `SELECT product_related_id, related_product_id FROM products_related WHERE product_id = $1;`,
      [formData.productId]
    );

    const existingRelatedIds = existingRelated.rows.map((row) => row.related_product_id);
    const newRelatedIds = formData.relatedProducts.map((prod) => prod.id).filter((id) => id);
    const relatedToDelete = existingRelatedIds.filter((id) => !newRelatedIds.includes(id));

    if (relatedToDelete.length > 0) {
      await client.query(
        `DELETE FROM products_related WHERE product_id = $1 AND related_product_id = ANY($2::uuid[]);`,
        [formData.productId, relatedToDelete]
      );
    }

    for (const related of formData.relatedProducts) {
      if (!existingRelatedIds.includes(related.id)) {
        await client.query(
          `INSERT INTO products_related (product_id, related_product_id) VALUES ($1, $2);`,
          [formData.productId, related.id]
        );
      }
    }
  }
}

async function updatePurchasedTogether(client: PoolClient, formData: ProductFormData) {
  if (formData.purchasedTogether && Array.isArray(formData.purchasedTogether)) {
    const existing = await client.query(
      `SELECT product_purchased_together_id, purchased_together_product_id FROM products_purchased_together WHERE product_id = $1;`,
      [formData.productId]
    );

    const existingIds = existing.rows.map((row) => row.purchased_together_product_id);
    const newIds = formData.purchasedTogether.map((item) => item.id).filter((id) => id);
    const toDelete = existingIds.filter((id) => !newIds.includes(id));

    if (toDelete.length > 0) {
      await client.query(
        `DELETE FROM products_purchased_together WHERE product_id = $1 AND purchased_together_product_id = ANY($2::uuid[]);`,
        [formData.productId, toDelete]
      );
    }

    for (const item of formData.purchasedTogether) {
      if (!existingIds.includes(item.id)) {
        await client.query(
          `INSERT INTO products_purchased_together (product_id, purchased_together_product_id) VALUES ($1, $2);`,
          [formData.productId, item.id]
        );
      }
    }
  }
}

type ProductFormData = {
  productId: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
  description: FormDataEntryValue | null;
  features: string[];
  material: FormDataEntryValue | null;
  customizationOptions: ProductAttribute[];
  customizationOptionFilterId: FormDataEntryValue | null;
  usages: ProductAttribute[];
  usageFilterId: FormDataEntryValue | null;
  isotopes: ProductAttribute[];
  isotopeFilterId: FormDataEntryValue | null;
  volumes: ProductAttribute[];
  volumeFilterId: FormDataEntryValue | null;
  shields: ProductAttribute[];
  shieldFilterId: FormDataEntryValue | null;
  accessories: ProductAttribute[];
  accessoryFilterId: FormDataEntryValue | null;
  specifications: ProductSpecification[];
  faqs: ProductFaq[];
  relatedProducts: ProductAttribute[];
  purchasedTogether: ProductAttribute[];
  images: ProductImageWithFile[];
};

type ProductImageWithFile = ProductImage & { file?: File };

type ProductSpecification = {
  volume: string;
  bottom: number;
  bottomPbEquiv: number;
  height: number;
  innerDiameter: number;
  outerDiameter: number;
  shieldingSide: number;
  shieldingSidePbEquiv: number;
  topShield: number;
  topShieldPbEquiv: number;
  weight: number;
}

type ProductFaq = {
  id: string;
  question: string;
  answer: string;
}

type ProductAttribute = {
  id: string;
  name: string;
}
