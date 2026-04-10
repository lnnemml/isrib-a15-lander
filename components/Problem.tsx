export default function Problem() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-center">
          The Hidden Brake Blocking Your Cognition
        </h2>
        
        <p className="section-subheading text-center">
          You've tried nootropics. Maybe even prescription meds. Some gave you a buzz, most did nothing.
        </p>
        
        <div className="bg-secondary/50 border-l-4 border-accent p-8 rounded-r-lg mb-12">
          <p className="text-lg leading-relaxed mb-6">
            When your body senses stress — from overwork, poor sleep, inflammation, or aging — your neurons activate something called the <span className="text-accent font-semibold">Integrated Stress Response (ISR)</span>.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            It's a molecular emergency brake that stops your brain from "overheating."
          </p>
          <p className="text-lg leading-relaxed">
            For a few hours, that's protective. But in modern life, <span className="font-semibold">the ISR never turns off</span>.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-primary p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-accent">When ISR is Active:</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-accent mr-2">✗</span>
                <span>Protein synthesis halts in neurons</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✗</span>
                <span>Memory formation blocked</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✗</span>
                <span>Mental clarity deteriorates</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✗</span>
                <span>Motivation disappears</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-primary p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-accent">The Result:</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">→</span>
                <span>You reread the same paragraph three times</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">→</span>
                <span>Information slides off your brain</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">→</span>
                <span>Tasks feel like pushing through molasses</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">→</span>
                <span>You wonder if you've lost your edge permanently</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center bg-accent/10 border border-accent/30 p-8 rounded-lg">
          <p className="text-xl font-semibold mb-2">Here's the truth:</p>
          <p className="text-2xl text-accent font-bold">
            Your brain isn't broken. It's in protection mode.
          </p>
          <p className="text-gray-300 mt-4">
            And every stimulant or supplement you've tried is just pushing harder on the gas<br />while the emergency brake is still engaged.
          </p>
        </div>
      </div>
    </section>
  );
}
