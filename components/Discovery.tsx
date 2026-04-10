import { trackBuyClick } from '@/lib/analytics';

export default function Discovery() {
  const handleBuyClick = () => {
    trackBuyClick('1g', 200, 'discovery_section');
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-center">
          The Discovery That Changed Everything
        </h2>
        
        <p className="section-subheading text-center">
          In 2013, UCSF scientists found a way to release that brake.
        </p>
        
        <div className="prose prose-invert prose-lg max-w-none">
          {/* The Cellular Brake */}
          <div className="bg-secondary/30 p-8 rounded-lg mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="text-2xl font-bold text-accent m-0">The Cellular Brake</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Dr. Peter Walter's lab at UCSF wasn't chasing a "smart drug." They were studying cellular stress responses — molecular housekeeping.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Post-doc Carmela Sidrauski tested thousands of compounds to see if any could calm the cellular alarm system.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <span className="text-accent font-semibold">One compound worked.</span> They called it ISRIB — Integrated Stress Response Inhibitor.
            </p>
          </div>
          
          {/* The Discovery */}
          <div className="bg-secondary/30 p-8 rounded-lg mb-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold text-accent m-0">The Discovery</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary p-6 rounded-lg border border-accent/20">
                <h4 className="text-xl font-bold mb-3 text-accent">The Mechanism</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  ISRIB binds to eIF2B protein complex, locking it in the "on" position. This allows neurons to continue making proteins needed for memory and learning, even under stress.
                </p>
              </div>
              
              <div className="bg-primary p-6 rounded-lg border border-accent/20">
                <h4 className="text-xl font-bold mb-3 text-accent">The Difference</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  Unlike stimulants that push harder, ISRIB releases the brake at a fundamental cellular level, restoring your brain's natural capacity.
                </p>
              </div>
            </div>
          </div>
          
          {/* The Reset */}
          <div className="bg-accent/10 border-l-4 border-accent p-8 rounded-r-lg mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold m-0">The Reset</h3>
            </div>
            <p className="text-lg font-semibold text-accent mb-6">The Results That Shocked Scientists:</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-lg mb-2 text-accent">Old Mice → Young Brains</h4>
                <p className="text-gray-300">
                  Elderly mice (equivalent to 65+ human years) that struggled with memory tests began navigating mazes like teenagers after just 3 days of ISRIB. The improvements lasted for weeks.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2 text-accent">Brain Injury → Full Recovery</h4>
                <p className="text-gray-300">
                  Mice with severe traumatic brain injuries (permanent damage) regained normal cognitive function. Working memory returned. Spatial learning normalized. Even when treated months after injury.
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-2 text-accent">Genetic Disorders → Reversed</h4>
                <p className="text-gray-300">
                  Down syndrome and Fragile X model mice showed improved learning and synaptic function. Deficits previously thought irreversible began to correct.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center p-8 bg-secondary/50 rounded-lg">
            <blockquote className="text-xl italic text-gray-300 mb-4">
              "We have never seen any relevant side effects. None. It is totally benign."
            </blockquote>
            <p className="text-accent font-semibold">— Dr. Peter Walter, UCSF, ISRIB Co-Inventor</p>
          </div>
        </div>
        
        {/* Early CTA */}
        <div className="mt-12 text-center">
          <a 
            href="https://isrib.shop/buy-1g.html"
            onClick={handleBuyClick}
            className="btn-primary inline-block"
          >
            Try ISRIB A15
          </a>
          <p className="text-sm text-gray-400 mt-4">
            Limited research batch • Ships within 48h
          </p>
        </div>
      </div>
    </section>
  );
}
