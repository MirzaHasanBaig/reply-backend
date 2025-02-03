const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login route");
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Get a login JWT token
 *     description: Retrieves a stored value from JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved value
 */

router.post("/register", (req, res) => {
  res.send("Register route");
});

module.exports = router;
