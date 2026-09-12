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
    <section className="relative flex min-h-[58vh] items-end overflow-hidden bg-forest pt-28 text-hero-foreground">
      <img
        src={image}
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="hero-scrim absolute inset-0" />
      <div className="page-shell relative z-10 pb-16 pt-24 md:pb-20">
        <p className="eyebrow text-amber-500 font-bold">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl text-slate-100">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-2xl text-base leading-7 text-hero-muted sm:text-lg">{children}</div>}
      </div>
    </section>
  );
}
