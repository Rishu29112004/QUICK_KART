import Cart from "../models/cartModal.js";
import Product from "../models/productModal.js";
import Order from "../models/orderModal.js";

// ============================
// PLACE ORDER
// ============================
export const placeOrder = async (req, res) => {
  try {
    const userId = req.id;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }
    let totalAmount = 0;

    for (let item of cart.products) {
      if (item.product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${item.product.name} is out of stock`,
        });
      }

      totalAmount += item.product.price * item.quantity;
    }

    const order = await Order.create({
      user: userId,
      products: cart.products.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount,
    });

    // Reduce stock
    for (let item of cart.products) {
      item.product.quantity -= item.quantity;
      await item.product.save();
    }

    // Empty cart
    cart.products = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ============================
// GET MY ORDERS
// ============================
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.id;

    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};