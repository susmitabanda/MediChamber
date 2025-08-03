
import Razorpay from 'razorpay';

export async function POST(req) {
  try {
    const body = await req.json();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: body.amount * 100, // ₹100 = 10000 paise
      currency: 'INR',
      receipt: 'receipt_order_74394',
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    return Response.json({ orderId: order.id });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
