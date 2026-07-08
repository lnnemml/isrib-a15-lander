export default function WhoIsThisFor() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-accent uppercase tracking-widest font-bold text-center mb-4">Who This Is For</p>
        <h2 className="section-heading text-center mb-4">
          This Is For You If...
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            {
              title: 'You\'re sharper than most people your age — but not as sharp as you were at 40, and that gap is widening',
            },
            {
              title: 'You\'ve noticed your memory isn\'t what it used to be — names, words, details that used to come instantly',
            },
            {
              title: 'Brain fog, slower thinking, or mental fatigue that rest doesn\'t fully resolve',
            },
            {
              title: 'You want a research-backed solution, not another supplement that promises everything and delivers nothing',
            },
          ].map((item) => (
            <div key={item.title} className="card-accent hover:border-accent/40 transition-colors">
              <p className="text-text-primary leading-relaxed">{item.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-accent-muted border border-accent/20 p-8 rounded-sm text-center">
          <p className="text-text-secondary leading-relaxed">
            The ISR pathway becomes increasingly active with age. ISRIB A15 was specifically shown to
            reverse cognitive decline in aged animal models — not just support general brain health.
            This is a targeted intervention, not a supplement.
          </p>
        </div>
      </div>
    </section>
  );
}
