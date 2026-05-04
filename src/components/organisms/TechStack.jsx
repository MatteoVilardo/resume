import { STRINGS } from "../../data/strings";
import { TECH_GROUPS } from "../../data/tech";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { SectionHeading } from "../molecules/SectionHeading";
import { TechItem } from "../molecules/TechItem";

export function TechStack() {
  const { theme } = useTheme();
  const { locale, t } = useLocale();
  const { title, subtitle, description } = STRINGS[locale].sections.tech;

  return (
    <section id="tech" className="py-32 px-4 relative pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={title}
          subtitle={subtitle}
          description={description}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TECH_GROUPS.map((group) => (
            <div key={t(group.category)} className="flex flex-col gap-6">
              <h4
                className="text-xs font-black uppercase tracking-[0.3em] mb-2 opacity-60"
                style={{ color: theme.accent }}
              >
                {t(group.category)}
              </h4>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <TechItem key={t(item.name)} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
