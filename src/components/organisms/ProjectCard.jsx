import { cn } from "../../utils/cn";
import { useTheme } from "../../context/ThemeContext";
import { useLocale } from "../../context/LocaleContext";
import { CardBody, CardContainer, CardItem } from "../atoms/effects/ThreeDCard";
import { Tag } from "../atoms/Tag";

export function ProjectCard({ project, onClick, className }) {
  const { theme } = useTheme();
  const { t } = useLocale();
  const { title, description, images, tags } = project;

  return (
    <CardContainer className="inter-var w-full">
      <CardBody
        className={cn(
          "bg-neutral-950/80 relative group/card w-full h-auto rounded-xl p-8 border transition-all cursor-pointer backdrop-blur-md",
          className
        )}
        style={{ borderColor: `${theme.accent}22` }}
        onClick={onClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 20px 40px -10px ${theme.accent}44`;
          e.currentTarget.style.borderColor = `${theme.accent}66`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0px ${theme.accent}00`;
          e.currentTarget.style.borderColor = `${theme.accent}22`;
        }}
      >
        <CardItem
          translateZ="50"
          className="text-2xl font-bold transition-colors duration-300"
          style={{ color: "white" }}
        >
          {t(title)}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-400 text-base max-w-md mt-3 line-clamp-2"
        >
          {t(description)}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div
            className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border transition-colors duration-500"
            style={{ borderColor: `${theme.accent}11` }}
          >
            <img
              src={images[0]}
              height="1000"
              width="1000"
              className="h-full w-full object-cover rounded-xl transition-all duration-700 group-hover/card:scale-105 group-hover/card:opacity-90"
              alt={t(title)}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/1a1a1a/ffffff?text=" +
                  encodeURIComponent(t(title));
              }}
            />
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem translateZ={20} className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} size="md">
                {tag}
              </Tag>
            ))}
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme.accent,
              color: "black",
              boxShadow: `0 0 15px ${theme.accent}66`,
            }}
          >
            View Case
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
