import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail } from "lucide-react";

export default function NewsLetterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;
    // Simulate subscription success (replace with your API later)
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="bg-primary/5 py-16">
      <div className="max-w-5xl mx-auto text-center px-6">
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
          Stay updated with the latest tour packages, travel guides, and exclusive offers from our team.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-lg mx-auto"
        >
          <div className="relative w-full sm:w-auto flex-grow">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Enter your email"
              className="pl-10 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full sm:w-auto px-6 py-5 text-base"
            disabled={subscribed}
          >
            {subscribed ? "Subscribed!" : "Subscribe"}
          </Button>
        </form>

        {/* Success Message */}
        {subscribed && (
          <div className="flex justify-center items-center gap-2 text-green-600 mt-6">
            <CheckCircle2 className="w-5 h-5" />
            <span>You’ve successfully subscribed!</span>
          </div>
        )}
      </div>
    </section>
  );
}
