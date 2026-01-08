import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "How can I donate food?", a: "Click 'Add Food', fill in details, and your food will be listed." },
  { q: "Can anyone request food?", a: "Yes, registered users can request available food." },
  { q: "Is there a cost?", a: "No, all food sharing is free of charge." },
  { q: "How do I manage my requests?", a: "Go to 'My Food Requests' to approve or track requests." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl cursor-pointer shadow hover:shadow-md transition"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{faq.q}</h3>
              {openIndex === i ? (
                <ChevronUp className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-green-600 dark:text-green-400" />
              )}
            </div>
            {openIndex === i && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
