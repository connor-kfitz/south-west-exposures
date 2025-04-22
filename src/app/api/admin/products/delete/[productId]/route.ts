import pool from "@/lib/db";
import { PoolClient } from "pg";

async function deleteProductAccessories(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_accessories WHERE product_id = $1", [productId]);
}

async function deleteProductFaqs(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_faqs WHERE product_id = $1", [productId]);
}

async function deleteProductIsotopes(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_isotopes WHERE product_id = $1", [productId]);
}

async function deleteProductShields(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_shields WHERE product_id = $1", [productId]);
}

async function deleteProductCustomizationOptions(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_customization_options WHERE product_id = $1", [productId]);
}

async function deleteProductUsages(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_usages WHERE product_id = $1", [productId]);
}

async function deleteProductVolumeMetrics(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_volume_metrics WHERE product_id = $1", [productId]);
}

async function deleteProductVolumes(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_volumes WHERE product_id = $1", [productId]);
}

async function deleteRelatedProducts(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_related WHERE product_id = $1 OR related_product_id = $1", [productId]);
}

async function deletePurchasedTogetherProducts(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products_purchased_together WHERE product_id = $1 OR purchased_together_product_id = $1", [productId]);
}

async function deleteProductImages(client: PoolClient, productId: string) {
  await client.query("DELETE FROM product_images WHERE product_id = $1", [productId]);
}

async function deleteProduct(client: PoolClient, productId: string) {
  await client.query("DELETE FROM products WHERE product_id = $1", [productId]);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  if (!productId) {
    return new Response(JSON.stringify({ message: "Product Id is required." }), {
      status: 400,
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await deleteProductAccessories(client, productId);
    await deleteProductFaqs(client, productId);
    await deleteProductIsotopes(client, productId);
    await deleteProductShields(client, productId);
    await deleteProductCustomizationOptions(client, productId);
    await deleteProductUsages(client, productId);
    await deleteProductVolumeMetrics(client, productId);
    await deleteProductVolumes(client, productId);
    await deleteRelatedProducts(client, productId);
    await deletePurchasedTogetherProducts(client, productId);
    await deleteProductImages(client, productId);
    await deleteProduct(client, productId);

    await client.query("COMMIT");

    return new Response(
      JSON.stringify({ message: "Product deleted successfully." }),
      { status: 200 }
    );

  } catch (error) {

    await client.query("ROLLBACK");
    console.error("Transaction failed:", error);
    
    return new Response(
      JSON.stringify({ message: "Internal server error." }),
      { status: 500 }
    );

  } finally {
    client.release();
  }
}
