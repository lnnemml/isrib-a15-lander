export default function Discovery() {
  return (
    <section className="py-24 px-4 bg-secondary">
      <div className="max-w-4xl mx-auto">

        <p className="text-xs text-accent uppercase tracking-widest font-bold text-center mb-4">The Science</p>
        <h2 className="section-heading text-center">
          The Discovery That Changed Everything
        </h2>
        <p className="section-subheading text-center">
          In 2013, a UCSF lab made a breakthrough that aging researchers are still
          paying close attention to.
        </p>

        {/* Story — narrative */}
        <div className="space-y-6 mb-16">
          <div className="card border-l-2 border-accent/40 rounded-none rounded-r-lg">
            <p className="text-xs text-accent uppercase tracking-wider font-bold mb-3">The Cellular Brake</p>
            <p className="text-text-secondary leading-relaxed mb-3">
              Dr. Peter Walter's lab at UCSF was studying how cells manage stress — the molecular
              housekeeping that keeps neurons alive under pressure. His postdoc Carmela Sidrauski
              screened thousands of compounds to find anything that could calm the cellular alarm system.
            </p>
            <p className="text-text-secondary leading-relaxed">
              One compound worked. They called it ISRIB — Integrated Stress Response Inhibitor.
              It bound to <span className="text-text-primary font-semibold">eIF2B</span>, the master
              regulator of protein synthesis, and locked it in the "active" position —
              allowing neurons to continue building memory proteins even under stress.
            </p>
          </div>

          <div className="card border-l-2 border-accent/40 rounded-none rounded-r-lg">
            <p className="text-xs text-accent uppercase tracking-wider font-bold mb-3">What Happened in the Lab</p>
            <div className="space-y-4">
              {[
                { year: '2013', label: 'Healthy mice', result: 'Navigated mazes in 16 seconds vs 60+ seconds for controls. First demonstration of the compound\'s effect on cognitive performance.' },
                { year: '2017', label: 'Brain-injured mice', result: 'Normal cognitive function restored — even in animals treated 4 months after severe TBI. Synaptic connections physically regrew.' },
                { year: '2020', label: 'Aged mice (65+ human equivalent)', result: 'Performed like young mice after a few doses. Improvements lasted weeks after dosing stopped. The eLife paper described the aged brain as "not lost — just trapped."' },
              ].map((item) => (
                <div key={item.year} className="flex gap-4 items-start">
                  <span className="text-accent font-black text-lg flex-shrink-0 w-12">{item.year}</span>
                  <div>
                    <p className="text-text-primary text-sm font-semibold mb-1">{item.label}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2020 eLife callout */}
        <div className="card-accent mb-16">
          <p className="text-xs text-accent uppercase tracking-wider font-bold mb-4">The 2020 eLife Study</p>
          <p className="text-text-secondary leading-relaxed">
            In the landmark 2020 eLife study, aged mice given ISRIB regained the cognitive performance
            of young mice — spatial memory, learning speed, and retention — after just a few doses.
            The researchers described it as releasing a "brake" that had accumulated over years of
            cellular stress. The improvements persisted long after dosing stopped.
          </p>
        </div>

        {/* Peter Walter quote */}
        <div className="text-center p-10 bg-tertiary rounded-lg border border-accent/10 mb-16">
          <p className="text-2xl italic text-text-primary font-light leading-relaxed mb-4">
            "We have never seen any relevant side effects. None.<br />It is totally benign."
          </p>
          <p className="text-accent text-sm font-bold tracking-wide uppercase">
            Dr. Peter Walter · UCSF · Co-inventor of ISRIB
          </p>
          <p className="text-text-secondary text-xs mt-2">
            Currently in human clinical trials at Calico (Google/Alphabet) for ALS cognitive function
          </p>
        </div>

        {/* A15 differentiation */}
        <div className="card-accent">
          <p className="text-xs text-accent uppercase tracking-widest font-bold mb-4">Why A15 Specifically</p>
          <p className="text-text-secondary leading-relaxed mb-4">
            Original ISRIB has poor oral bioavailability — it requires solvents like DMSO and PEG300
            for dosing, which creates practical and safety complications.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            A15 is a structural analog with modified pharmacokinetics: improved absorption, better
            stability, and full oral bioavailability. No solvents. No injections.
            <span className="text-text-primary font-semibold"> Same mechanism. Better delivery.</span>
          </p>
          <p className="text-text-secondary leading-relaxed">
            Effective dose range: <span className="text-accent font-semibold">5–15mg orally</span>.
            Compare this to other vendors selling 50mg research vials for injection protocols.
          </p>
        </div>

      </div>
    </section>
  );
}
