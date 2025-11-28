import { useSearchParams, Link } from "react-router";
import { XCircle, AlertTriangle, ArrowLeft } from "lucide-react";

const PaymentFail = () => {
  const searchParams = useSearchParams()[0];

  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");
  const status = searchParams.get("status");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center border border-gray-200">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <XCircle className="text-red-600 w-16 h-16" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h1>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed.
        </p>

        {/* Details */}
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 text-left">
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId}
          </p>
          <p className="text-sm text-gray-700 mb-2">
            <span className="font-semibold">Amount Attempted:</span> {amount} ৳
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Status:</span>
            <span className="ml-1 text-red-600 font-medium">{status}</span>
          </p>
        </div>

        {/* Retry Button */}
        <Link
          to="/payment/retry"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium mt-6 px-5 py-3 rounded-lg shadow transition"
        >
          <AlertTriangle className="w-5 h-5" />
          Try Again
        </Link>

        {/* Back Home */}
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

export default PaymentFail;
