'use client';

import { trackBuyClick } from '@/lib/analytics';

export default function Experience() {
  const handleBuyClick = () => {
    trackBuyClick('1g', 200, 'experience_section');
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="section-heading text-center">
          What Actually Happens in the First Week
        </h2>
        
        <p className="section-subheading text-center">
          Real reports from biohackers, students, and professionals who tried ISRIB A15.
        </p>
        
        {/* User Testimonials with Icons */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-accent">
            💭 What Users Say
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
              <div className="flex items-start mb-4">
                <div className="bg-accent/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Software Engineer, 34</p>
                  <p className="text-xs text-gray-500">🔥 Chronic burnout, 60-hour weeks</p>
                </div>
              </div>
              <blockquote className="text-gray-300 italic mb-3">
                "I'd reread my own code three times and still not fully grasp it. By Day 5, logic clicked on the first pass. I could hold the entire architecture in my head again."
              </blockquote>
              <p className="text-accent font-semibold text-sm">Day 5: Full mental clarity restored</p>
            </div>
            
            <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
              <div className="flex items-start mb-4">
                <div className="bg-accent/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Marketing Manager, 29</p>
                  <p className="text-xs text-gray-500">🤕 Post-concussion, 8 months prior</p>
                </div>
              </div>
              <blockquote className="text-gray-300 italic mb-3">
                "Doctors said 'this is as good as it gets.' I felt 20 IQ points down. Week 2, the fog lifted like a window cracked open. I tracked conversations again — words came back."
              </blockquote>
              <p className="text-accent font-semibold text-sm">Week 2: Normal cognitive function returned</p>
            </div>
            
            <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
              <div className="flex items-start mb-4">
                <div className="bg-accent/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">VP, 52</p>
                  <p className="text-xs text-gray-500">⏰ Age-related memory decline</p>
                </div>
              </div>
              <blockquote className="text-gray-300 italic mb-3">
                "I told myself 'this is age'— demoralizing. By Week 3, recall was scary good. Names, details, context are on demand. Feels like I'm 40 again. My team noticed. My wife noticed."
              </blockquote>
              <p className="text-accent font-semibold text-sm">Week 3: Memory performance of a decade ago</p>
            </div>
            
            <div className="bg-secondary/50 p-6 rounded-lg border border-accent/20">
              <div className="flex items-start mb-4">
                <div className="bg-accent/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">PhD Student, 28</p>
                  <p className="text-xs text-gray-500">📚 Dissertation stress, brain fog</p>
                </div>
              </div>
              <blockquote className="text-gray-300 italic mb-3">
                "While reading complex papers, it became way easier to remember expressions and context after just 1-2 days. Like defragmenting a cluttered hard drive."
              </blockquote>
              <p className="text-accent font-semibold text-sm">Days 1-2: Information retention dramatically improved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-primary p-8 rounded-lg mb-12 border border-accent/20">
          <h3 className="text-2xl font-bold mb-6 text-center">The Common Pattern</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold text-lg mb-2 text-accent">Days 1-3: "Something's different"</h4>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>• Less mental resistance when starting tasks</li>
                <li>• Information sticks more easily</li>
                <li>• Background anxiety turns down</li>
                <li>• No jitters, no crash, no "drugged" feeling</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-2 text-accent">Days 4-7: "Wait, this is real"</h4>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>• Working memory noticeably stronger</li>
                <li>• Long sessions without mental fatigue</li>
                <li>• Intrinsic motivation returns (not forced)</li>
                <li>• Emotions feel steadier, fewer spirals</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-2 text-accent">Weeks 2-4: "This is my new baseline"</h4>
              <ul className="text-gray-300 space-y-1 ml-4">
                <li>• Sustained clarity that doesn't fade</li>
                <li>• Minimal tolerance build-up</li>
                <li>• Sleep quality often improves</li>
                <li>• Social fluency and verbal recall feel natural</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-accent/10 border border-accent/30 p-8 rounded-lg mb-8">
          <p className="text-xl font-semibold mb-4">What It's NOT:</p>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <span className="text-red-400 mr-2 text-xl">✗</span>
              <span className="text-gray-300">Not a stimulant. No jitters or crash</span>
            </div>
            <div className="flex items-start">
              <span className="text-red-400 mr-2 text-xl">✗</span>
              <span className="text-gray-300">Not euphoric — no buzz, just clarity</span>
            </div>
            <div className="flex items-start">
              <span className="text-red-400 mr-2 text-xl">✗</span>
              <span className="text-gray-300">Not "Limitless". You think like yourself again</span>
            </div>
            <div className="flex items-start">
              <span className="text-red-400 mr-2 text-xl">✗</span>
              <span className="text-gray-300">Not instant — restoration takes 3-7 days</span>
            </div>
          </div>
        </div>
        
        {/* CTA after testimonials */}
        <div className="text-center">
          <a 
            href="https://isrib.shop/buy-1g.html"
            onClick={handleBuyClick}
            className="btn-primary inline-block text-lg px-12 py-5"
          >
            Start Your Trial
          </a>
          <p className="text-sm text-gray-400 mt-4">
           1,000+ researchers already experiencing the difference
          </p>
        </div>
      </div>
    </section>
  );
}
