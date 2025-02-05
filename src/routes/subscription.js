const express = require("express");
const router = express.Router();
const {login,register,sendOTPToUser} = require("../services/authService");
const {emailRegex,passwordRegex, numberRegex} = require('../utils/validation')

router.post("/login", async(req,res)=>{
  const { email,password,otpSecret } = req.body;


  // Validate email format
  if (!emailRegex.test(email) || !passwordRegex.test(password)  || !numberRegex.test(otpSecret)) {
    console.log(numberRegex.test(otpSecret));
      return res.status(400).json({ status: false, code: 400, message: "Invalid format" });
  }
  const data = await login(email,password,otpSecret);
    return res.status(data.code).json(data);
} );

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Get a login JWT token
 *     description: Authenticates a user and retrieves a JWT token
 *     parameters: 
 *       - in: body
 *         name: credentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: user@example.com
 *             password:
 *               type: string
 *               format: password
 *               example: "password123"
 *     responses:
 *       200:
 *         description: Successfully retrieved JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 expiresIn:
 *                   type: integer
 *                   example: 3600
 *       400:
 *         description: Invalid credentials provided
 *       500:
 *         description: Internal server error
 */


router.post("/register", async (req, res) => {
  const data = await register(req.body);
    return res.status(data.code).json(data);
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
 *     description: Registyer a user
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User Registration
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *             - name
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: user@example.com
 *             password:
 *               type: string
 *               format: password
 *               example: "password123"
 *             name:
 *               type: string
 *               example: "hassan"
 *     responses:
 *       200:
 *         description: Successfully User R
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User Register Successfully"
 *                 
 *       401:
 *         description: Email Already Exist
 *       500:
 *         description: Internal server error
 */

router.post("/send-otp", async (req, res) => {
  const { email,password } = req.body;
 
  // Validate email format
  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    
      return res.status(400).json({ status: true, code: 400, message: "Invalid format" });
  }
  const data = await sendOTPToUser(email,password);
    return res.status(data.code).json(data);
});

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send Otp
 *     description: Registyer a user
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User Registration
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *               example: user@example.com
 *             password:
 *               type: string
 *               format: password
 *               example: "password123"
 *     responses:
 *       200:
 *         description: Successfully Send OTP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP Send to the Email"
 *       400:
 *         description: Invalid Format
 *       500:
 *         description: Internal server error
 */

module.exports = router;
