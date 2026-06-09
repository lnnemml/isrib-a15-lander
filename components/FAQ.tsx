'use client';

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-accent/20 rounded-lg mb-4 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-secondary/50 hover:bg-secondary transition-all text-left"
      >
        <span className="font-semibold text-lg">{question}</span>
        <span className="text-accent text-2xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="p-6 bg-primary">
          <p className="text-gray-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const faqs = [
    {
      question: "Is ISRIB A15 safe?",
      answer: "In animal studies, ISRIB showed no toxicity at effective doses across multiple research groups. UCSF's Dr. Peter Walter stated: 'We have never seen any relevant side effects. None. It is totally benign.' A15 has a different pharmacokinetic profile from original ISRIB — improved oral bioavailability, shorter systemic exposure per dose. Long-term human data is still emerging, as with all research compounds. We recommend the lowest effective dose and standard cycling protocols."
    },
    {
      question: "How do I take it?",
      answer: "Capsule form: take one 20mg capsule in the morning, before 2pm, with or without food. Most users find 20mg sufficient; some sensitive individuals start at 10mg (powder form). Protocol: 5 days on, 2 days off. Or 2 weeks on, 1 week off. Full dosing guide and cycling strategy included with every order. No solvents, no scale required for capsule form."
    },
    {
      question: "Is it legal?",
      answer: "Yes. ISRIB A15 is sold as a research compound for personal investigation. It is not a scheduled substance in any major jurisdiction. It is not FDA-approved and not intended to diagnose, treat, cure, or prevent disease. Purchasing is legal; use is for personal research only."
    },
    {
      question: "What about purity — how do I know it's not contaminated?",
      answer: "This is the right question to ask of any research compound vendor. Our answer: in-house synthesis by a pharmaceutical chemists, NMR verification on every batch, 98%+ HPLC purity, Certificate of Analysis included with every order. We don't buy bulk powder and rebrand it. We synthesize, purify, and verify. You can request the COA before purchasing."
    },
    {
      question: "Will I feel it immediately?",
      answer: "Not like a stimulant. ISRIB works by restoring protein synthesis — this takes 24-72 hours to produce measurable effects. Most users notice subtle changes by day 3 (easier task initiation, information sticking better). By day 5-7, the effect becomes unmistakable. If you feel nothing after 2 weeks, contact us — we'll troubleshoot dosing and timing."
    },
  ];
  
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-center mb-4">
          Common Questions
        </h2>
        <p className="section-subheading text-center mb-12">
          Everything you need to know before starting with ISRIB A15.
        </p>
        
        <div>
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="mt-12 text-center bg-accent/10 border border-accent/30 p-8 rounded-lg">
          <p className="text-lg mb-6 font-semibold">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <a 
              href="mailto:support@isrib.shop"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Support
            </a>
          </div>
          <p className="text-gray-300 text-sm">
            Email: <a href="mailto:isrib.shop@protonmail.com" className="text-accent hover:underline">isrib.shop@protonmail.com</a>
            <br />We read and respond to every message within 12 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
