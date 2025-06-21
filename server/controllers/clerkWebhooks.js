import user from "../models/User.js";
import { Svix, Webhook } from "svix";

const clerkWebhooks = async (req, res) => {
  try {
    // create svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // getting headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // verifying headers
    await whook.verify(JSON.stringify(req.body), headers);

    // getting data from request bode
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_addresses,
      username: data.first_name + " " + data.last_name,
      image: data.image_url,
    };
    // switch caase for different events
    switch (type) {
      case "user.created": {
        await user.create(userData);
        break;
      }
      case "user.updated": {
        await user.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await user.findByIdAndDelete(data.id);
        break;
      }
      default:
        break;
    }
    res.json({ sucess: true, message: "Webhook Recived" });
  } catch (error) {
    console.log(error.message);
    res.json({ sucess: false, message: error.message });
  }
};
export default clerkWebhooks;
