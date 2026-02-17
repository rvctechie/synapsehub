import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "What is SynapseHub?",
    answer: "SynapseHub is an all-in-one CRM and marketing automation platform designed specifically for companies to manage leads, automate follow-ups, and scale their business without juggling multiple tools."
  },
  {
    question: "Can I replace my current CRM?",
    answer: "Absolutely. SynapseHub includes a full-featured CRM, pipeline management, email marketing, SMS automation, and funnel builder. Most of our users replace 3-5 other software subscriptions."
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees. You can start your 14-day free trial immediately and access all features based on your chosen plan."
  },
  {
    question: "Do you offer support?",
    answer: "Yes! We offer 24/7 chat support for all plans. The Unlimited and SaaS plans also include priority support options to ensure your company never faces downtime."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, there are no long-term contracts. You can cancel your subscription at any time from your dashboard with just a few clicks."
  },
  {
    question: "Is it GDPR compliant?",
    answer: "Yes, SynapseHub is fully GDPR compliant. We take data security seriously and provide all the tools you need to manage your clients' data responsibly."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-400">Everything you need to know about SynapseHub.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-800 rounded-lg bg-slate-900 overflow-hidden">
              <button
                className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-slate-200">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
              >
                <p className="text-slate-400 text-sm leading-relaxed pb-2">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}