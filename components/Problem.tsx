export default function Problem() {
  return (
    <section className="py-24 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">

        <h2 className="section-heading text-center">
          The Hidden Brake Blocking Your Cognition
        </h2>

        {/* VOC agitation */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-lg text-text-secondary leading-relaxed mb-4">
            You haven't lost your intelligence. You haven't gotten lazy. Your drive is the same.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            But information doesn't stick. Tasks take 3x longer. The sharp version of yourself
            feels like a different person.
          </p>
        </div>

        {/* VOC quotes — positioned BEFORE mechanism */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {[
            { quote: '"My ADHD meds stopped working. Turns out my brain had a \'brake\' on."', role: 'Software engineer, 31' },
            { quote: '"I was working in a startup for 3 years, burning out completely... cognitive decline I couldn\'t fix with just rest."', role: 'Founder, 38' },
            { quote: '"My brain was stuck in stress response mode. Modafinil made it worse."', role: 'AI researcher, 34' },
            { quote: '"Procrastination isn\'t laziness — it\'s cognitive friction. I know what needs to get done. My brain just won\'t start."', role: 'Founder, 42' },
          ].map((item) => (
            <div key={item.role} className="border-l-4 border-accent bg-tertiary rounded-r-lg px-6 py-4">
              <p className="italic text-text-primary leading-relaxed mb-3 text-base">{item.quote}</p>
              <p className="text-xs text-text-secondary uppercase tracking-wider font-bold">{item.role}</p>
            </div>
          ))}
        </div>

        {/* Mechanism — AFTER emotional hook */}
        <div className="border border-accent/20 rounded-lg p-8 mb-10 bg-tertiary space-y-6">
          <p className="text-sm text-accent uppercase tracking-widest font-bold mb-4">What's Actually Happening</p>
          <p className="text-base text-text-secondary leading-relaxed">
            When your body registers chronic stress — from overwork, poor sleep, inflammation,
            or aging — neurons activate the{' '}
            <span className="text-accent font-semibold">Integrated Stress Response (ISR)</span>.
          </p>
          <p className="text-base text-text-secondary leading-relaxed">
            ISR halts protein synthesis as a protective mechanism. In acute stress, this is correct behavior.
            Under chronic modern conditions, <span className="text-text-primary font-semibold">it never turns off</span>.
          </p>
          <p className="text-base text-text-secondary leading-relaxed">
            The result: memory formation blocked. Cognitive throughput throttled.
            Motivation pathways suppressed. Not because your brain is damaged —
            because it's running a protection protocol that never got the "all clear" signal.
          </p>
        </div>

        {/* Before/After — compact */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-danger/30 rounded-lg p-8 bg-tertiary">
            <h3 className="text-xs font-black uppercase tracking-widest text-danger mb-6">
              ISR Active — Your Current State
            </h3>
            <ul className="space-y-3">
              {[
                'Protein synthesis suppressed in neurons',
                'Long-term memory formation blocked',
                'Information processing degraded',
                'Task initiation requires enormous effort',
                'Stimulants give diminishing returns',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-text-primary">
                  <span className="text-danger flex-shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-accent/30 rounded-lg p-8 bg-tertiary">
            <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-6">
              ISR Released — Target State
            </h3>
            <ul className="space-y-3">
              {[
                'Protein synthesis resumes in neurons',
                'Memory consolidation pathway restored',
                'Information processing normalized',
                'Task initiation feels natural again',
                'No stimulant required',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-text-primary">
                  <span className="text-accent flex-shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The reframe */}
        <div className="text-center bg-accent-muted border border-accent/20 p-8 rounded-sm">
          <p className="text-xl font-bold text-accent mb-3">
            Every stimulant you've tried was pushing harder on the gas
            while the emergency brake was still engaged.
          </p>
          <p className="text-text-secondary">
            ISRIB A15 doesn't push. It releases the brake.
          </p>
        </div>

      </div>
    </section>
  );
}
