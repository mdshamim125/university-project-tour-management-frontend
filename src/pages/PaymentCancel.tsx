import { useSearchParams, Link } from "react-router";
import { Ban, ArrowLeft, Info } from "lucide-react";

const PaymentCancel = () => {
  const searchParams = useSearchParams()[0];

  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <Ban className="text-yellow-600 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was cancelled before completion.
        </p>

        {/* Details */}
        <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 text-left">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Transaction ID:</span> {transactionId}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Amount:</span> {amount} ৳
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Status:</span>
            <span className="ml-1 text-yellow-700 font-medium">{status}</span>
          </p>
        </div>

        {/* Retry */}
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium mt-6 px-5 py-3 rounded-lg shadow transition"
        >
          <Info className="w-5 h-5" />
          Choose Another Package
        </Link>

        {/* Back */}
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

export default PaymentCancel;
