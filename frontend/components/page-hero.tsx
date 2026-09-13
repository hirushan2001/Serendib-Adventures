import type { ReactNode } from "react";

export function PageHero({
  image,
  eyebrow,
  title,
  children
}: {
  image: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[48vh] flex-col justify-end overflow-hidden bg-slate-900 pt-32 pb-14 text-white w-full">
      <img
        src={image}
        alt={title}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/40" />
      <div className="page-shell relative z-10 max-w-3xl">
        <span className="block text-xs sm:text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-2 drop-shadow">
          {eyebrow}
        </span>
        <h1 className="font-display text-3xl font-extrabold sm:text-5xl lg:text-6xl text-white tracking-tight drop-shadow-md">
          {title}
        </h1>
        {children && (
          <div className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-slate-200 font-medium drop-shadow">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

