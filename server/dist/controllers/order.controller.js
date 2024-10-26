import { Restaurant } from "../models/restaurant.model.js";
import { Order } from "../models/order.model.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.id })
            .populate("user")
            .populate("restaurant");
        return res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};
export const createCheckoutSession = async (req, res) => {
    try {
        const checkoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate("menus");
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found.",
            });
        }
        const order = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            status: "pending",
        });
        // line items
        const menuItems = restaurant.menus;
        const lineItems = createLineItems(checkoutSessionRequest, menuItems);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["GB", "US", "CA"],
            },
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItems.map((item) => item.image)),
            },
        });
        if (!session.url) {
            return res
                .status(400)
                .json({ success: false, message: "Error while creating session" });
        }
        await order.save();
        return res.status(200).json({
            session,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const createLineItems = (checkoutSessionRequest, menuItems) => {
    // create line items
    const lineItems = checkoutSessionRequest.cartItems.map((CartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === CartItem.menuId);
        if (!menuItem)
            throw new Error(`Menu item id not found`);
        return {
            price_data: {
                currency: "inr",
                product_date: {
                    name: menuItem.name,
                    iamges: [menuItem.image],
                },
                unit_amount: menuItem.price * 100,
            },
            quantity: CartItem.quantity,
        };
    });
    return lineItems;
};
