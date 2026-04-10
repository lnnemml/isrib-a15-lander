export default function WhoIsThisFor() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-primary to-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-heading text-center mb-4">
          This Is For You If...
        </h2>
        
        <p className="text-xl text-gray-300 text-center mb-12">
          Recognize any of these cognitive warning signs?
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Symptom 1 */}
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent hover:bg-secondary transition-all">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">🌫️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-accent">Brain Fog That Won't Clear</h3>
                <p className="text-gray-300">
                  You wake up with mental fog that persists throughout the day. Coffee doesn't help. Rest doesn't help. Your thinking feels sluggish and unclear.
                </p>
              </div>
            </div>
          </div>
          
          {/* Symptom 2 */}
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent hover:bg-secondary transition-all">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">⏸️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-accent">Massive Mental Resistance</h3>
                <p className="text-gray-300">
                  Starting tasks feels like pushing through mud. You know what needs to be done, but your brain won't engage. Procrastination becomes your default state.
                </p>
              </div>
            </div>
          </div>
          
          {/* Symptom 3 */}
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent hover:bg-secondary transition-all">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-accent">Post-Stress Mental Crash</h3>
                <p className="text-gray-300">
                  After deadlines, intense work, or emotional stress, your brain "crashes." What used to take an hour now takes a full day. Your mind feels fried.
                </p>
              </div>
            </div>
          </div>
          
          {/* Symptom 4 */}
          <div className="bg-secondary/50 p-6 rounded-lg border-l-4 border-accent hover:bg-secondary transition-all">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">🧠</span>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-accent">Memory & Focus Deterioration</h3>
                <p className="text-gray-300">
                  Your memory isn't what it used to be. You read the same paragraph three times. Focus lasts 5-15 minutes max before your mind wanders or shuts down.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* The Realization */}
        <div className="bg-accent/10 border-2 border-accent/30 p-8 rounded-lg text-center">
          <p className="text-xl font-semibold mb-4">If 2 or more of these describe you...</p>
          <p className="text-2xl text-accent font-bold mb-4">
            Your brain isn't lazy. It's locked.
          </p>
          <p className="text-lg text-gray-300">
            The Integrated Stress Response (ISR) is blocking your cognitive capacity — and ISRIB A15 is specifically designed to release that block.
          </p>
        </div>
      </div>
    </section>
  );
}
