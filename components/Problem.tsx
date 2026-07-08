export default function Problem() {
  return (
    <section className="py-24 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">

        <h2 className="section-heading text-center">
          Why Your Brain Slows Down After 50
        </h2>

        <div className="max-w-2xl mx-auto mb-16 text-center">
          <p className="text-lg text-text-secondary leading-relaxed mb-4">
            You sleep enough. You exercise. You stay sharp at work.
            So why does your brain feel slower than it did ten years ago?
          </p>
          <p className="text-lg text-text-secondary leading-relaxed">
            The answer isn't what most people assume — and it isn't permanent.
          </p>
        </div>

        {/* Mechanism */}
        <div className="border border-accent/20 rounded-lg p-8 mb-10 bg-tertiary space-y-6">
          <p className="text-sm text-accent uppercase tracking-widest font-bold mb-4">What's Actually Happening</p>
          <p className="text-base text-text-secondary leading-relaxed">
            Under decades of accumulated stress, your brain cells activate a protective shutdown —
            stopping the protein synthesis needed for memory and clear thinking. Scientists call this
            the <span className="text-accent font-semibold">Integrated Stress Response (ISR)</span>.
          </p>
          <p className="text-base text-text-secondary leading-relaxed">
            In short-term stress, this is the correct response. But after years of buildup,{' '}
            <span className="text-text-primary font-semibold">it doesn't turn off on its own</span>.
            The brake stays engaged. Your brain keeps running the protection protocol even when
            there's no acute threat — and that's when cognition starts to slip.
          </p>
        </div>

        {/* Before/After table */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-danger/30 rounded-lg p-8 bg-tertiary">
            <h3 className="text-xs font-black uppercase tracking-widest text-danger mb-6">
              What aging brains experience
            </h3>
            <ul className="space-y-4">
              {[
                'Words disappear mid-sentence',
                'Reading the same paragraph twice',
                'Mental fog that sleep doesn\'t fix',
                'Slower to process complex information',
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
              What ISRIB A15 targets
            </h3>
            <ul className="space-y-4">
              {[
                'Protein synthesis restored in neurons',
                'Memory consolidation reactivated',
                'ISR brake released at cellular level',
                'Synaptic function normalized',
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
            The slowdown isn't permanent damage. It's a cellular response that can be reversed.
          </p>
          <p className="text-text-secondary">
            ISRIB A15 was developed specifically to release the ISR brake — restoring the protein
            synthesis your neurons need for memory and clear thinking.
          </p>
        </div>

      </div>
    </section>
  );
}
