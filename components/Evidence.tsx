export default function Evidence() {
  return (
    <section id="evidence" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading text-center">
          The Science Is Undeniable
        </h2>
        
        <p className="section-subheading text-center">
          Published in top scientific journals. Validated by leading researchers.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-accent mb-2">2013</div>
            <p className="text-gray-300">Initial discovery at UCSF</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-accent mb-2">2017</div>
            <p className="text-gray-300">TBI reversal study published</p>
          </div>
          <div className="bg-primary p-6 rounded-lg text-center">
            <div className="text-4xl font-bold text-accent mb-2">2020</div>
            <p className="text-gray-300">Aging reversal breakthrough</p>
          </div>
        </div>
        
        <div className="space-y-6 mb-12">
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent">
            <h3 className="text-xl font-bold mb-3">Study: Traumatic Brain Injury (2017)</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Brain-injured mice regained normal memory and learning</li>
              <li>• Treatment effective even 4 months post-injury</li>
              <li>• Synaptic connections physically regrew</li>
              <li>• Benefits persisted weeks after treatment ended</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">Source: Science, UCSF</p>
          </div>
          
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent">
            <h3 className="text-xl font-bold mb-3">Study: Age-Related Decline (2020)</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Elderly mice treated for just 3 days</li>
              <li>• Performed like young mice in cognitive tests weeks later</li>
              <li>• Memory formation restored to youthful levels</li>
              <li>• Lead researcher: "The aged brain isn't lost — it's trapped"</li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">Source: eLife</p>
          </div>
          
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent">
            <h3 className="text-xl font-bold mb-3">Safety Profile</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• No toxicity observed at effective doses</li>
              <li>• No behavioral abnormalities</li>
              <li>• No organ damage in animal studies</li>
              <li>• Currently in human clinical trials (Calico/Google)</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-accent/10 border border-accent/30 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">What This Means For You</h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            Whether you're dealing with chronic stress, post-concussion fog, age-related slowdown, or just hitting a performance wall — the mechanism is the same: <span className="text-accent font-semibold">an overactive ISR blocking your brain's natural capacity</span>.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            ISRIB A15 releases that brake.
          </p>
        </div>
      </div>
    </section>
  );
}
