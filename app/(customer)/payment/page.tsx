import Payment from "@/components/Payment";
import { Button } from "@/components/ui/button";
import React from "react";

const PaymentPage = () => {
  return (
    <div>
      <Payment
        amountInRupees={500} // Example amount
        customerData={{
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
        }}
        companyName="Bangalore Street Food"
        description="Payment for your order"
        themeColor="#F37254"
        onPaymentSuccess={(response) => {
          console.log("Payment successful:", response);
          // Handle post-payment success actions here
        }}
        onPaymentFailure={(error) => {
          console.error("Payment failed:", error);
          // Handle post-payment failure actions here
        }}
      >
        <Button>Pay Now</Button>
      </Payment>
    </div>
  );
};

export default PaymentPage;

// {
//   "Registered Name": "Razorpay Payments Private Limited",
//   "CIN": "U62099KA2024PTC188982",
//   "PAN": "AANCR6717K",
//   "TAN": "BLRR30567F",
//   "GST": "29AANCR6717K1ZN"
// }
