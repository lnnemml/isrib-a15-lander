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
      question: 'Is this safe for someone in their 50s or 60s?',
      answer: 'ISRIB A15 is non-stimulant and does not affect heart rate, blood pressure, or sleep architecture. In animal studies, it showed no toxicity at effective doses. It works by releasing a cellular stress response — not by stimulating or sedating. That said, if you are on prescription medications, consult your doctor before use.',
    },
    {
      question: 'Will it interact with my medications?',
      answer: 'ISRIB A15 does not work through dopamine, serotonin, or adrenergic pathways, so interactions with most common medications are unlikely. However, we cannot account for all individual cases. If you take prescription medications, discuss with your doctor before starting.',
    },
    {
      question: 'How quickly will I notice a difference?',
      answer: 'Most users report the first noticeable changes between days 3–7. Clarity and word recall tend to come first. Memory consolidation improvements typically become clear in week 2. Effects appear to persist beyond the dosing period in most reports.',
    },
    {
      question: 'What exactly is ISRIB A15?',
      answer: 'ISRIB A15 is a research compound — an analog of ISRIB, a molecule discovered at UCSF in 2013. It works by stabilizing eIF2B, a protein complex that regulates memory formation in the brain. It is not a supplement, not a stimulant, and not a drug. It is sold as a research compound.',
    },
    {
      question: 'Is it legal?',
      answer: 'Yes. ISRIB A15 is not a controlled substance in the US, UK, EU, Canada, or Australia. It is sold legally as a research compound for personal use.',
    },
    {
      question: 'How do I take it?',
      answer: 'Capsules: one 20mg capsule every day is the standard protocol. Take with food. Do not exceed one capsule per day while starting your cycle. If everything is going well, you may increase to 40mg (2 capsules). Powder: measure carefully with a precision scale.',
    },
    {
      question: "What if I've tried other supplements and been disappointed?",
      answer: 'ISRIB A15 works on a completely different mechanism than supplements — it targets the cellular stress response directly, not neurotransmitter levels. It\'s more accurate to compare it to a cellular intervention than a brain supplement. That said, individual responses vary.',
    },
    {
      question: 'What about purity — how do I know what I\'m getting?',
      answer: 'In-house synthesis by a pharmaceutical chemist with 10+ years synthesis experience. NMR verification on every batch. 98%+ HPLC purity. Certificate of Analysis included with every order. We don\'t buy bulk powder and rebrand it. You can request the COA before purchasing.',
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
