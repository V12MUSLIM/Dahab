import { Badge } from "../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    {
      question: "What's the best time to visit Dahab?",
      answer: "The best time to visit Dahab is from September to November and March to May when temperatures are comfortable (20-30°C). Summer can be very hot, while winter evenings can be cool.",
    },
    {
      question: "Do I need a diving certification?",
      answer: "No certification is needed for introductory dives or snorkeling. However, for deeper dives like the Blue Hole, you'll need at least an Open Water certification. We offer PADI courses for all levels.",
    },
    {
      question: "Is Dahab safe for solo travelers?",
      answer: "Yes, Dahab is known for being one of the safest destinations in Egypt, with a welcoming community and low crime rates. The laid-back atmosphere makes it perfect for solo travelers.",
    },
    {
      question: "What currency should I bring?",
      answer: "Egyptian Pounds (EGP) are the local currency. US Dollars and Euros are widely accepted. ATMs are available, and most dive centers and hotels accept credit cards.",
    },
    {
      question: "How do I get to Dahab?",
      answer: "Fly into Sharm El-Sheikh International Airport (1.5 hours drive) or Cairo (6-8 hours drive). We can arrange airport transfers for your convenience.",
    },
  ];

  return (
    <motion.div
      className="py-20 bg-muted/30 dark:bg-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about visiting Dahab
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-background border rounded-lg px-4 md:px-6 hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0" />
                      <span className="font-semibold text-sm sm:text-base">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </motion.div>
  );
}