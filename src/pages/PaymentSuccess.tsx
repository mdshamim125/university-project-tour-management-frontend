import { useSearchParams, Link } from "react-router";
import { CheckCircle, ArrowLeft } from "lucide-react";

const PaymentSuccess = () => {
  const searchParams = useSearchParams()[0];

  const transactionId = searchParams.get("transactionId");
  const message =
    searchParams.get("message") || "Payment completed successfully!";
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-600 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Transaction Details Box */}
        <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 text-left">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Amount Paid:</span> {amount} ৳
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Payment Status:</span>
            <span
              className={`ml-1 font-medium ${
                status === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </span>
          </p>
          <p className="text-left text-sm mt-2">Check your email for the invoice and booking details.</p>
        </div>

        

        {/* Go Back Button */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-gray-600 mt-4 hover:text-gray-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
