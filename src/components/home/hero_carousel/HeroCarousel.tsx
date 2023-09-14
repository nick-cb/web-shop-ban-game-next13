"use client";
import { useBreakpoints } from "@/hooks/useBreakpoint";
import "./hero-carousel.css";
import Image from "next/image";

const breakpoints = [768] as const;
import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const HeroCarousel = ({
  data,
  className = "",
}: {
  data: any[];
  className?: string;
}) => {
  const { b768: md } = useBreakpoints(breakpoints);
  const [index, setIndex] = useState(-1);
  let prev = useRef(0);
  const mainListRef = useRef<HTMLUListElement>(null);
  const previewListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (md < 0) {
      return;
    }
    const mainList = mainListRef.current;
    const previewList = previewListRef.current;
    if (!mainList || !previewList) {
      return;
    }
    mainList.offsetParent?.classList.remove("overflow-scroll");
    mainList.offsetParent?.classList.add("overflow-hidden");
    mainList.classList.add("stack-fade-carousel");
    for (const item of previewList.children) {
      item.classList.add("pointer-none");
    }
  }, []);

  useEffect(() => {
    if (md < 0) {
      return;
    }
    const mainList = mainListRef.current;
    const previewList = previewListRef.current;
    if (!mainList || !previewList) {
      return;
    }
    if (index !== -1) {
      mainList?.children.item(prev.current)?.classList.add("not-active");
      mainList?.children.item(prev.current)?.classList.remove("active");
      mainList?.children.item(index)?.classList.add("active");
      mainList?.children.item(index)?.classList.remove("not-active");
    }

    previewList.children.item(prev.current)?.classList.remove("active");
    previewList.children
      .item(index === -1 ? 0 : index)
      ?.classList.add("active");
    prev.current = index === -1 ? 0 : index;

    const id = setTimeout(() => {
      requestAnimationFrame(() => {
        setIndex((prev) => (index === -1 ? 1 : (prev + 1) % data.length));
      });
    }, 10000);
    return () => {
      clearTimeout(id);
    };
  }, [index]);

  const onClick = (index: number) => {
    setIndex(index);
  };

  if (md < 0) {
    return null;
  }
  return (
    <div className={"md:flex gap-4 lg:gap-8 " + className}>
      <div className="w-full md:w-[75%] lg:w-4/5 aspect-[1.6] lg:aspect-video overflow-scroll rounded-lg relative scrollbar-hidden snap-x snap-mandatory">
        <ul className="main-list h-full" ref={mainListRef}>
          {data.map((item: any) => (
            <li key={item._id} className={"main-item snap-start"}>
              {item.images?.landscape.url && (
                <Image
                  className="rounded-lg"
                  src={decodeURIComponent(item.images?.landscape.url)}
                  alt=""
                  fill
                />
              )}
              <Cover>
                <ButtonGroup game={item} />
                <Description game={item} />
              </Cover>
            </li>
          ))}
        </ul>
      </div>
      <ul ref={previewListRef} className="md:flex flex-col gap-2 flex-1 hidden">
        {data.map((item: any, itemIndex: any) => (
          <li
            key={item._id}
            className="hero-carousel-preview-item w-full h-full relative rounded-xl overflow-hidden
            after:absolute after:inset-0 hover:bg-paper_2 after:bg-paper"
            onClick={() => {
              if (itemIndex === prev.current) {
                return;
              }
              onClick(itemIndex);
            }}
            title={item.name}
          >
            <a
              className="flex items-center gap-4 h-full w-full focus:bg-paper_2 p-2 lg:p-3"
              href="#"
            >
              <div className="relative h-full shrink-0 aspect-[0.75] rounded-lg overflow-hidden z-[1]">
                {item.images?.portrait.url && (
                  <Image
                    alt=""
                    className="absolute"
                    src={decodeURIComponent(item.images?.portrait.url)}
                    fill
                  />
                )}
              </div>
              <p className="text-sm text-white_primary z-[1] line-clamp-2">
                {item.name}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ButtonGroup = ({ game }: { game: any }) => {
  return (
    <div className="flex gap-4">
      <a
        href={`${game._id}`}
        className="bg-white text-default lg:w-40 w-36 py-3 lg:py-4 rounded text-sm text-center"
      >
        BUY NOW
      </a>
      <a
        href="#"
        className="relative overflow-hidden text-white lg:w-40 w-36 py-3 lg:py-4 rounded text-sm z-10
          hover:bg-white/[0.16] transition-colors duration-200 
          text-center"
      >
        ADD TO WISHLIST
      </a>
    </div>
  );
};

const Description = ({ game }: { game: any }) => {
  return (
    <div className="max-w-sm flex flex-col justify-evenly flex-grow">
      <div
        className="w-36 lg:w-80 aspect-video relative logo"
        style={{
          backgroundImage: game.images?.logo?.url
            ? `url(${decodeURIComponent(game.images?.logo.url)})`
            : "",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom left",
        }}
      >
        {/* <Image src={} alt="" fill className="object-contain" /> */}
      </div>
      <p className="text-white_primary lg:text-lg hidden sm:block">
        {game.description?.split(".")[0]}
      </p>
    </div>
  );
};

export const Cover = ({ children }: PropsWithChildren) => {
  return (
    <div className="main-item-cover absolute inset-0 flex flex-col-reverse p-8 justify-between gap-4 lg:gap-8">
      {children}
    </div>
  );
};

export default HeroCarousel;
