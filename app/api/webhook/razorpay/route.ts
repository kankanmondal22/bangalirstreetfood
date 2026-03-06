import { NextRequest, NextResponse } from "next/server";

// ============================================================================
// RAZORPAY WEBHOOK HANDLER
// ============================================================================
// PURPOSE:
// BACKUP confirmation path for payment events.
// Razorpay sends webhook events when payment status changes.
// This ensures bookings are confirmed even if the client-side
// callback (verifyPaymentAndConfirm) fails (browser crash, network error, etc.)
//
// SETUP:
// 1. In Razorpay Dashboard → Settings → Webhooks → Add New Webhook
// 2. URL: https://yourdomain.com/api/webhook/razorpay
// 3. Secret: Set a webhook secret, store as RAZORPAY_WEBHOOK_SECRET env var
// 4. Events to subscribe: payment.captured, payment.failed
//
// SECURITY:
// - Verify webhook signature on EVERY request before processing
// - Use crypto.timingSafeEqual to prevent timing attacks
// - Return 200 even for unknown events (Razorpay retries on non-2xx)
// ============================================================================

export async function POST(request: NextRequest) {
  // Step 1: Read raw request body (needed for signature verification)
  // const rawBody = await request.text();
  // const signature = request.headers.get("x-razorpay-signature");

  // Step 2: Verify webhook signature
  // const crypto = await import("crypto");
  // const expectedSignature = crypto
  //   .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
  //   .update(rawBody)
  //   .digest("hex");
  //
  // const isValid = crypto.timingSafeEqual(
  //   Buffer.from(expectedSignature),
  //   Buffer.from(signature || "")
  // );
  //
  // if (!isValid) {
  //   console.error("Razorpay webhook: Invalid signature");
  //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  // }

  // Step 3: Parse the event payload
  // const event = JSON.parse(rawBody);
  // const eventType = event.event; // e.g., "payment.captured", "payment.failed"

  // Step 4: Handle payment.captured event
  // if (eventType === "payment.captured") {
  //   const payment = event.payload.payment.entity;
  //   const orderId = payment.order_id;
  //   const paymentId = payment.id;
  //   const amount = payment.amount; // in paise
  //
  //   // 4a. Find booking by razorpayOrderId
  //   // SELECT * FROM bookings WHERE razorpayOrderId = orderId
  //
  //   // 4b. If not found → return 200 (orphan payment, log for manual review)
  //   // 4c. If already CONFIRMED → return 200 (idempotent, already processed)
  //
  //   // 4d. Validate payment amount
  //   // Ensure payment.amount === booking.bookingAmount * 100 (paise)
  //   // If mismatch → log error, DO NOT confirm, return 200
  //
  //   // 4e. Update booking:
  //   //   SET status = 'CONFIRMED'
  //   //   SET paymentStatus = 'SUCCESS'
  //   //   SET razorpayPaymentId = paymentId
  //   //   SET paymentConfirmedAt = NOW()
  //   //   SET webhookEventId = event.id (for audit trail)
  //
  //   // 4f. Commit and return 200
  // }

  // Step 5: Handle payment.failed event
  // if (eventType === "payment.failed") {
  //   const payment = event.payload.payment.entity;
  //   const orderId = payment.order_id;
  //
  //   // 5a. Find booking by razorpayOrderId
  //   // 5b. If not found or already CONFIRMED → return 200 (no-op)
  //   // 5c. Update booking:
  //   //   SET status = 'FAILED'
  //   //   SET paymentStatus = 'FAILED'
  //   //   SET updatedAt = NOW()
  //   // 5d. Return 200
  // }

  // Step 6: For all other events, return 200 (acknowledge receipt)
  // Razorpay retries on non-2xx responses, so always return 200
  // for events we don't handle to avoid infinite retries.

  return NextResponse.json({ received: true }, { status: 200 });
}

// NOTE: Disable body parsing — we need the raw body for signature verification.
// In Next.js App Router, request.text() gives us the raw body by default.
// No additional config needed (unlike Pages Router which needs bodyParser: false).
