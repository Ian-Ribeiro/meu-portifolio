import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <HeroSection />
      <ProjectsSection />
      <NewsletterSection />
    </div>
  );
}
