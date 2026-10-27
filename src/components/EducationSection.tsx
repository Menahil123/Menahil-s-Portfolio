import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { EDUCATION_DATA, SCHOLARSHIPS } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section className="p-4 sm:p-8 space-y-6">
      {/* Section Header */}
      <div className="border-b border-white/10 pb-4">
        <div className="text-xs font-mono text-slate-400">CREDENTIALS: /ACADEMIC/RECORDS</div>
        <h2 className="text-xl sm:text-3xl font-bold font-mono text-phosphor mt-1">
          EDUCATIONAL BACKGROUND & SCHOLARSHIPS
        </h2>
        <p className="text-xs sm:text-sm font-mono text-slate-300 mt-1">
          Formal academic training in Information Technology, systems networking, and merit-based distinction.
        </p>
      </div>

      <div className="space-y-6">
        {/* Degrees */}
        <div className="space-y-4">
          {EDUCATION_DATA.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 bg-black/50 border border-white/10 rounded-lg space-y-3 font-mono text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-phosphor" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-100">
                    {edu.degree}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-phosphor" />
                  <span className="text-phosphor font-bold">{edu.period}</span>
                </div>
              </div>

              <div className="text-slate-300 font-bold text-xs">
                {edu.institution}
              </div>

              <ul className="space-y-1.5 text-slate-400 pt-1">
                {edu.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-phosphor">›</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Scholarships */}
        <div className="border border-amber-900/40 bg-amber-950/15 rounded-lg p-4 sm:p-5 space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm border-b border-amber-900/30 pb-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>HONORS & FINANCIAL MERIT AWARDS</span>
          </div>

          {SCHOLARSHIPS.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-slate-200 font-bold">{s.title}</span>
                <span className="text-amber-400 text-[11px] font-bold">MERIT DISTINCTION</span>
              </div>
              <div className="text-[11px] text-amber-300/80">Granted by {s.organization}</div>
              <p className="text-slate-400 text-xs pt-1 leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
