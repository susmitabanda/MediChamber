"use client";

import { useEffect } from "react";

export default function PaymentPage() {
  const loadRazorpay = async () => {
    const res = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // ₹100
    });

    const data = await res.json();

    if (!data.orderId) {
      alert("Failed to create order");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: 100 * 100,
      currency: "INR",
      name: "MediChamber",
      description: "Appointment Fee",
      order_id: data.orderId,
      handler: function (response) {
        alert("Payment successful!");
        console.log(response);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Pay for Appointment</h2>
    <p className="text-gray-600 mb-6">Confirm your booking by paying ₹1000 securely through Razorpay.</p>
    <button
      onClick={loadRazorpay}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-lg transition-all duration-300"
    >
      Pay ₹1000
    </button>
  </div>
</div>

  );
}
