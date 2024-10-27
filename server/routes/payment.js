import express from "express";
import Payment from "../models/Payment.js";

const router = express.Router();
router.post("/success", async (req, res) => {
    const { name, email, contact, amount, message, paymentId } = req.body;
    try {
        const newPayment = new Payment({
            name,
            email,
            contact,
            amount,
            message,
            paymentId
        });
        //console.log(newPayment);

        await newPayment.save();
        res.status(200).json({ success: true, message: 'Payment recorded successfully!' });
    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({ success: false, message: 'Error saving payment.' });
    }
});

export default router;
