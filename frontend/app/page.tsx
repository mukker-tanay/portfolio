
import TransitionLink from "@/components/TransitionLink";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[calc(100vh-150px)] px-6 md:px-20 max-w-5xl mx-auto">
       <div className="space-y-8 relative z-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Product Engineer converting <br />
          <span className="text-neutral-500">ambiguity</span> into <br />
          <span className="bg-linear-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">
            shippable systems.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl font-light">
          Specializing in 0→1 builds and scalable architecture for early-stage startups.
        </p>

        <div className="flex items-center gap-6 pt-4">
            <TransitionLink 
              href="/work" 
              className="group px-8 py-4 bg-neutral-100 text-neutral-900 rounded-full font-medium hover:bg-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Selected Work
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </TransitionLink>
        </div>
      </div>

      {/* Philosophy Card - Floating Glass Element styled like the reference */}
      <div className="hidden md:block absolute right-10 bottom-20 z-10 w-80 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl animate-in fade-in slide-in-from-right-10 duration-1000 delay-500">
        <h3 className="text-lg font-semibold mb-3 text-white">Philosophy</h3>
        <ul className="space-y-3 text-sm text-neutral-400">
            <li className="flex gap-2">
                <span className="text-neutral-600">•</span>
                <span>Code is a liability; clear systems are the asset.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-neutral-600">•</span>
                <span>Optimize for changeability, not just performance.</span>
            </li>
            <li className="flex gap-2">
                <span className="text-neutral-600">•</span>
                <span>User delight is a function of latency and utility.</span>
            </li>
        </ul>
      </div>
    </div>
  );
}
