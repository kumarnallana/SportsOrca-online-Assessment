"use client";

import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Printer, Briefcase, GraduationCap, Award, Code, CheckCircle2 } from 'lucide-react';

export default function ResumePage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 md:px-8 max-w-4xl">
      {/* Top Navigation & Action Bar */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/5 bg-slate-800/80 px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 transition-colors hover:border-white/10 hover:bg-slate-700 hover:text-white focus-ring"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs sm:text-sm font-medium text-white transition-all hover:bg-blue-500 active:scale-95 focus-ring cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Main Resume Paper Container */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 sm:p-12 shadow-2xl backdrop-blur-xl print:border-none print:bg-white print:p-0 print:text-black print:shadow-none">
        {/* Header Section */}
        <div className="border-b border-white/10 pb-8 print:border-black/20">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white print:text-black">
            NALLANA SASI KUMAR
          </h1>
          <p className="mt-2 text-lg font-medium text-blue-400 print:text-blue-700">
            Full-Stack Developer
          </p>

          {/* Contact & Social Links */}
          <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-300 print:text-slate-700">
            <a 
              href="mailto:sasikumarnallana956@gmail.com" 
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-slate-400 print:text-black" />
              <span>sasikumarnallana956@gmail.com</span>
            </a>

            <a 
              href="tel:+919553886216" 
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-slate-400 print:text-black" />
              <span>+91 9553886216</span>
            </a>

            <a 
              href="https://github.com/kumarnallana" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <svg className="h-3.5 w-3.5 fill-current text-slate-400 print:text-black" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>github.com/kumarnallana</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/sasi-kumar-nallana" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <svg className="h-3.5 w-3.5 fill-current text-slate-400 print:text-black" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>linkedin.com/in/sasi-kumar-nallana</span>
            </a>
          </div>
        </div>

        {/* Professional Summary */}
        <section className="py-6 border-b border-white/10 print:border-black/20">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-3 flex items-center gap-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-200 print:text-slate-800">
            Full-Stack Developer passionate about building scalable, intuitive, and user-focused web applications. Experienced in delivering production-ready solutions while collaborating in agile environments and mentoring 60+ aspiring developers through a corporate CSR initiative. Currently pursuing a B.Tech in Artificial Intelligence and Data Science and eager to contribute technical expertise, problem-solving abilities, and a continuous learning mindset to a Full-Stack Engineering role.
          </p>
        </section>

        {/* Skills */}
        <section className="py-6 border-b border-white/10 print:border-black/20">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-4 flex items-center gap-2">
            <Code className="h-4 w-4 text-blue-400 print:text-black" />
            Skills & Competencies
          </h2>
          
          <div className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 print:border-none print:p-0">
              <span className="font-semibold text-slate-200 print:text-black">Languages:</span>
              <p className="mt-1 text-slate-300 print:text-slate-700">JavaScript (ES6+), HTML5, CSS3, Python, SQL</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 print:border-none print:p-0">
              <span className="font-semibold text-slate-200 print:text-black">Frameworks & Libraries:</span>
              <p className="mt-1 text-slate-300 print:text-slate-700">React.js, Next.js, Node.js, Express.js, Tailwind CSS, Bootstrap, Redux</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 print:border-none print:p-0">
              <span className="font-semibold text-slate-200 print:text-black">Core Competencies:</span>
              <p className="mt-1 text-slate-300 print:text-slate-700">Component-Based Architecture, REST API Integration, Next.js Server Actions, Responsive UI Design, State Management, Domain-Driven Design (DDD), Agile / Scrum</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-3.5 print:border-none print:p-0">
              <span className="font-semibold text-slate-200 print:text-black">Testing, Tools & CI/CD:</span>
              <p className="mt-1 text-slate-300 print:text-slate-700">Playwright, Jest, GitHub Actions, Git, VS Code, Postman</p>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section className="py-6 border-b border-white/10 print:border-black/20">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-5 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-400 print:text-black" />
            Work Experience
          </h2>

          <div className="space-y-6">
            {/* Experience 1 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-base font-semibold text-white print:text-black">Web Developer Intern</h3>
                  <p className="text-xs sm:text-sm text-blue-400 print:text-blue-700">Zylxy Technology Pvt. Ltd. (zylxytech.com)</p>
                </div>
                <span className="text-xs font-mono text-slate-400 print:text-slate-600">May 2026 – Jul 2026 | Kakinada, AP</span>
              </div>

              <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-slate-300 print:text-slate-700 list-disc list-inside leading-relaxed">
                <li>Led frontend development for the company's corporate website and CRM consulting micro-site with Next.js and React.</li>
                <li>Developed reusable UI components in Tailwind CSS and centralized styling data, reducing duplication.</li>
                <li>Built secure lead-generation and consultation forms using React Hooks, Next.js Server Actions, and REST API integrations.</li>
                <li>Refactored monolithic form architecture into modular, Domain-Driven Design (DDD)-inspired components.</li>
                <li>Contributed to the CoroVidya CSR Initiative by mentoring 60+ aspiring developers through code reviews and technical sessions.</li>
              </ul>
              <p className="mt-2 text-xs font-mono text-slate-400 print:text-slate-600">
                <strong className="text-slate-300 print:text-black">Tech Stack:</strong> Next.js, React.js, Tailwind CSS, JavaScript (ES6+), Lucide React, Git, GitHub
              </p>
            </div>

            {/* Experience 2 */}
            <div className="pt-4 border-t border-white/5 print:border-black/10">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <div>
                  <h3 className="text-base font-semibold text-white print:text-black">Industrial Trainee, Web Development</h3>
                  <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700">iSAN Computers Education</p>
                </div>
                <span className="text-xs font-mono text-slate-400 print:text-slate-600">Nov 2022 – May 2023</span>
              </div>

              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-slate-300 print:text-slate-700 list-disc list-inside leading-relaxed">
                <li>Completed a 6-month industrial training program covering foundational web development principles.</li>
                <li>Built responsive static and dynamic web interfaces from scratch using semantic HTML5, CSS3, and JavaScript.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Project Work */}
        <section className="py-6 border-b border-white/10 print:border-black/20">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-blue-400 print:text-black" />
            Featured Projects
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-white print:text-black">The Subreddit Vibe Check – Real-Time Sentiment SaaS</h3>
                <span className="text-xs font-mono text-slate-400">2026</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
                Production-ready Reddit analytics dashboard fetching hot posts via OAuth2 API, executing client-side AFINN sentiment analysis, and visualizing mood distributions with custom D3.js Linear Vibe Meters.
              </p>
              <p className="mt-1 text-xs font-mono text-slate-400">
                <strong className="text-slate-300 print:text-black">Tech Stack:</strong> Next.js App Router, React, D3.js, Framer Motion, Tailwind CSS, Playwright
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 print:border-black/10">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-white print:text-black">LearnersGuru – Online Learning Platform</h3>
                <span className="text-xs font-mono text-slate-400">2023</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
                Designed core layouts and dynamic UI components enabling seamless course navigation with secure login authentication.
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 print:border-black/10">
              <div className="flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-white print:text-black">Student-Faculty Login Portal</h3>
                <span className="text-xs font-mono text-slate-400">2024</span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 print:text-slate-700 leading-relaxed">
                Developed a role-based authentication portal with real-time form validation and serverless localStorage session persistence.
              </p>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        <section className="pt-6 grid gap-6 sm:grid-cols-2">
          {/* Education */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-3 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-blue-400 print:text-black" />
              Education
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div>
                <p className="font-semibold text-white print:text-black">B.Tech in Artificial Intelligence & Data Science</p>
                <p className="text-slate-300 print:text-slate-700">Kakinada Institute of Engineering & Technology (KIET)</p>
                <p className="font-mono text-xs text-blue-400 print:text-blue-700">2025 – 2028 | CGPA: 7.2 / 10</p>
              </div>
              <div className="pt-2 border-t border-white/5 print:border-black/10">
                <p className="font-semibold text-white print:text-black">Diploma in Computer Engineering</p>
                <p className="text-slate-300 print:text-slate-700">Kakinada Institute of Engineering & Technology (KIET)</p>
                <p className="font-mono text-xs text-slate-400">2020 – 2023 | Score: 70%</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-3 flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-400 print:text-black" />
              Certifications
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 print:text-slate-700 list-disc list-inside">
              <li><strong className="text-slate-200 print:text-black">JavaScript, ReactJS, Next.js, Python</strong> – GeeksforGeeks</li>
              <li><strong className="text-slate-200 print:text-black">JavaScript, Responsive Web Design</strong> – freeCodeCamp (verified)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
