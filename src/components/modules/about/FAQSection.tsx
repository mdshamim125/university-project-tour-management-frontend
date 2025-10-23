import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How can I book a tour package?",
      answer:
        "You can easily book a tour through our website. Simply browse the available packages, choose your preferred one, and click on the 'Book Now' button. You’ll then be guided through a secure booking process.",
    },
    {
      question: "Do you offer custom tour packages?",
      answer:
        "Yes, we offer tailor-made tour packages to match your travel preferences, budget, and schedule. You can contact our support team to customize your itinerary.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment options including credit/debit cards, mobile banking (bKash, Nagad), and direct bank transfers for your convenience.",
    },
    {
      question: "Are meals and accommodations included in the tour price?",
      answer:
        "Most of our packages include meals, accommodations, and local transport. However, the details vary depending on the package. Please check the 'Included' section on the tour details page.",
    },
    {
      question: "What if I need to cancel my booking?",
      answer:
        "You can cancel your booking by contacting our support team. Cancellation charges may apply depending on the notice period and the tour type.",
    },
    {
      question: "Is transportation included in all tours?",
      answer:
        "Yes, all tours include transportation between the listed destinations. Pickup and drop-off points are mentioned in each tour description.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of the most common questions our travelers ask about
            booking, payments, and tours.
          </p>
        </motion.div>

        {/* Accordion Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-gray-200 dark:border-gray-700 rounded-xl"
              >
                <AccordionTrigger className="text-lg font-semibold px-4 py-3 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
