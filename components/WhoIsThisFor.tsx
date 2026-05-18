export default function WhoIsThisFor() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-accent uppercase tracking-widest font-bold text-center mb-4">Who This Is For</p>
        <h2 className="section-heading text-center mb-4">
          This Is For You If...
        </h2>
        <p className="section-subheading text-center">
          You've tried the obvious things. They helped for a week, then plateaued.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {[
            { icon: '🌫️', title: 'Brain fog that rest doesn\'t fix', body: 'You wake up already foggy. Coffee helps for 90 minutes. Then you\'re back to struggling through simple decisions.' },
            { icon: '⏸️', title: 'Procrastination as your default', body: 'You open the file, then close it. Open it again. You\'re not avoiding work — your brain is refusing to engage.' },
            { icon: '📉', title: 'Stimulants with diminishing returns', body: 'Modafinil worked great for 6 months. Now it gives you anxiety and 2 hours of clarity followed by a worse crash.' },
            { icon: '🔁', title: 'Memory that slides off', body: 'You read a paragraph. By the end of the page it\'s gone. You used to hold architecture in your head for hours.' },
          ].map((item) => (
            <div key={item.title} className="card-accent hover:border-accent/40 transition-colors">
              <div className="flex items-start gap-4">
                <span className="text-2xl mt-1 flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-accent-muted border border-accent/20 p-8 rounded-sm text-center">
          <p className="text-lg font-bold text-accent mb-2">If 2+ of these describe you:</p>
          <p className="text-xl text-text-primary font-semibold mb-3">
            The ISR pathway is likely your bottleneck — not your discipline, not your sleep hygiene, not your stack.
          </p>
          <p className="text-text-secondary text-sm">
            ISRIB A15 is the only compound that targets this specific pathway at the cellular level.
          </p>
        </div>
      </div>
    </section>
  );
}
