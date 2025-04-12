import "react-phone-input-2/lib/style.css";

import { AboutContent } from "./components/about/AboutContent";
import { ArticlesContent } from "./components/articles/ArticlesContent";
import { ComeToMeWithContent } from "./components/come-to-me-with/ComeToMeWithContent";
import { EducationContent } from "./components/education/EducationContent";
import { FeedbackContent } from "./components/feedback/FeedbackContent";
import { MainContent } from "./components/main/MainContent";
import { MediaContent } from "./components/media/MediaContent";
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
      <ArticlesContent />
      <MediaContent />
    </main>
  );
}
