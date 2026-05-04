import { EXPERIENCE } from "../../data/experience";
import { STRINGS } from "../../data/strings";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { SectionHeading } from "../molecules/SectionHeading";
import { TimelineEntry } from "../molecules/TimelineEntry";
import { TracingBeam } from "../atoms/effects/TracingBeam";

export function ExperienceTimeline() {
  const { theme } = useTheme();
  const { locale } = useLocale();
  const { title, subtitle, description } = STRINGS[locale].sections.experience;

  return (
    <section id="experience" className="py-32 px-4 relative pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <TracingBeam className="px-6" color={theme.accent}>
          <div className="max-w-2xl mx-auto antialiased pt-4 relative pl-4 md:pl-0">
            {EXPERIENCE.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                index={index}
                isLatest={index === 0}
              />
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
