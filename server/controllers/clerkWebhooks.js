// import user from "../models/User.js";
// import { Webhook } from "svix";

// const clerkWebhooks = async (req, res) => {
//   try {
//     // Log when webhook is received
//     console.log("🔔 Clerk webhook triggered");

//     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//     // Headers for verification
//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     // Verify the request
//     await whook.verify(JSON.stringify(req.body), headers);

//     const { data, type } = req.body;

//     console.log(`📨 Webhook event type: ${type}`);
//     console.log("📦 Incoming user data:", data);

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "unknown@example.com",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url,
//     };

//     switch (type) {
//       case "user.created": {
//         await user.create(userData);
//         console.log("✅ User created:", userData);
//         break;
//       }
//       case "user.updated": {
//         await user.findByIdAndUpdate(data.id, userData);
//         console.log("♻️ User updated:", userData);
//         break;
//       }
//       case "user.deleted": {
//         await user.findByIdAndDelete(data.id);
//         console.log("🗑️ User deleted:", data.id);
//         break;
//       }
//       default:
//         console.log("⚠️ Unhandled event type:", type);
//         break;
//     }

//     res.status(200).json({ success: true, message: "Webhook received" });
//   } catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export default clerkWebhooks;

// // import user from "../models/User.js";
// // import { Webhook } from "svix";

// // const clerkWebhooks = async (req, res) => {
// //   try {
// //     const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

// //     const headers = {
// //       "svix-id": req.headers["svix-id"],
// //       "svix-timestamp": req.headers["svix-timestamp"],
// //       "svix-signature": req.headers["svix-signature"],
// //     };

// //     // Validate headers
// //     if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
// //       return res.status(400).json({ success: false, message: "Missing required headers" });
// //     }

// //     // Verify webhook
// //     await whook.verify(JSON.stringify(req.body), headers);

// //     const { data, type } = req.body;
// //     console.log("📨 Webhook Type:", type);
// //     console.log("📦 Webhook Payload:", JSON.stringify(data, null, 2));

// //     const email = data.email_addresses?.[0]?.email_address;
// //     const first = data.first_name || "";
// //     const last = data.last_name || "";
// //     const id = data.id;

// //     if (!email || !id) {
// //       throw new Error("Missing required user fields");
// //     }

// //     const userData = {
// //       _id: id,
// //       email,
// //       username: `${first} ${last}`.trim() || "Unnamed User",
// //       image: data.image_url || "",
// //     };

// //     switch (type) {
// //       case "user.created":
// //         await user.findByIdAndUpdate(id, userData, { upsert: true });
// //         console.log("✅ User created or updated:", userData);
// //         break;
// //       case "user.updated":
// //         await user.findByIdAndUpdate(id, userData);
// //         console.log("♻️ User updated:", userData);
// //         break;
// //       case "user.deleted":
// //         await user.findByIdAndDelete(id);
// //         console.log("🗑️ User deleted:", id);
// //         break;
// //       default:
// //         console.log("⚠️ Unhandled event type:", type);
// //         break;
// //     }

// //     res.status(200).json({ success: true });
// //   } catch (error) {
// //     console.error("❌ Webhook Error:", error.message);
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// // export default clerkWebhooks;



import express from 'express';
import { Webhook } from 'svix';
import user from "../models/User.js";

const router = express.Router();

// Use raw body parser for Clerk webhook verification
router.post("/", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = req.body;
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const event = wh.verify(payload, headers);
    const { data, type } = event;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "unknown@example.com",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url,
    };

    switch (type) {
      case "user.created":
        await user.create(userData);
        break;
      case "user.updated":
        await user.findByIdAndUpdate(data.id, userData);
        break;
      case "user.deleted":
        await user.findByIdAndDelete(data.id);
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
