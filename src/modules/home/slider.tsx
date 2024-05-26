"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton } from "./sliderbuttons";
import Autoplay from "embla-carousel-autoplay";
import "./slider.scss";
import { cn } from "@/utils";
import useInView from "@/hooks/useInView";
import Image from "next/image";

export type ClientSliderProps = {
  id?: number;
  name: string;
  description: string;
  currIdx?: number;
};

export const CLIENT_SLIDES: ClientSliderProps[] = [
  {
    id: 1,
    name: "Ajani Ben",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente, eaque nihil voluptate neque odio quam hic beatae natus voluptatum facilis ullam nobis cupiditate delectus corrupti est eveniet quos sunt! Aperiam vel perferendis ut voluptatem fugiat possimus unde soluta repellat quia necessitatibus molestias assumenda at officiis, expedita accusantium, doloribus maiores.",
  },
  {
    id: 2,
    name: "Ajani Ben",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente, eaque nihil voluptate neque odio quam hic beatae natus voluptatum facilis ullam nobis cupiditate delectus corrupti est eveniet quos sunt! Aperiam vel perferendis ut voluptatem fugiat possimus unde soluta repellat quia necessitatibus molestias assumenda at officiis, expedita accusantium, doloribus maiores.",
  },
  {
    id: 3,
    name: "Ajani Ben",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente, eaque nihil voluptate neque odio quam hic beatae natus voluptatum facilis ullam nobis cupiditate delectus corrupti est eveniet quos sunt! Aperiam vel perferendis ut voluptatem fugiat possimus unde soluta repellat quia necessitatibus molestias assumenda at officiis, expedita accusantium, doloribus maiores.",
  },
  {
    id: 4,
    name: "Ajani Ben",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente, eaque nihil voluptate neque odio quam hic beatae natus voluptatum facilis ullam nobis cupiditate delectus corrupti est eveniet quos sunt! Aperiam vel perferendis ut voluptatem fugiat possimus unde soluta repellat quia necessitatibus molestias assumenda at officiis, expedita accusantium, doloribus maiores.",
  },
  {
    id: 5,
    name: "Ajani Ben",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente, eaque nihil voluptate neque odio quam hic beatae natus voluptatum facilis ullam nobis cupiditate delectus corrupti est eveniet quos sunt! Aperiam vel perferendis ut voluptatem fugiat possimus unde soluta repellat quia necessitatibus molestias assumenda at officiis, expedita accusantium, doloribus maiores.",
  },
  {
    id: 6,
    name: "Ajani Ben",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam sapiente, eaque nihil voluptate neque odio quam hic beatae natus voluptatum facilis ullam nobis cupiditate delectus corrupti est eveniet quos sunt! Aperiam vel perferendis ut voluptatem fugiat possimus unde soluta repellat quia necessitatibus molestias assumenda at officiis, expedita accusantium, doloribus maiores.",
  },
];

const TestimonialCard = ({
  name,
  description,
  currIdx = 0,
  id,
}: ClientSliderProps) => {
  return (
    <div
      className={cn(
        " w-full md:max-w-[95%]  items-center flex-shrink-0 flex-grow-0 basis-[100%]  flex flex-col md:flex-row h-full md:h-[400px] md:px-8 py-4 md:py-8 ",
        currIdx + 1 === id ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex max-md:justify-center items-center w-full max-w-[200px] md:max-w-[300px] relative md:max-h-[250px] md:h-full">
        <Image
          src={`/feedback.png`}
          height={250}
          width={250}
          alt="client"
          className="relative z-10 "
        />
        <div className="absolute -left-4 -top-2  md:-top-5 md:-left-5 w-[200px] h-[200px] md:w-[270px] md:h-[270px] bg-[#F3DE8A] rounded-full" />
      </div>

      <div className="flex flex-col md:w-[70%] gap-y-5 lg:gap-y-10 items-center md:items-start -mt-5 lg:-mt-10 w-full">
        <div className="flex max-md:w-full max-md:justify-center max-md:my-4 max-md:mt-8">
          <Image src="/quote.svg" height={64} width={64} alt="quote" />
        </div>
        <p className="text-header text-sm md:text-base text-center md:text-start">
          {description}
        </p>
        <p className="text-black font-medium text-sm md:text-base">{name}</p>
      </div>
    </div>
  );
};

const ClientSlider = () => {
  const slideRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView({ ref: slideRef });
  const options: EmblaOptionsType = { loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div
      ref={slideRef}
      className={cn(
        "w-full flex flex-col justify-center items-center md:h-[400px] xl:h-[500px] relative p-8 embla overflow-hidden  border border-gray-300 py-4 lg:py-8  xl:py-12 pb-8",
        isInView
          ? "opacity-100 translate-y-0 delay-300 duration-1000"
          : " opacity-0 translate-y-36"
      )}
    >
      <div className="overflow-hidden w-full " ref={emblaRef}>
        <div className="embla__container flex touch-pan-y w-full ">
          {CLIENT_SLIDES.map((slide) => (
            <TestimonialCard
              currIdx={selectedIndex}
              key={slide.id}
              {...slide}
            />
          ))}
        </div>
      </div>

      <div className="embla__dots w-full justify-center items-center  flex mt-4 lg:mt-12 gap-x-4 absolute bottom-3 z-[1] left-0 right-0">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={cn("h-[16px] w-[16px] embla__dot items-center", {
              "embla__dot--selected flex": index === selectedIndex,
            })}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientSlider;
