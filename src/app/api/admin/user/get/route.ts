import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/nextAuthOptions";
import pool from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const query = "SELECT profile_image FROM users WHERE email = $1";
    const result = await pool.query(query, [session.user.email]);

    if (result.rows.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      name: session.user.name,
      email: session.user.email,
      profileImage: result.rows[0].profile_image,
    });
    
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
