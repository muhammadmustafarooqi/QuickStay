// import User from "../models/User.js";
// import { Webhook } from "svix";

// const ClerkWebhooks = async (req, res) => {
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
//         await User.create(userData);
//         console.log("✅ User created:", userData);
//         break;
//       }
//       case "user.updated": {
//         await User.findByIdAndUpdate(data.id, userData);
//         console.log("♻️ User updated:", userData);
//         break;
//       }
//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         console.log("🗑️ User deleted:", data.id);
//         break;
//       }
//       default:
//         console.log("⚠️ Unhandled event type:", type);
//         break;
//     }

//     res.status(200).json({ success: true, message: "Webhook received" });
//   } 
//   catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export default ClerkWebhooks;


// import User from "../models/User.js";
// import { Webhook } from "svix";

// const ClerkWebhooks = async (req, res) => {
//   try {
//     console.log("🔔 Clerk webhook triggered");

//     const secret = process.env.CLERK_WEBHOOK_SECRET;
//     if (!secret) {
//       console.error("❌ Webhook error: Secret can't be empty.");
//       return res.status(500).json({ success: false, message: "Webhook secret missing" });
//     }

//     const wh = new Webhook(secret);

//     const headers = {
//       "svix-id": req.headers["svix-id"],
//       "svix-timestamp": req.headers["svix-timestamp"],
//       "svix-signature": req.headers["svix-signature"],
//     };

//     // Convert raw buffer to string
//     const payload = req.body.toString();

//     // Verify the webhook
//     const evt = wh.verify(payload, headers);
//     const { type, data } = evt;

//     const userData = {
//       _id: data.id,
//       email: data.email_addresses?.[0]?.email_address || "unknown@example.com",
//       username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//       image: data.image_url,
//     };

//     switch (type) {
//       case "user.created":
//         await User.create(userData);
//         console.log("✅ User created:", userData);
//         break;

//       case "user.updated":
//         await User.findByIdAndUpdate(data.id, userData);
//         console.log("♻️ User updated:", userData);
//         break;

//       case "user.deleted":
//         await User.findByIdAndDelete(data.id);
//         console.log("🗑️ User deleted:", data.id);
//         break;

//       default:
//         console.log("⚠️ Unhandled event type:", type);
//     }

//     res.status(200).json({ success: true, message: "Webhook processed" });
//   } catch (error) {
//     console.error("❌ Webhook error:", error.message);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// export default ClerkWebhooks;

import User from "../models/User.js";
import { Webhook } from "svix";

const ClerkWebhooks = async (req, res) => {
  try {
    console.log("🔔 Clerk webhook triggered");

    const secret = process.env.CLERK_WEBHOOK_SECRET;

    if (!secret) {
      console.error("❌ Webhook error: Secret can't be empty.");
      return res.status(500).json({ success: false, message: "Webhook secret missing" });
    }

    const wh = new Webhook(secret);

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Convert raw buffer to string
    const payloadString = req.body.toString();

    // Verify the webhook
    const evt = wh.verify(payloadString, headers);

    // Now safely parse the payload
    const parsed = JSON.parse(payloadString);
    const { type, data } = parsed;

    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address || "unknown@example.com",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || data.profile_image_url,
    };

    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("✅ User created:", userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("♻️ User updated:", userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        break;
      default:
        console.log("⚠️ Unhandled event type:", type);
    }

    res.status(200).json({ success: true, message: "Webhook processed" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export default ClerkWebhooks;



