import HomeLegacyPartnersSection from "../components/HomeLegacyPartnersSection";
import StatusPanel from "../components/StatusPanel";
import PageMeta from "../components/PageMeta";

function NotFoundPage() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <PageMeta
          title="Page Not Found"
          description="The requested route does not exist in the Mecanav React app."
          noIndex={true}
        />
        <StatusPanel
          title="Page not found"
          message="The requested page could not be found."
          actionLabel="Back to Home"
          actionTo="/"
        />
      </div>
      <HomeLegacyPartnersSection />
    </section>
  );
}

export default NotFoundPage;
