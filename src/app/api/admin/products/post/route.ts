import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { ProductImage } from '@/types/admin-products';

export async function POST(req: Request) {
  const client = await pool.connect();

  try {
    const formData = await req.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const features = JSON.parse((formData.get("features") as string) || "[]");
    const material = formData.get('material');
    const customizationOptions = JSON.parse(formData.get('customizationOptions') as string || '[]');
    const customizationOptionFilterId = formData.get('customizationOptionFilterId');
    const usages = JSON.parse(formData.get('usages') as string || '[]');
    const usageFilterId = formData.get('usageFilterId');
    const isotopes = JSON.parse(formData.get('isotopes') as string || '[]');
    const isotopeFilterId = formData.get('isotopeFilterId');
    const volumes = JSON.parse(formData.get('volumes') as string || '[]');
    const volumeFilterId = formData.get('volumeFilterId');
    const shields = JSON.parse(formData.get('shields') as string || '[]');
    const shieldFilterId = formData.get('shieldFilterId');
    const accessories = JSON.parse(formData.get('accessories') as string || '[]');
    const accessoryFilterId = formData.get('accessoryFilterId');
    const specifications = JSON.parse(formData.get('specifications') as string || '[]');
    const faqs = JSON.parse(formData.get('faqs') as string || '[]');
    const relatedProducts = JSON.parse(formData.get('relatedProducts') as string || '[]');
    const purchasedTogether = JSON.parse(formData.get('purchasedTogether') as string || '[]');
    let images = JSON.parse(formData.get('images') as string || '[]');
    const imageFiles = formData.getAll('imageFiles');
    console.log("Customization Options", customizationOptions);

    images = images.map((image: ProductImage, index: number) => ({
      ...image,
      file: imageFiles[index]
    }));

    await client.query('BEGIN');

    const checkResult = await client.query('SELECT * FROM products WHERE name = $1', [name]);
    if (checkResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ error: 'Duplicate Name' }, { status: 409 });
    }

    const productResult = await client.query(
      `INSERT INTO products(name, description, features, material)
       VALUES($1, $2, $3, $4) 
       RETURNING product_id;`,
      [name, description, features, material]
    );

    const productId = productResult.rows[0].product_id;
    console.log("Customization Options", customizationOptions);
    console.log(customizationOptionFilterId)

    if (customizationOptions && Array.isArray(customizationOptions)) {
      for (const customizationOption of customizationOptions) {
        const { id } = customizationOption;
        await client.query(
          `INSERT INTO products_customization_options (product_id, customization_option_id, filter_id)
       VALUES ($1, $2, $3);`,
          [productId, id, customizationOptionFilterId]
        );
      }
    }

    if (usages && Array.isArray(usages)) {
      for (const usage of usages) {
        const { id } = usage;
        await client.query(
          `INSERT INTO products_usages (product_id, usage_id, filter_id)
           VALUES ($1, $2, $3);`,
          [productId, id, usageFilterId]
        );
      }
    }

    if (isotopes && Array.isArray(isotopes)) {
      for (const isotope of isotopes) {
        const { id } = isotope;
        await client.query(
          `INSERT INTO products_isotopes (product_id, isotope_id, filter_id)
           VALUES ($1, $2, $3);`,
          [productId, id, isotopeFilterId]
        );
      }
    }

    if (volumes && Array.isArray(volumes)) {
      for (const volume of volumes) {
        const { id } = volume;
        await client.query(
          `INSERT INTO products_volumes (product_id, volume_id, filter_id)
           VALUES ($1, $2, $3);`,
          [productId, id, volumeFilterId]
        );
      }
    }

    if (shields && Array.isArray(shields)) {
      for (const shield of shields) {
        const { id } = shield;
        await client.query(
          `INSERT INTO products_shields (product_id, shield_id, filter_id)
           VALUES ($1, $2, $3);`,
          [productId, id, shieldFilterId]
        );
      }
    }

    if (accessories && Array.isArray(accessories)) {
      for (const accessory of accessories) {
        const { id } = accessory;
        await client.query(
          `INSERT INTO products_accessories (product_id, accessory_id, filter_id)
           VALUES ($1, $2, $3);`,
          [productId, id, accessoryFilterId]
        );
      }
    }

    if (specifications && Array.isArray(specifications)) {
      for (const spec of specifications) {
        const {
          volume, weight, height, innerDiameter, outerDiameter,
          shieldingSide, shieldingSidePbEquiv, topShield,
          topShieldPbEquiv, bottom, bottomPbEquiv
        } = spec;

        await client.query(
          `INSERT INTO products_volume_metrics (
             product_id, volume_id, weight, height, inner_diameter, outer_diameter,
             shielding_side, shielding_side_pb_equiv, top_shield, top_shield_pb_equiv,
             bottom, bottom_pb_equiv
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);`,
          [
            productId, volume, weight, height, innerDiameter, outerDiameter,
            shieldingSide, shieldingSidePbEquiv, topShield, topShieldPbEquiv,
            bottom, bottomPbEquiv
          ]
        );
      }
    }

    if (faqs && Array.isArray(faqs)) {
      for (const faq of faqs) {
        const { question, answer } = faq;

        await client.query(
          `INSERT INTO products_faqs (product_id, question, answer)
           VALUES ($1, $2, $3);`,
          [productId, question, answer]
        );
      }
    }

    if (relatedProducts && Array.isArray(relatedProducts)) {
      for (const relatedProduct of relatedProducts) {
        const { id } = relatedProduct;
        await client.query(
          `INSERT INTO products_related (product_id, related_product_id)
           VALUES ($1, $2);`,
          [productId, id]
        );
      }
    }

    if (purchasedTogether && Array.isArray(purchasedTogether)) {
      for (const item of purchasedTogether) {
        const { id } = item;
        await client.query(
          `INSERT INTO products_purchased_together (product_id, purchased_together_product_id)
       VALUES ($1, $2);`,
          [productId, id]
        );
      }
    }

    if (images && Array.isArray(images)) {
      for (const [index, image] of images.entries()) {
        const {file} = image;
        const uploadResponse = await fetch(
          `${process.env.VERCEL_URL}/api/vercel/uploadBlob?filename=${file.name}`,
          {
            method: 'POST',
            body: file,
          },
        );

        const uploadData = await uploadResponse.json();

        if (uploadData.error) {
          await client.query('ROLLBACK');
          return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        const imageUrl = uploadData.url;

        await client.query(
          `INSERT INTO product_images (product_id, src, display_order)
           VALUES ($1, $2, $3);`,
          [productId, imageUrl, index]
        );
      }
    }

    await client.query('COMMIT');

    return NextResponse.json(
      {
        message: 'Product created',
        product: {
          productId, name, description, features, material,
          customizationOptions, usages, isotopes, volumes, shields, accessories,
          specifications, faqs, relatedProducts, purchasedTogether
        }
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Internal server error.' }),
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
