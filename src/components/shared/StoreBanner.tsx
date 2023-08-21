"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

const callouts = [
  { imageSrc: "/assets/banner.png", imageAlt: "my first banner" },
];

export const images = [
  "https://shella-demo.myshopify.com/cdn/shop/files/01_bc244f31-49b0-42ad-b7dc-8e21f9bf57a9_1920x.progressive.png.jpg?v=1613707531",
  "https://www.aloyoga.com/cdn/shop/files/08.17.23_VacationPulse_HPDesktop_copy_1512x.progressive.jpg?v=1692230007",
  "https://www.aloyoga.com/cdn/shop/files/08.19.23_TennisStory_HP_Desktop_copy_1_1512x.progressive.jpg?v=1692396123",
];

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function StoreBanner() {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="group relative  h-[300px] w-full overflow-hidden lg:h-[600px] ">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          className=" absolute h-full w-full  object-cover"
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <div
        className="next hidden h-[70px] w-[70px] bg-gray-100 text-black  dark:bg-zinc-800 dark:text-white "
        onClick={() => paginate(1)}
      >
        {"‣"}
      </div>
      <div
        className="prev hidden h-[70px] w-[70px] bg-gray-100 text-black  dark:bg-zinc-800 dark:text-white "
        onClick={() => paginate(-1)}
      >
        {"‣"}
      </div>
    </div>
  );
}

export default StoreBanner;
