const express = require("express");
const Order = require("../models/Order");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Place a new order
router.post("/", verifyToken, async (req, res) => {
  try {
    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item."
      });
    }

    if (!req.body.name || !req.body.phone || !req.body.address || !req.body.orderType) {
      return res.status(400).json({
        message: "Please provide all order details."
      });
    }

    const order = new Order({
      ...req.body,
      email: req.user.email
    });
    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({
      message: "Error placing order"
    });
  }
});

// Get orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const email = req.query.email;

    // Admin can see all orders
    if (req.user.role === "admin" && !email) {
      const orders = await Order.find().sort({ _id: -1 });
      return res.json(orders);
    }

    // Normal users can only see their own orders
    if (email && email !== req.user.email) {
      return res.status(403).json({
        message: "You can only view your own orders."
      });
    }

    const orders = await Order.find({
      email: email || req.user.email
    }).sort({ _id: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error getting orders"
    });
  }
});

// Admin can update order status
router.put("/:id/status", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after" }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Error updating order status"
    });
  }
});

module.exports = router;