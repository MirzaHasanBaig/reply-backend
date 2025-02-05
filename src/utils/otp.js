const nodemailer = require("nodemailer");

async function sendOTP(email) {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);;
        // Configure transporter with your SMTP details
        const transporter = nodemailer.createTransport({
            service: "Gmail", // or another SMTP provider
            auth: {
                user: process.env.SMTP_GMAIL, // replace with your email
                pass: process.env.SMTP_GPASS, // use an app password if necessary
            },
        });

        // Email content
        const mailOptions = {
            from: '"Profitron" '+ process.env.SMTP_GMAIL,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}`,
            html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("OTP sent: ", info.response);
        return {secret:otp};
    } catch (error) {
        console.error("Error sending OTP: ", error);
        return false;
    }
}

module.exports = { sendOTP };
