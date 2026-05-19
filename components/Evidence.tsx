export default function Evidence() {
  return (
    <section id="evidence" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs text-accent uppercase tracking-widest font-bold text-center mb-4">Why Source Matters</p>
        <h2 className="section-heading text-center">
          Not a Reseller. A Chemist.
        </h2>
        <p className="section-subheading text-center max-w-2xl mx-auto">
          Every other vendor selling ISRIB A15 is a B2B reagent supplier.
          They buy bulk powder from unknown sources, rebrand it, and write spec sheets
          for lab procurement teams. No one checks the actual purity.
          We synthesize in-house. Every batch is NMR-verified before it ships.
          That's the only way to know what's actually in the compound you're taking.
        </p>

        <div className="bg-tertiary border border-accent/20 rounded-xl p-10 md:p-14">
          {/* Competitor comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="card border-danger/20 p-8">
              <p className="text-xs text-danger uppercase tracking-wider font-bold mb-4">Other Vendors</p>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>Bulk white-label supply, unknown origin</li>
                <li className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>No synthesis documentation</li>
                <li className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>Sold as analytical standard, not for use</li>
                <li className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>AMSBIO: $415 for 50mg powder</li>
                <li className="flex gap-2"><span className="text-danger flex-shrink-0">✗</span>No dosing guidance, no protocol</li>
              </ul>
            </div>
            <div className="card-accent p-8">
              <p className="text-xs text-accent uppercase tracking-wider font-bold mb-4">Our Synthesis</p>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li className="flex gap-2"><span className="text-accent flex-shrink-0">✓</span>In-house synthesis by pharmaceutical chemists</li>
                <li className="flex gap-2"><span className="text-accent flex-shrink-0">✓</span>NMR verification every batch</li>
                <li className="flex gap-2"><span className="text-accent flex-shrink-0">✓</span>98%+ HPLC purity, COA with every order</li>
                <li className="flex gap-2"><span className="text-accent flex-shrink-0">✓</span>1g for $200 — ~20x better value per dose</li>
                <li className="flex gap-2"><span className="text-accent flex-shrink-0">✓</span>Capsule form: no solvents, pre-dosed 20mg</li>
              </ul>
            </div>
          </div>

          {/* Purity stats */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            {[
              { stat: '98.7%', label: 'Purity (HPLC)', sub: 'Batch-verified' },
              { stat: '0', label: 'Fillers or excipients', sub: 'Pure compound only' },
              { stat: '100%', label: 'In-house synthesis', sub: 'Not resold' },
            ].map((item) => (
              <div key={item.label} className="card text-center py-8">
                <div className="text-3xl md:text-4xl font-black text-accent mb-1">{item.stat}</div>
                <p className="text-text-primary text-sm font-semibold mb-1">{item.label}</p>
                <p className="text-text-secondary text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* COA promise */}
          <div className="bg-accent-muted border border-accent/20 p-8 rounded-sm text-center mt-2">
            <p className="text-text-primary font-semibold mb-2">
              Certificate of Analysis (COA) included with every order
            </p>
            <p className="text-text-secondary text-sm">
              Batch-specific purity data. You see exactly what you're getting before you take it.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
