import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    contact: {
        type: String,
    },
    amount: {
        type: Number,
    },
    message: {
        type: String,
        default: ''
    },
    paymentId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
