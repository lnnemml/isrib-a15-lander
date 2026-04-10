export default function PurityGuarantee() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading text-center mb-4">
          How We Ensure Purity
        </h2>
        
        <p className="section-subheading text-center mb-12">
          Every batch is synthesized in-house and tested to pharmaceutical standards.
        </p>
        
        {/* Key Purity Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-primary p-6 rounded-lg border border-accent/30 text-center">
            <div className="text-4xl font-bold text-accent mb-2">98.7%</div>
            <p className="text-gray-300 font-semibold mb-1">Purity (HPLC)</p>
            <p className="text-sm text-gray-400">Verified by high-performance liquid chromatography</p>
          </div>
          
          <div className="bg-primary p-6 rounded-lg border border-accent/30 text-center">
            <div className="text-4xl font-bold text-accent mb-2">0</div>
            <p className="text-gray-300 font-semibold mb-1">Fillers or Excipients</p>
            <p className="text-sm text-gray-400">Pure ISRIB A15, nothing else</p>
          </div>
          
          <div className="bg-primary p-6 rounded-lg border border-accent/30 text-center">
            <div className="text-4xl font-bold text-accent mb-2">100%</div>
            <p className="text-gray-300 font-semibold mb-1">In-House Synthesis</p>
            <p className="text-sm text-gray-400">Not resold from unknown sources</p>
          </div>
        </div>
        
        {/* Process Flow */}
        <div className="bg-gradient-to-br from-secondary to-primary p-8 rounded-lg border border-accent/20 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Our Quality Process</h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-accent/10 border-2 border-accent/30 p-6 rounded-lg text-center hover:bg-accent/20 transition-all">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⚗️</span>
                </div>
                <h4 className="font-bold mb-2 text-accent">1. Synthesis</h4>
                <p className="text-sm text-gray-300">
                  Synthesized in our controlled laboratory using pharmaceutical-grade reagents
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <span className="text-accent text-2xl">→</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-accent/10 border-2 border-accent/30 p-6 rounded-lg text-center hover:bg-accent/20 transition-all">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🧪</span>
                </div>
                <h4 className="font-bold mb-2 text-accent">2. Purification</h4>
                <p className="text-sm text-gray-300">
                  Multi-stage purification to remove impurities and isolate pure compound
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <span className="text-accent text-2xl">→</span>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="bg-accent/10 border-2 border-accent/30 p-6 rounded-lg text-center hover:bg-accent/20 transition-all">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h4 className="font-bold mb-2 text-accent">3. QC Testing</h4>
                <p className="text-sm text-gray-300">
                  LC-MS/HPLC analysis confirms purity, identity, and absence of contaminants
                </p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <span className="text-accent text-2xl">→</span>
              </div>
            </div>
            
            {/* Step 4 */}
            <div>
              <div className="bg-accent/10 border-2 border-accent/30 p-6 rounded-lg text-center hover:bg-accent/20 transition-all">
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📦</span>
                </div>
                <h4 className="font-bold mb-2 text-accent">4. Packaging</h4>
                <p className="text-sm text-gray-300">
                  Sealed in amber glass vials with desiccant to preserve stability
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* COA Promise */}
        <div className="mt-8 text-center bg-accent/10 border border-accent/30 p-6 rounded-lg">
          <p className="text-lg font-semibold mb-2">
            <span className="text-accent">Certificate of Analysis (COA)</span> included with every order
          </p>
          <p className="text-gray-300">
            See the exact purity data for your specific batch — full transparency, no guesswork.
          </p>
        </div>
      </div>
    </section>
  );
}
