import { ArrowRight } from 'lucide-react';
import { getProjects } from '@/lib/api';
import TransitionLink from '@/components/TransitionLink';

// Use Dummy Data until Backend is connected
const PROJECTS = [
    {
        id: 1,
        slug: 'worldspace-cv-saas',
        title: 'CV Parsing SaaS Platform',
        description: 'Designed and developed a full-stack automated resume screening platform. Built a hybrid NLP engine combining SpaCy, Regex, and Gemini API achieving 90%+ field extraction accuracy.',
        role: 'Entrepreneur in Residence Intern',
        tech_stack: ['FastAPI', 'Next.js', 'MongoDB', 'NLP'],
        year: '2025'
    },
    {
        id: 2,
        slug: 'proally-allocation-portal',
        title: 'ProAlly',
        description: 'Research Project Allocation Portal for 500+ students and 50+ professors. Owned full-stack workflows and implemented real-time collaboration features via Django Channels.',
        role: 'Lead Architect',
        tech_stack: ['Django', 'React', 'PostgreSQL', 'WebSockets'],
        year: 'Ongoing'
    },
    {
        id: 3,
        slug: 'smart-parking-system',
        title: 'Smart Parking Management',
        description: 'Optimized parking allocation with real-time tracking (30% faster search) and dynamic management (20% more utilization).',
        role: 'Back-End Developer',
        tech_stack: ['Python', 'SQL', 'PL/SQL', 'MySQL'],
        year: '2024'
    }
];

export default function WorkPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 pb-20">
      <header className="mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Selected Work</h1>
        <p className="text-xl text-neutral-400 max-w-2xl">
          A collection of systems designed for scale, maintainability, and business impact.
        </p>
      </header>

      <div className="space-y-32">
        {PROJECTS.map((project, index) => (
          <article key={project.id} className="group relative">
            <div className="absolute -inset-8 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
               {/* Project Info */}
               <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    <span>{project.role}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  
                  <h2 className="text-3xl font-semibold group-hover:text-white transition-colors">
                    <TransitionLink href={`/work/${project.slug}`}>
                        {project.title}
                    </TransitionLink>
                  </h2>
                  
                  <p className="text-lg text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="flex flex-wrap gap-2 pt-2">
                    {project.tech_stack.map(tech => (
                        <li key={tech} className="px-3 py-1 bg-neutral-900 border border-white/10 rounded-full text-xs text-neutral-300">
                            {tech}
                        </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <TransitionLink href={`/work/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors">
                        Read Case Study <ArrowRight className="w-4 h-4" />
                    </TransitionLink>
                  </div>
               </div>

               {/* Abstract Visual Placeholder */}
               <div className="w-full md:w-1/3 aspect-4/3 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-neutral-800/20 group-hover:bg-neutral-800/40 transition-colors" />
                    <span className="text-neutral-700 font-mono text-sm">Privileged Information</span>
               </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
