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

    // Simulate API success
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="bg-primary/5 md:px-16 px-8 md:py-10 py-6">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text & Form */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Travel Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
            Get the latest tour deals, travel guides, and exclusive offers —
            straight to your inbox!
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
          >
            <div className="relative w-full sm:w-auto flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Your email address"
                className="pl-12 h-12 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="h-12 px-8 rounded-xl text-base font-medium"
              disabled={subscribed}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </Button>
          </form>

          {subscribed && (
            <div className="mt-4 flex justify-center lg:justify-start items-center gap-2 text-green-600 font-medium">
              <CheckCircle2 className="w-5 h-5" />
              <span>Subscribed successfully!</span>
            </div>
          )}

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            We respect your privacy. No spam ever. 💌
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://img.freepik.com/premium-vector/concept-newsletter_118813-9660.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Newsletter illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
