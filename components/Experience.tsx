'use client';
import { trackBuyClick } from '@/lib/analytics';

export default function Experience() {
  return (
    <section className="py-24 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">

        <p className="text-xs text-accent uppercase tracking-widest font-bold text-center mb-4">User Reports</p>
        <h2 className="section-heading text-center">
          What Actually Happens in the First Week
        </h2>
        <p className="section-subheading text-center">
          No buzz. No jitters. Something subtler — and more lasting.
        </p>

        {/* Top testimonials — specific, not generic */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              role: 'PhD Student, 28',
              context: 'Dissertation stress, 6 months of brain fog',
              quote: '"Like defragmenting a cluttered hard drive. While reading complex papers, I could remember expressions and context after just 1-2 days. That never happened before."',
              result: 'Days 1–2: Retention dramatically improved',
            },
            {
              role: 'Software Engineer, 34',
              context: 'Chronic burnout after 18 months of 60h weeks',
              quote: '"By day 5, logic clicked on the first pass. I could hold the entire architecture in my head again. Not hyper like on modafinil — just present."',
              result: 'Day 5: Full working memory restored',
            },
            {
              role: 'Marketing Director, 29',
              context: 'Post-concussion fog, 8 months after injury',
              quote: '"Doctors said this is as good as it gets. Week 2, the fog lifted like a window cracked open. I tracked conversations again. Words came back."',
              result: 'Week 2: Normal cognitive function returned',
            },
            {
              role: 'Founder, 42',
              context: 'Age-related cognitive decline, "accepted it"',
              quote: '"I told myself this was just age. By week 3, recall was different — names, details, context on demand. My team noticed before I mentioned anything."',
              result: 'Week 3: Cognitive baseline of a decade prior',
            },
          ].map((t) => (
            <div key={t.role} className="card-accent flex flex-col justify-between">
              <div>
                <p className="text-xs text-text-secondary mb-1">{t.role}</p>
                <p className="text-xs text-accent/70 mb-4 italic">{t.context}</p>
                <p className="text-text-secondary leading-relaxed text-sm mb-4">{t.quote}</p>
              </div>
              <p className="text-accent font-semibold text-xs uppercase tracking-wide">{t.result}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="card mb-12">
          <h3 className="font-bold text-center mb-8 text-lg">The Common Pattern</h3>
          <div className="space-y-8">
            {[
              { phase: 'Days 1–3', label: '"Something\'s different"', items: ['Less resistance starting tasks', 'Information sticks more easily', 'Background anxiety quiets', 'No jitters, no drugged feeling'] },
              { phase: 'Days 4–7', label: '"Wait, this is real"', items: ['Working memory noticeably stronger', 'Long sessions without mental crash', 'Motivation feels intrinsic again', 'Emotional steadiness — fewer spirals'] },
              { phase: 'Weeks 2–4', label: '"This is my new baseline"', items: ['Clarity that doesn\'t fade by afternoon', 'Minimal tolerance build-up', 'Sleep quality often improves', 'Verbal recall and social fluency return'] },
            ].map((phase) => (
              <div key={phase.phase} className="flex gap-6 items-start">
                <div className="flex-shrink-0 text-right w-20">
                  <p className="text-accent font-black text-sm">{phase.phase}</p>
                  <p className="text-text-secondary text-xs italic">{phase.label}</p>
                </div>
                <div className="border-l border-accent/20 pl-6">
                  <ul className="space-y-1">
                    {phase.items.map((item) => (
                      <li key={item} className="text-text-secondary text-sm flex gap-2">
                        <span className="text-accent flex-shrink-0">→</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What it's NOT */}
        <div className="bg-accent-muted border border-accent/20 p-6 rounded-sm mb-12">
          <p className="text-sm font-bold uppercase tracking-wider text-accent mb-4">What ISRIB A15 Is Not</p>
          <div className="grid md:grid-cols-2 gap-2 text-sm text-text-secondary">
            {[
              'Not a stimulant — no jitters, no crash',
              'Not euphoric — no artificial "up"',
              'Not instant — restoration takes 3–7 days',
              'Not "Limitless" — you think like yourself, clearly',
            ].map((item) => (
              <div key={item} className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>{item}</div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://isrib.shop/buy-50-capsules.html"
            onClick={() => trackBuyClick('50-capsules', 240, 'experience_section', 'capsules')}
            className="btn-primary inline-block"
          >
            Start Your Protocol
          </a>
          <p className="text-text-secondary text-xs mt-3">Ships within 48h · COA included</p>
        </div>

      </div>
    </section>
  );
}
