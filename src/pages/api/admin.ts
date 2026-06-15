import type { APIRoute } from "astro";
import db from "../../lib/db";

export const POST: APIRoute = async ({ request, cookies }) => {
  const auth = cookies.get("wedding_admin_auth")?.value;
  if (auth !== "true") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const body = await request.json();
    const { action, id, ids, data } = body;

    const targetIds = ids || (id ? [id] : []);
    if (targetIds.length === 0 && !data) {
      return new Response(JSON.stringify({ error: "No valid ID provided" }), {
        status: 400,
      });
    }

    const placeholders = targetIds.map(() => "?").join(",");

    // --- RSVP ACTIONS ---
    if (action === "update_rsvp") {
      const { guest_name, attendance, guest_count, message } = data;
      await db.execute(
        "UPDATE rsvps SET guest_name=?, attendance=?, guest_count=?, message=? WHERE id=?",
        [guest_name, attendance, guest_count, message, id]
      );
      return new Response(JSON.stringify({ success: true }));
    }

    if (action === "delete_rsvp") {
      await db.execute(
        `DELETE FROM rsvps WHERE id IN (${placeholders})`,
        targetIds
      );
      return new Response(JSON.stringify({ success: true }));
    }

    // --- WISHES ACTIONS ---
    if (action === "update_wish") {
      const { name, message } = data;
      await db.execute("UPDATE wishes SET name=?, message=? WHERE id=?", [
        name,
        message,
        id,
      ]);
      return new Response(JSON.stringify({ success: true }));
    }

    if (action === "delete_wish") {
      await db.execute(
        `DELETE FROM wishes WHERE id IN (${placeholders})`,
        targetIds
      );
      return new Response(JSON.stringify({ success: true }));
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
    });
  } catch (error: any) {
    console.error("Admin API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Server Error" }),
      { status: 500 }
    );
  }
};
