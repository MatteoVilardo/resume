import React from "react";
import { cn } from "./utils/cn";
import { CardBody, CardContainer, CardItem } from "./ThreeDCard";

export const ProjectCard = ({ title, description, images, tags, className, onClick, theme }) => {
  const accent = theme?.accent || "#3b82f6";
  const primary = theme?.primary || "#60a5fa";

  return (
    <CardContainer className="inter-var w-full">
      <CardBody className={cn(
        "bg-neutral-950/80 relative group/card w-full h-auto rounded-xl p-6 border transition-all cursor-pointer backdrop-blur-md",
        className
      )}
      style={{
        borderColor: `${accent}22`,
        boxShadow: `0 0 0px ${accent}`, // initial state
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 40px -10px ${accent}44`;
        e.currentTarget.style.borderColor = `${accent}66`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0px ${accent}00`;
        e.currentTarget.style.borderColor = `${accent}22`;
      }}
      >
        <CardItem
          translateZ="50"
          className="text-xl font-bold transition-colors duration-300 group-hover/card:text-[var(--hover-color)]"
          style={{ "--hover-color": primary, color: "white" }}
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-400 text-sm max-w-sm mt-2 line-clamp-2"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div 
            className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-900 border transition-colors duration-500"
            style={{ borderColor: `${accent}11` }}
          >
            <img
              src={images[0]}
              height="1000"
              width="1000"
              className="h-full w-full object-cover rounded-xl transition-all duration-700 group-hover/card:scale-105 group-hover/card:opacity-90"
              alt="thumbnail"
              onError={(e) => {
                e.target.src = "https://placehold.co/600x400/1a1a1a/ffffff?text=" + encodeURIComponent(title);
              }}
            />
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            className="flex flex-wrap gap-2"
          >
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-[10px] font-medium uppercase tracking-tighter transition-colors duration-300"
                style={{ 
                  backgroundColor: `${accent}15`, 
                  color: primary,
                  borderColor: `${accent}33`,
                  borderWidth: "1px"
                }}
              >
                {tag}
              </span>
            ))}
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: accent, 
              color: "black",
              boxShadow: `0 0 15px ${accent}66`
            }}
          >
            View Case
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
