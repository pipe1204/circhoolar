"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useFollowPointer } from "../../../lib/use-follow-pointer";
import Image from "next/image";
import FooterComponent from "@/components/ui/FooterComponent";
import { Icons } from "@/components/Icons";
import MovingCard from "@/components/ui/MovingCard";

const page = () => {
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible,
  };

  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);
  return (
    <>
      <section className="flex-start flex-col paddings my-16">
        <motion.article
          className="text-center w-11/12 xl:w-1/2 mx-auto mb-20"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.h1
            className="text-3xl xl:text-6xl font-bold mb-4 text-white"
            variants={{ hidden: { opacity: 0, y: -20 }, visible }}
          >
            Strengthening
            <span className="text-title-color"> Parent Communities </span>
            Bonds
          </motion.h1>
          <motion.p
            className="text-lg text-paragraph-color mb-8"
            variants={itemVariants}
          >
            A Step Towards Sustainable Living and Community Engagement
          </motion.p>
        </motion.article>
        <div className="hidden xl:flex">
          <MovingCard
            backgroundColor="light-white"
            width="11/12"
            image="https://res.cloudinary.com/circhoo/image/upload/v1707306853/marketplace_pwt0lf.png"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col w-9/11 xl:w-1/2 mx-auto my-10">
            <h1 className="text-3xl xl:text-4xl font-bold mb-4 text-white text-center">
              Why joining Circhoolar?
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Explore How Circhoolar Enriches Lives and the Environment
            </p>
          </div>
          <div className="flex flex-col xl:flex-row justify-around items-center xl:items-stretch xl:px-10 py-10 gap-y-8 xl:gap-x-8">
            <Card className="bg-fusia w-11/12 xl:w-1/3 flex flex-col justify-center items-center text-center p-10">
              <div className="w-20 h-20 rounded-full border-2 border-light-white mb-4 flex justify-center items-center">
                <Icons.users className="text-light-white" size={40} />
              </div>
              <h2 className="text-lg text-white font-bold mb-4">
                Strengthening Community Connections
              </h2>
              <p className=" text-light-white">
                Join a network of supportive, like-minded parents, enriching
                your family's connections across diverse communities.
              </p>
            </Card>
            <Card className="bg-fusia w-11/12 xl:w-1/3 flex flex-col justify-center items-center text-center p-10">
              <div className="w-20 h-20 rounded-full border-2 border-light-white mb-4 flex justify-center items-center">
                <Icons.shrub className="text-light-white" size={40} />
              </div>
              <h2 className="text-lg text-white font-bold mb-4">
                Instill Environmental Values
              </h2>
              <p className=" text-light-white">
                Educate your children on sustainability by actively engaging in
                reducing waste and CO2 emissions through reuse.
              </p>
            </Card>
            <Card className="bg-fusia w-11/12 xl:w-1/3 flex flex-col justify-center items-center text-center p-10">
              <div className="w-20 h-20 rounded-full border-2 border-light-white mb-4 flex justify-center items-center">
                <Icons.dollarSign className="text-light-white" size={40} />
              </div>
              <h2 className="text-lg text-white font-bold mb-4">
                Earn and Save Money
              </h2>
              <p className=" text-light-white">
                Make extra cash or save on expenses by selling or exchanging
                children's items, blending financial savvy with
                eco-consciousness.
              </p>
            </Card>
          </div>
        </div>
        <div className="my-10 xl:mt-20">
          <h1 className="text-title-color text-center text-3xl xl:text-4xl font-bold">
            Join the Circular movement
          </h1>
        </div>
        <Card
          ref={ref}
          className="relative overflow-hidden w-11/12 xl:w-6/12 h-96 mx-auto py-10 xl:my-10"
        >
          <div className="w-full h-full absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center">
            <motion.div
              className="w-[100px] xl:w-[150px] h-[100px] xl:h-[150px] bg-fusia rounded-full"
              animate={{ x, y }}
              transition={{
                type: "spring",
                damping: 3,
                stiffness: 50,
                restDelta: 0.001,
              }}
            />
          </div>
        </Card>
      </section>
      <FooterComponent buttonLabel="Sign up" box={false} />
    </>
  );
};

export default page;
