import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/page-hero";
import { images } from "@/lib/adventure-data";

export default function BookingPage() {
  return (
    <>
      <PageHero image={images.rafting} eyebrow="No obligation inquiry" title="Plan your adventure">
        <p>Share the essentials. We’ll shape the details around your pace, group and sense of adventure.</p>
      </PageHero>

      <section className="section-pad bg-background">
        <div className="page-shell grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <aside className="rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-sm">
            <span className="block text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">What happens next</span>
            <ol className="mt-6 grid gap-6">
              {[
                ["01", "Tell us your idea"],
                ["02", "We check conditions and availability"],
                ["03", "You receive a tailored plan"],
              ].map(([n, t]) => (
                <li key={n} className="flex gap-4 border-t border-border pt-4">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{n}</span>
                  <strong className="font-display text-foreground">{t}</strong>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
              No payment is taken on this page. Direct confirmation will be sent by our Kitulgala base camp team.
            </p>
          </aside>

          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-10">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">Your trip, your way.</h2>
            <p className="mb-8 mt-2 text-muted-foreground text-sm">
              Please complete the required details below to send an inquiry directly to our guides.
            </p>
            <BookingForm />
          </div>
        </div>
      </section>
    </>
  );
}
