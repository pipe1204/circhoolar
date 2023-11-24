"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import MovingCard from "@/components/ui/MovingCard";
import { Card } from "@/components/ui/Card";
import Carousel from "@/components/Carousel";
import CardCarousel from "@/components/CardCarousel";
import FooterComponent from "@/components/ui/FooterComponent";
import Link from "next/link";

const IndexPage = () => {
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible,
  };

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
            <span className="text-title-color">Eco-Smart </span> School
            Commuinty
          </motion.h1>
          <motion.p
            className="text-lg text-paragraph-color mb-8"
            variants={itemVariants}
          >
            Eco-Friendly Marketplace for School Uniforms and children's Gear.
            Join a greener, school community-driven journey in children's
            pre-loved clothing and essentials.{" "}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <Link href={"/signup"}>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="font-semibold text-lg pulse-animation"
              >
                Start for free
              </Button>
            </Link>
          </motion.div>
        </motion.article>
        <motion.article
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 1 } }}
          variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
          <motion.div variants={itemVariants}>
            <CardCarousel />
          </motion.div>
        </motion.article>
        <div className="flex flex-col justify-center items-center my-20">
          <h2 className="text-center text-title-color text-2xl font-semibold">
            Join over 500 parents using Circhoolar
          </h2>
          <Carousel />
        </div>
        <Card className="w-11/12 mx-auto my-4 xl:my-10">
          <div className="w-9/11 xl:w-4/5 mx-auto flex flex-col justify-center items-center py-10 px-4 xl:px-0 xl:py-20">
            <h1 className="text-3xl xl:text-6xl font-bold mb-4 text-white text-center">
              The Power of{" "}
              <span className="text-title-color">Circular Economy</span> in
              School Communities
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Discover the impact of a circular economy with Circhoolar, where
              schools become hubs of sustainable practices. This platform
              facilitates the exchange of uniforms, clothing, books, and toys,
              embodying eco-responsibility. It's a transformative approach that
              not only reduces waste but also builds a sense of community and
              teaches valuable lessons in sustainability. By participating, you
              contribute to a greener future and a closer school community,
              setting a positive example for the next generation.
            </p>
          </div>
        </Card>
        <div className="flex flex-col">
          <div className="flex flex-col w-9/11 xl:w-1/2 mx-auto my-10">
            <h1 className="text-3xl xl:text-4xl font-bold mb-4 text-white text-center">
              Empower Your School Community with Sustainable Choices
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Revolutionizing Reuse and Charity Through Circhoolar
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
                  Community-Led Reuse and Recycling
                </h2>
                <p className=" text-paragraph-color">
                  Encourage a culture of sustainability within your school. Our
                  platform allows parents to easily give away or sell children's
                  essentials. By reusing and recycling, we collectively
                  contribute to reducing waste and CO2 emissions, fostering a
                  more environmentally responsible community.
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
                  Charitable Contributions with Every Exchange
                </h2>
                <p className=" text-paragraph-color">
                  Transform every transaction into an act of kindness. With
                  Circhoolar, when an item is claimed, the interested parent has
                  the option to make a donation. Sellers can choose to direct
                  these funds to a charity, their school, or retain them.
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
                  Supporting Schools and Charities
                </h2>
                <p className=" text-paragraph-color">
                  Our platform doesn’t just facilitate the passing on of goods;
                  it enables a cycle of support and generosity. Whether it’s
                  donating to the school’s own initiatives or supporting a cause
                  close to your heart, each transaction is an opportunity to
                  make a positive impact.
                </p>
              </Card>
            </motion.div>
          </div>
          <div className="hidden xl:flex flex-col justify-center items-center mt-20">
            <h1 className="text-3xl xl:text-6xl font-bold mb-4 text-white">
              Features we think you'll{" "}
              <span className="text-title-color"> love</span>
            </h1>
            <MovingCard
              backgroundColor="light-white"
              width="11/12"
              image="/Dashboard.png"
            />
          </div>
        </div>
      </section>
      <FooterComponent buttonLabel="Join the community" box={false} />
    </>
  );
};

export default IndexPage;
