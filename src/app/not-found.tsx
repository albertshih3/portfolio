"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, Spacer } from "@heroui/react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="py-8 px-10 w-full sm:w-96">
        <h1 className="text-6xl text-center font-black">Oopsies!</h1>
        <Spacer y={5} />
        <h3 className="text-1xl text-center font-bold">
            It looks like the page you&apos;re looking for doesn&apos;t exist. (404)
        </h3>
        <Spacer y={5} />
        <p className="text-center">
          This could be due to a broken link, a mistyped URL, or the page might
          have been removed.
        </p>
        <Spacer y={5} />

        <div className="flex justify-center">
          <Button
            onClick={() => router.back()}
            className="px-6"
          >
            Go Back
          </Button>
          <Spacer x={5} />
          <Link href="/" legacyBehavior>
            <Button color="primary" className="px-6">
              Homepage
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

export default NotFoundPage;
