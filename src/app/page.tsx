import { AboutContent } from "./components/about/AboutContent";
import { ComeToMeWithContent } from "./components/come-to-me-with/ComeToMeWithContent";
import { EducationContent } from "./components/education/EducationContent";
import { FeedbackContent } from "./components/feedback/FeedbackContent";
import { MainContent } from "./components/main/MainContent";
import { PrinciplesContent } from "./components/principles/PrinciplesContent";

export default function Home() {
  return (
    <main>
      <MainContent />
      <AboutContent />
      <PrinciplesContent />
      <ComeToMeWithContent />
      <EducationContent />
      <FeedbackContent />
    </main>
  );
}
