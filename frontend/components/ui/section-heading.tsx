import React from "react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Reusable Section Heading component for page sections
 */
export function SectionHeading({ eyebrow, title, description, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
