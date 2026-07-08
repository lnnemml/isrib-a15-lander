'use client';
import { useRouter } from 'next/navigation';
import { trackBuyClick } from '@/lib/analytics';

export default function Experience() {
  const router = useRouter();

  const handleBuyClick = () => {
    trackBuyClick('50-capsules', 240, 'experience_section', 'capsules');
    router.push('/checkout?product=50caps');
  };

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

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            {
              attribution: '— Male, 57, United States',
              result: 'Days 1–2',
              quote: '"I wasn\'t expecting much. I\'ve tried a lot of things over the years. But by the second day I noticed I was finishing thoughts more easily. Small thing, but it hadn\'t happened in a while."',
            },
            {
              attribution: '— Male, 54, Canada',
              result: 'Day 5',
              quote: '"The fog I\'d written off as just getting older — it started lifting. Not dramatically. Just… cleaner thinking. I could hold more in my head at once."',
            },
            {
              attribution: '— Male, 62, United Kingdom',
              result: 'Week 2',
              quote: '"My memory for names and details came back in a way I hadn\'t experienced in years. I\'d genuinely assumed that was just gone."',
            },
            {
              attribution: '— Male, 61, United States',
              result: 'Week 3',
              quote: '"I\'m 61. I didn\'t expect a research compound to do what years of supplements didn\'t. But here we are."',
            },
          ].map((t) => (
            <div key={t.attribution} className="card-accent flex flex-col justify-between">
              <div>
                <p className="text-xs text-accent/70 mb-4 italic">{t.result}</p>
                <p className="text-text-secondary leading-relaxed text-sm mb-4">{t.quote}</p>
              </div>
              <p className="text-text-secondary text-xs">{t.attribution}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="card mb-12">
          <h3 className="font-bold text-center mb-8 text-lg">The Common Pattern</h3>
          <div className="space-y-8">
            {[
              { phase: 'Days 1–3', label: '"Something\'s different"', items: ['Less resistance starting tasks', 'Information sticks more easily', 'No jitters, no drugged feeling', 'Background noise quiets'] },
              { phase: 'Days 4–7', label: '"Wait, this is real"', items: ['Working memory noticeably stronger', 'Longer focus without fatigue', 'Word recall improves', 'Emotional steadiness — fewer spirals'] },
              { phase: 'Weeks 2–4', label: '"This is my new baseline"', items: ['Clarity that doesn\'t fade by afternoon', 'Memory for names and details returns', 'Sleep quality often improves', 'Effects persist beyond dosing'] },
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
              'Not a supplement — works at the cellular level',
            ].map((item) => (
              <div key={item} className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>{item}</div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleBuyClick}
            className="btn-primary inline-block"
          >
            Start Your Protocol
          </button>
          <p className="text-text-secondary text-xs mt-3">Ships within 48h · COA included</p>
        </div>

      </div>
    </section>
  );
}
