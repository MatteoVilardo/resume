import React from "react";
import { cn } from "./utils/cn";
import { CardBody, CardContainer, CardItem } from "./ThreeDCard";

export const ProjectCard = ({ title, description, images, tags, className, onClick }) => {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className={cn(
        "bg-neutral-950/60 relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.1] border-white/[0.08] w-full h-auto rounded-xl p-6 border transition-all cursor-pointer backdrop-blur-md",
        className
      )}
      onClick={onClick}
      >
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white"
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
          <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-800">
            <img
              src={images[0]}
              height="1000"
              width="1000"
              className="h-full w-full object-cover rounded-xl group-hover/card:shadow-xl transition-transform duration-500 group-hover/card:scale-105"
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
                className="px-2 py-1 rounded-md bg-blue-500/10 text-[10px] font-medium text-blue-400 border border-blue-500/20 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
          >
            View Case
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};
