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
      answer: "In animal studies, ISRIB showed no toxicity at effective doses. UCSF researchers called it 'totally benign.' However, it's an experimental compound — long-term human data is still emerging. We recommend starting with the lowest effective dose and monitoring your response."
    },
    {
      question: "Will I feel anything immediately?",
      answer: "Most users notice subtle changes within 3-5 days — easier task initiation, better retention, less mental fog. By day 7, effects become undeniable. This is restoration, not stimulation, so don't expect an instant buzz like caffeine."
    },
    {
      question: "How does it compare to Modafinil or Adderall?",
      answer: "Unlike stimulants that force wakefulness and focus, ISRIB releases a biological brake—restoring your brain's natural capacity. No jitters, no crash, no dependence. Modafinil pushes; ISRIB unlocks. Many users find them complementary rather than competing."
    },
    {
      question: "What if I've tried everything and nothing works?",
      answer: "ISRIB works on a fundamentally different mechanism than racetams, adaptogens, or stimulants. It targets the Integrated Stress Response — a pathway most nootropics don't touch. If your cognition is blocked by chronic ISR activation, ISRIB may succeed where others failed."
    },
    {
      question: "How do I take it?",
      answer: "Start with 10mg in the morning (before 2pm), fasted or with light food. Use a milligram scale for accuracy. Most users settle at 10-15mg per dose. Cycle 5 days on / 2 days off, or take for 2 weeks then 1 week off. Full dosing guide included with purchase."
    },
    {
      question: "Will it make me anxious or affect my sleep?",
      answer: "No. ISRIB is not a stimulant — it has no dopaminergic or adrenergic activity. Many users report better sleep as stress signaling normalizes. Take before 2pm to ensure it doesn't interfere with your circadian rhythm."
    },
    {
      question: "Is this legal?",
      answer: "Yes. ISRIB A15 is sold as a research compound. It's not FDA-approved and not intended to diagnose, treat, cure, or prevent disease. Purchase and use is for personal research only."
    },
    {
      question: "What if it doesn't work for me?",
      answer: "Most responders (70-80%) notice clear cognitive shifts within a week when sleep and nutrition are adequate. If you're a non-responder, contact us—we'll troubleshoot dosing, timing, and underlying factors together. ISR may not be your bottleneck, but we'll figure it out."
    }
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
