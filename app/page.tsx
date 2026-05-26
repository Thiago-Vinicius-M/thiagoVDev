import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { Description } from "@/sections/Description";
import { Projects } from "@/sections/Projects";
import { TechStack } from "@/sections/TechStack";
import { FooterSection } from "@/sections/FooterSection";
import { projectService } from "@/lib/services/projectService";

export default async function Home() {
  const projects = await projectService.getAll();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Description />
      <Projects projects={projects} />
      <TechStack />
      <FooterSection />
    </main>
  );
}
