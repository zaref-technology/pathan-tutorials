import {
  getAnnouncements, getAchievements, getCourses, getFaculty, getHeroSettings,
  getResults, getStatistics, getTestimonials,
} from "@/lib/firebase/firestore";
import { getContentPageOrDefault, getPublicSiteSettings } from "@/lib/content";
import { DOC_IDS, IMPROVEMENT_STORY_CATEGORY } from "@/lib/types";
import Hero from "@/components/public/Hero";
import Stats from "@/components/public/Stats";
import WhyChooseUs from "@/components/public/home/WhyChooseUs";
import CoursesPreview from "@/components/public/home/CoursesPreview";
import MethodologyTeaser from "@/components/public/home/MethodologyTeaser";
import ResultsTeaser from "@/components/public/home/ResultsTeaser";
import AchievementsTeaser from "@/components/public/home/AchievementsTeaser";
import DirectorIntro from "@/components/public/home/DirectorIntro";
import TestimonialsTeaser from "@/components/public/home/TestimonialsTeaser";
import AnnouncementsTeaser from "@/components/public/home/AnnouncementsTeaser";
import PagesGrid from "@/components/public/home/PagesGrid";
import HomeCTA from "@/components/public/home/HomeCTA";

export const metadata = { alternates: { canonical: "/" } };

const HOME_ANNOUNCEMENT_COUNT = 3;

// Settled results so one failing Firestore read never blanks the whole page.
function valueOr<T>(res: PromiseSettledResult<T>, fallback: T): T {
  return res.status === "fulfilled" ? res.value : fallback;
}

export default async function HomePage() {
  const [
    settingsRes, heroRes, statsRes, coursesRes, testimonialsRes, achievementsRes,
    resultsRes, facultyRes, announcementsRes, whyRes, methodologyRes,
  ] = await Promise.allSettled([
    getPublicSiteSettings(),
    getHeroSettings(),
    getStatistics(),
    getCourses(),
    getTestimonials(),
    getAchievements(),
    getResults(),
    getFaculty(),
    getAnnouncements(),
    getContentPageOrDefault(DOC_IDS.WHY_CHOOSE_US),
    getContentPageOrDefault(DOC_IDS.METHODOLOGY),
  ]);

  const settings = valueOr(settingsRes, null);
  const faculty = valueOr(facultyRes, []);
  // Improvement stories have their own section on the results page.
  const results = valueOr(resultsRes, []).filter((r) => r.category !== IMPROVEMENT_STORY_CATEGORY);

  return (
    <>
      <Hero settings={settings} hero={valueOr(heroRes, null)} />
      <Stats stats={valueOr(statsRes, [])} />
      {whyRes.status === "fulfilled" && <WhyChooseUs settings={settings} content={whyRes.value} />}
      <CoursesPreview courses={valueOr(coursesRes, [])} />
      {methodologyRes.status === "fulfilled" && <MethodologyTeaser content={methodologyRes.value} />}
      <ResultsTeaser results={results} />
      <AchievementsTeaser achievements={valueOr(achievementsRes, [])} />
      <DirectorIntro director={faculty.find((f) => f.isDirector) ?? null} />
      <TestimonialsTeaser testimonials={valueOr(testimonialsRes, [])} />
      <AnnouncementsTeaser announcements={valueOr(announcementsRes, []).slice(0, HOME_ANNOUNCEMENT_COUNT)} />
      <PagesGrid />
      <HomeCTA settings={settings} />
    </>
  );
}
