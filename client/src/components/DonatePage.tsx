import React, { useState } from "react";

const DonatePage: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    const handleRazorpayPayment = () => {
        const options = {
            key: "RAZORPAY_KEY", // Replace with your Razorpay key
            amount: parseInt(amount) * 100, 
            currency: "INR",
            name: "Slum Scholar",
            description: "Donation",
            image: "https://uploads.prod01.oregon.platform-os.com/instances/287/assets/images/SchoolGoodbye-AdobeStock_702140916.jpeg?updated=1724208645", 
            handler: function (response: any) {
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name,
                email,
                contact,
            },
            theme: {
                color: "#3399cc",
            },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-gray-100 p-10">
            {/* Donation Form on Left */}
            <div className="bg-white shadow-md rounded-lg p-8 w-full lg:w-1/3 mb-10 lg:mb-0 lg:mr-10">
                <h2 className="text-2xl font-semibold text-center mb-4">Donate Now</h2>
                <p className="text-center mb-8 italic">
                    "You have not lived today until you have done something for someone who can never repay you"
                </p>
                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="tel"
                        placeholder="Contact No."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <textarea
                        placeholder="Message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button
                        type="button"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-blue-700"
                        onClick={handleRazorpayPayment}
                    >
                        Donate via Razorpay
                    </button>
                </form>
            </div>

            {/* Payment Details on Right */}
            <div className="bg-white shadow-md rounded-lg p-8 w-full lg:w-1/3 flex flex-col items-center">
                <img 
                    src="https://uploads.prod01.oregon.platform-os.com/instances/287/assets/images/SchoolGoodbye-AdobeStock_702140916.jpeg?updated=1724208645" 
                    alt="Child" 
                    className="w-full h-48 rounded-md object-cover mb-6" 
                />
                <div className="flex flex-col items-center">
                    <img 
                        src="https://randomqr.com/assets/images/randomqr-256.png" 
                        alt="UPI QR Code" 
                        className="w-32 h-32 mb-4" 
                    />
                    <div className="text-center">
                        <p className="font-semibold">UPI ID</p>
                        <p className="mb-2">abcdquygfuhfoiwjvowir@upi</p>
                        <p className="font-semibold">Bank Details</p>
                        <p>Account No: XXXXXXXXXSBI</p>
                        <p>IFSC:BARB0VJMNRE</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonatePage;