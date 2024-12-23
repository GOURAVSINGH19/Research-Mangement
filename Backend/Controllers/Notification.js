// routes/notifications.js
const express = require("express");
const Notification = require("../Models/Notification");
const router = express.Router();

router.post("/notification", async (req, res) => {
  const { userId, message } = req.body;
  try {
    const notification = await Notification.create({ userId, message });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get notifications
router.get("/notificaiton/:userId", async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.patch("/notificaiton/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
