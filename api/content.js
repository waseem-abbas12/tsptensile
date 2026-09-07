import { kv } from "@vercel/kv";

// In-memory fallback if KV is not configured yet (prevents crashes during setup)
let localMemoryStore = null;

export default async function handler(req, res) {
  // Try to use KV, if KV_REST_API_URL is missing, it means KV is not set up on Vercel yet
  const hasKV = !!process.env.KV_REST_API_URL;

  if (req.method === "GET") {
    try {
      let data = null;
      if (hasKV) {
        data = await kv.get("site_content");
      } else {
        data = localMemoryStore;
      }
      
      return res.status(200).json({ success: true, data: data || null });
    } catch (error) {
      console.error("KV Get Error:", error);
      return res.status(500).json({ success: false, error: "Failed to fetch content" });
    }
  } 
  
  if (req.method === "POST") {
    // Basic security: check an admin token/password sent from frontend
    const { password, content } = req.body;
    
    // In a real app, use a strong password environment variable. 
    // Here we use the hardcoded one or process.env.ADMIN_PASSWORD
    const validPassword = process.env.ADMIN_PASSWORD || "formfield2026";
    
    if (password !== validPassword) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    try {
      if (hasKV) {
        await kv.set("site_content", content);
      } else {
        localMemoryStore = content;
      }
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("KV Set Error:", error);
      return res.status(500).json({ success: false, error: "Failed to save content" });
    }
  }

  res.status(405).json({ success: false, error: "Method not allowed" });
}
