import { AlertCircle, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import { PageShell } from "../components/SiteChrome";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <PageShell>
      <section className="container flex min-h-[70vh] items-center justify-center py-20">
        <div className="content-card w-full max-w-xl px-8 py-12 text-center sm:px-12">
          <span className="icon-disc mx-auto h-16 w-16 bg-[#F28D63] text-[#2B2F32]">
            <AlertCircle size={30} />
          </span>
          <p className="section-kicker mt-7 text-[#7a6316]">Page not found</p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-.04em]">404</h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-muted-copy">
            Sorry, the page you’re looking for doesn’t exist or may have moved.
          </p>
          <button
            className="btn-primary mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-bold"
            onClick={() => setLocation("/")}
          >
            Back to home <ArrowRight className="ml-2" size={16} />
          </button>
        </div>
      </section>
    </PageShell>
  );
}
