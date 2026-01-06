export default function AboutPage() {
    return (
      <div className="w-full max-w-3xl mx-auto px-6 pb-20">
        <header className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">System Thinker & Builder</h1>
        </header>
  
        <div className="space-y-12 text-lg text-neutral-300 leading-relaxed font-light">
          <section>
            <p className="mb-6">
              I’m Tanay Mukker, a Product Engineer and Electronics & Computer Engineering student at Thapar Institute. I bridge the gap between chaotic ambiguous requirements and reliable, scalable software.
            </p>
            <p>
              I specialize in 0→1 builds, having architected SaaS platforms and full-stack solutions. My work focuses on combining effective data processing (NLP, SQL optimization) with intuitive user experiences.
            </p>
          </section>
  
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Philosophy</h3>
            <ul className="list-disc list-outside ml-5 space-y-2 text-neutral-400">
                <li><strong className="text-neutral-200">Outcome over Code:</strong> The goal is to solve the problem (e.g., 90%+ API accuracy), not just write functions.</li>
                <li><strong className="text-neutral-200">User-Centric Architecture:</strong> Systems are built for people—optimizing search times by 30% or reducing allocation friction.</li>
                <li><strong className="text-neutral-200">Continuous Evolution:</strong> From analyzing market trends to implementing cutting-edge NLP, I stay ahead of the curve.</li>
            </ul>
          </section>
  
          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
            <div className="space-y-8">
                <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-white">Entrepreneur in Residence Intern</h4>
                        <span className="text-sm font-mono text-neutral-500">June 2025 — Sept 2025</span>
                    </div>
                    <div className="text-neutral-500">Worldspace Consulting</div>
                    <p className="text-sm mt-2 text-neutral-400">Built a full-stack CV parsing SaaS. Designed a hybrid NLP engine (SpaCy + Regex + Gemini) achieving 90%+ accuracy. Implemented Boolean search and bulk upload features.</p>
                </div>
                
                <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-white">Summer Intern</h4>
                        <span className="text-sm font-mono text-neutral-500">June 2024 — July 2024</span>
                    </div>
                    <div className="text-neutral-500">Xebia IT Architects</div>
                    <p className="text-sm mt-2 text-neutral-400">Conducted market & competitor research across 5+ job portals. Analyzed branding strategies and pitched USP to 100+ candidates.</p>
                </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
             <div className="space-y-4">
                <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-white">Thapar Institute of Engineering & Technology</h4>
                        <span className="text-sm font-mono text-neutral-500">2022 — Present</span>
                    </div>
                    <div className="text-neutral-500">B.E. in Electronics & Computer Engineering</div>
                </div>
                 <div>
                    <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-medium text-white">Amity International School</h4>
                        <span className="text-sm font-mono text-neutral-500">2020 — 2022</span>
                    </div>
                    <div className="text-neutral-500">CBSE (89.6%)</div>
                </div>
             </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
                {['Python', 'TypeScipt', 'C++', 'SQL', 'FastAPI', 'Django', 'Next.js', 'React', 'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Git'].map(skill => (
                     <span key={skill} className="px-3 py-1 bg-neutral-900 border border-white/10 rounded-full text-sm text-neutral-300">
                        {skill}
                     </span>
                ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  