// hero component for the landing page

import { Button, Spacer, Image } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row items-center sm:justify-evenly h-screen w-full">
      <div className="mt-20 items-center sm:hidden">
        <Image src="headshot.jpeg" alt="Hero Image" width={400} height={400} />
      </div>
      <div className="text-center sm:text-left p-4">
        <h1 className="text-3xl sm:text-6xl font-bold">Nice to meet you!</h1>
        <p className="mt-2 mb-5 text-gray-500">
          Welcome to my page! My name is Albert Shih and I am an aspiring
          software engineer.
        </p>
        <Link href="/about">
          <Button color="primary">Get to know me!</Button>
        </Link>
      </div>
      <div className="hidden md:flex w-1/4">
        <Image src="headshot.jpeg" alt="Hero Image" width={400} height={400} />
      </div>
    </div>
  );
};

export default Hero;
