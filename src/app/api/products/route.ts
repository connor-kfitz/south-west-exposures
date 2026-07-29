import pool from '@/lib/db';

import { NextResponse } from 'next/server';
import { requireSession } from '@/lib/apiAuth';
import { parseProductFormData, syncProductChildren } from '@/lib/productPersistence';

export async function GET() {
  const client = await pool.connect();

  try {
    const query = `
      SELECT
        p.product_id AS id,
        p.name,
        p.description,
        p.features,
        p.material,
        p.date_created AS "createdAt",

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pco.customization_option_id,
          'name', co.name
        )) FILTER (WHERE pco.customization_option_id IS NOT NULL), '[]') AS "customizationOptions",

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pu.usage_id,
          'name', u.name,
          'image', u.image
        )) FILTER (WHERE pu.usage_id IS NOT NULL), '[]') AS usages,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pi.isotope_id,
          'name', iso.name
        )) FILTER (WHERE pi.isotope_id IS NOT NULL), '[]') AS isotopes,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pv.volume_id,
          'name', v.name
        )) FILTER (WHERE pv.volume_id IS NOT NULL), '[]') AS volumes,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', ps.shield_id,
          'name', s.name
        )) FILTER (WHERE ps.shield_id IS NOT NULL), '[]') AS shields,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pa.accessory_id,
          'name', a.name
        )) FILTER (WHERE pa.accessory_id IS NOT NULL), '[]') AS accessories,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'volumeId', pvm.volume_id,
          'weight', pvm.weight,
          'height', pvm.height,
          'innerDiameter', pvm.inner_diameter,
          'outerDiameter', pvm.outer_diameter,
          'shieldingSide', pvm.shielding_side,
          'shieldingSidePbEquiv', pvm.shielding_side_pb_equiv,
          'topShield', pvm.top_shield,
          'topShieldPbEquiv', pvm.top_shield_pb_equiv,
          'bottom', pvm.bottom,
          'bottomPbEquiv', pvm.bottom_pb_equiv,
          'partNumber', pvm.part_number
        )) FILTER (WHERE pvm.volume_id IS NOT NULL), '[]') AS specifications,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'question', pf.question,
          'answer', pf.answer
        )) FILTER (WHERE pf.question IS NOT NULL), '[]') AS faqs,

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pr.related_product_id,
          'name', rp.name
        )) FILTER (WHERE pr.related_product_id IS NOT NULL), '[]') AS "relatedProducts",

        COALESCE(json_agg(DISTINCT jsonb_build_object(
          'id', pt.purchased_together_product_id,
          'name', ptp.name
        )) FILTER (WHERE pt.purchased_together_product_id IS NOT NULL), '[]') AS "purchasedTogether",

        COALESCE(
          (SELECT jsonb_agg(image_data ORDER BY image_data->>'display_order' ASC)
          FROM (
            SELECT DISTINCT ON (src) image_id AS id, jsonb_build_object(
              'id', image_id,
              'src', src,
              'display_order', display_order
            ) AS image_data
            FROM product_images
            WHERE product_id = p.product_id
            ORDER BY src, display_order
          ) subquery), '[]'
        ) AS images

      FROM products p
      LEFT JOIN products_customization_options pco ON p.product_id = pco.product_id
      LEFT JOIN customization_options co ON pco.customization_option_id = co.customization_option_id
      LEFT JOIN products_usages pu ON p.product_id = pu.product_id
      LEFT JOIN usages u ON pu.usage_id = u.usage_id
      LEFT JOIN products_isotopes pi ON p.product_id = pi.product_id
      LEFT JOIN isotopes iso ON pi.isotope_id = iso.isotope_id
      LEFT JOIN products_volumes pv ON p.product_id = pv.product_id
      LEFT JOIN volumes v ON pv.volume_id = v.volume_id
      LEFT JOIN products_shields ps ON p.product_id = ps.product_id
      LEFT JOIN shields s ON ps.shield_id = s.shield_id
      LEFT JOIN products_accessories pa ON p.product_id = pa.product_id
      LEFT JOIN accessories a ON pa.accessory_id = a.accessory_id
      LEFT JOIN products_volume_metrics pvm ON p.product_id = pvm.product_id
      LEFT JOIN products_faqs pf ON p.product_id = pf.product_id
      LEFT JOIN products_related pr ON p.product_id = pr.product_id
      LEFT JOIN products rp ON pr.related_product_id = rp.product_id
      LEFT JOIN products_purchased_together pt ON p.product_id = pt.product_id
      LEFT JOIN products ptp ON pt.purchased_together_product_id = ptp.product_id
      GROUP BY p.product_id
      ORDER BY p.product_id ASC;
    `;

    const result = await client.query(query);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  } finally {
    client.release();
  }
}

export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const client = await pool.connect();

  try {
    const formData = await parseProductFormData(req);

    await client.query('BEGIN');

    const checkResult = await client.query('SELECT * FROM products WHERE name = $1', [formData.name]);
    if (checkResult.rows.length > 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ error: 'Duplicate Name' }, { status: 409 });
    }

    const productResult = await client.query(
      `INSERT INTO products(name, description, features, material)
       VALUES($1, $2, $3, $4)
       RETURNING product_id;`,
      [formData.name, formData.description, formData.features, formData.material]
    );

    const productId = productResult.rows[0].product_id;

    const syncError = await syncProductChildren(client, { ...formData, productId });
    if (syncError) {
      await client.query('ROLLBACK');
      return syncError;
    }

    await client.query('COMMIT');

    return NextResponse.json(
      {
        message: 'Product created',
        product: {
          productId,
          name: formData.name,
          description: formData.description,
          features: formData.features,
          material: formData.material,
          customizationOptions: formData.customizationOptions,
          usages: formData.usages,
          isotopes: formData.isotopes,
          volumes: formData.volumes,
          shields: formData.shields,
          accessories: formData.accessories,
          specifications: formData.specifications,
          faqs: formData.faqs,
          relatedProducts: formData.relatedProducts,
          purchasedTogether: formData.purchasedTogether
        }
      },
      { status: 201 }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error during POST request:', error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  } finally {
    client.release();
  }
}
