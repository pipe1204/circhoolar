"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import MovingCard from "@/components/ui/MovingCard";
import { Card } from "@/components/ui/Card";
import Carousel from "@/components/Carousel";
import CardCarousel from "@/components/CardCarousel";
import FooterComponent from "@/components/ui/FooterComponent";
import Link from "next/link";
import { useSession } from "next-auth/react";

const IndexPage = () => {
  const { data: session } = useSession();
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
            Reimagining
            <span className="text-title-color">
              {" "}
              Educational Communities,{" "}
            </span>{" "}
            One Connection at a Time
          </motion.h1>
          <motion.p
            className="text-lg text-paragraph-color mb-8"
            variants={itemVariants}
          >
            Welcome to Circhoolar, where engagement in school and childcare
            communities is reimagined. Exchange goods, share advice, and foster
            stronger connections, all on a platform tailored for the needs of
            modern parents.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            {!session && (
              <Link href={"/api/auth/signin"}>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="font-semibold text-lg pulse-animation"
                >
                  Start for free
                </Button>
              </Link>
            )}
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
              Circhoolar: Your
              <span className="text-title-color">
                {" "}
                School and Childcare centre Community{" "}
              </span>
              hub.
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Move past the chaos of WhatsApp groups. Circhoolar offers a
              cohesive, user-friendly platform for school and Childcare Centres
              communities to trade items and share knowledge, enhancing
              interaction and support among parents. Engage, connect, and
              contribute through our marketplace for pre-loved items and a
              community forum for insightful discussions.
            </p>
          </div>
        </Card>
        <div className="flex flex-col">
          <div className="flex flex-col w-9/11 xl:w-1/2 mx-auto my-10">
            <h1 className="text-3xl xl:text-4xl font-bold mb-4 text-white text-center">
              Beyond Just a Marketplace
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Uncover the Advantages of a Unified School Community Platform
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
                  Eco-Friendly Marketplace
                </h2>
                <p className=" text-paragraph-color">
                  Participate in a sustainable cycle of reuse by buying,
                  selling, or donating pre-loved items, reducing waste and
                  supporting environmental consciousness, while optionally
                  contributing to school initiatives.
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
                  Engaged Parental Community Forum
                </h2>
                <p className=" text-paragraph-color">
                  Dive into a rich forum where parents can exchange advice,
                  experiences, and insights. Our community-focused platform
                  offers a dedicated space for meaningful and organized
                  discussions, enhancing parent-to-parent connections.
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
                  Convenience and Organization
                </h2>
                <p className=" text-paragraph-color">
                  Say goodbye to scattered WhatsApp conversations. Circhoolar
                  brings everything you need in one place, making it easier than
                  ever to stay connected and informed within your community.
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
