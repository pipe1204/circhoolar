"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useFollowPointer } from "../../../lib/use-follow-pointer";
import FooterComponent from "@/components/ui/FooterComponent";
import Image from "next/image";

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
          className="text-center w-11/12 xl:w-1/2 mx-auto"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.h1
            className="text-3xl xl:text-6xl font-bold mb-4 text-white"
            variants={{ hidden: { opacity: 0, y: -20 }, visible }}
          >
            Uniting Schools and Communities for a
            <span className="text-title-color"> Sustainable </span>Future
          </motion.h1>
          <motion.p
            className="text-lg text-paragraph-color mb-8"
            variants={itemVariants}
          >
            Empower Your School with Circhoolar – Foster Community Spirit and
            Environmental Stewardship
          </motion.p>
        </motion.article>
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
        <div className="flex flex-col">
          <div className="flex flex-col w-9/11 xl:w-1/2 mx-auto my-10">
            <h1 className="text-3xl xl:text-4xl font-bold mb-4 text-white text-center">
              The Advantages of Circhoolar for Schools
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Discover How Circhoolar Elevates School Communities and the
              Environment
            </p>
          </div>
          <div className="flex flex-col xl:flex-row justify-around items-center xl:items-stretch">
            <motion.div
              className="w-11/12 xl:w-1/4 my-4 xl:my-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-full h-full bg-dark py-8 px-8 flex flex-col justify-start items-center text-center">
                <h2 className="text-lg text-white font-bold mb-4">
                  Strengthening School-Parent Bonds
                </h2>
                <p className=" text-paragraph-color">
                  Circhoolar offers a unique platform for schools to tighten
                  their community ties. By facilitating the exchange of
                  children's essentials among parents, it nurtures a closer,
                  more engaged school community. This approach fosters a sense
                  of belonging and collective responsibility, making the school
                  environment more inclusive and supportive.
                </p>
              </Card>
            </motion.div>
            <motion.div
              className="w-11/12 xl:w-1/4 my-4 xl:my-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-full h-full bg-dark py-8 px-8 flex flex-col justify-start items-center text-center">
                <h2 className="text-lg text-white font-bold mb-4">
                  Promoting Sustainability and Reducing Carbon Footprint
                </h2>
                <p className=" text-paragraph-color">
                  Join the forefront of environmental change with Circhoolar.
                  Our platform helps schools lead by example in practicing
                  circular economy principles. By encouraging the reuse and
                  recycling of children’s items, schools play a crucial role in
                  reducing waste and CO2 emissions, instilling valuable lessons
                  in sustainability among students.
                </p>
              </Card>
            </motion.div>
            <motion.div
              className="w-11/12 xl:w-1/4 my-4 xl:my-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="w-full h-full bg-dark py-8 px-8 flex flex-col justify-start items-center text-center">
                <h2 className="text-lg text-white font-bold mb-4">
                  Facilitating Fundraising for School Initiatives
                </h2>
                <p className=" text-paragraph-color">
                  Circhoolar isn’t just about exchanges; it’s a tool for schools
                  to raise funds for their initiatives. Transactions on our
                  platform can include optional donations, with proceeds going
                  directly to the school or charities they support. This feature
                  provides a novel, community-driven way to fund school projects
                  and causes.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-fusia w-full paddings my-16">
        <div className="flex flex-col xl:flex-row justify-between items-center py-10 xl:py-20">
          <div className="w-11/12 xl:w-[40%] flex flex-col justify-start">
            <h1 className="text-light-white text-4xl xl:text-6xl font-bold">
              Book a demo
            </h1>
            <p className="text-gray-50 font-semibold mt-4">
              "Circhoolar has revolutionized our approach to sustainability and
              community involvement. It's not just a platform, but a community
              builder that has significantly enhanced our school's environmental
              and fundraising efforts."
            </p>
            <div className="mt-4 flex">
              <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-light-white relative">
                <Image
                  src={"/person3.jpg"}
                  alt="Principal school"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex flex-col justify-start">
                <h1 className="text-light-white font-bold">Amanda Woodstock</h1>
                <p className="text-gray-50">
                  Principal @ Maplewood Primary School
                </p>
              </div>
            </div>
          </div>
          <div>Form</div>
        </div>
      </section>
    </>
  );
};

export default page;
