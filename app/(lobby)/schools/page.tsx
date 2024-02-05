"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { useFollowPointer } from "../../../lib/use-follow-pointer";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import useSendProviderEmail from "@/hooks/useSendProviderEmail";

const page = () => {
  const { sendProviderEmail, isLoading, form } = useSendProviderEmail();
  const visible = { opacity: 1, y: 0, transition: { duration: 0.5 } };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible,
  };

  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref);

  const handleSubmitEmail = async (data: any) => {
    if (
      data.email === "" ||
      data.name === "" ||
      data.provider === "" ||
      data.text === ""
    ) {
    } else {
      sendProviderEmail(data.email, data.name, data.provider, data.text);
    }
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
            Uniting Educational providers and Communities for a
            <span className="text-title-color"> Sustainable </span>Future
          </motion.h1>
          <motion.p
            className="text-lg text-paragraph-color mb-8"
            variants={itemVariants}
          >
            Empower Your School and Childcare Centre with Circhoolar – Foster
            Community Spirit and Environmental Stewardship
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
              The Advantages of Circhoolar for Educational providers
            </h1>
            <p className="text-lg text-paragraph-color text-center">
              Discover How Circhoolar Elevates Communities and the Environment
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
                  Strengthening Educational Community Bonds
                </h2>
                <p className=" text-paragraph-color">
                  Circhoolar offers a unique platform for Education centres to
                  tighten their community ties. By facilitating the exchange of
                  children's essentials among parents, it nurtures a closer,
                  more engaged community. This approach fosters a sense of
                  belonging and collective responsibility, making the
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
                  Our platform helps Educational providers lead by example in
                  practicing circular economy principles. By encouraging the
                  reuse and recycling of children’s items, these play a crucial
                  role in reducing waste and CO2 emissions, instilling valuable
                  lessons in sustainability among students and children.
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
                  Facilitating Fundraising for Educational Initiatives
                </h2>
                <p className=" text-paragraph-color">
                  Circhoolar isn’t just about a forum and exchanges; it’s a tool
                  for schools and early learning centres to raise funds for
                  their initiatives. Transactions on our platform can include
                  optional donations, with proceeds going directly to the centre
                  or charities they support. This feature provides a novel,
                  community-driven way to fund projects and causes.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="bg-fusia w-full paddings my-8">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          <div className="w-11/12 xl:w-[50%] flex flex-col justify-start text-center">
            <div className="flex flex-col xl:justify-center xl:items-center mb-8 xl:mb-0">
              <div className="my-4">
                <h1 className="text-light-white text-left xl:text-center text-4xl xl:text-5xl font-bold">
                  Contact us
                </h1>
              </div>
              <div className="flex flex-col justify-start">
                <p className="text-gray-50 font-semibold mt-4 text-left xl:text-center">
                  "Circhoolar has revolutionized our approach to sustainability
                  and community involvement. It's not just a platform, but a
                  community builder that has significantly enhanced our school's
                  environmental and fundraising efforts."
                </p>
              </div>
              <div className="flex flex-row justify-center items-center mt-4">
                <div className="w-12 h-12 mr-4 rounded-full overflow-hidden bg-light-white relative">
                  <Image
                    src={"/person3.jpg"}
                    alt="Principal school"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-light-white font-bold">
                    Amanda Woodstock
                  </h1>
                  <p className="text-gray-50 text-left">
                    Principal @ Maplewood Primary School
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[40%] flex flex-col justify-center items-center">
            <div className="w-full mx-auto">
              <Form {...form}>
                <form
                  className="grid gap-4"
                  onSubmit={(...args) =>
                    void form.handleSubmit(handleSubmitEmail)(...args)
                  }
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-sx text-light-white">
                          Email
                        </label>
                        <FormControl>
                          <Input
                            placeholder="Email address"
                            {...field}
                            className="shadow-sm bg-light-white-100"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex flex-col space-y-4 xl:space-y-0 xl:flex-row xl:justify-between gap-x-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <label className="text-sx text-light-white">
                            Contact Name
                          </label>
                          <FormControl>
                            <Input
                              placeholder="Contact Name"
                              {...field}
                              className="shadow-sm bg-light-white-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="provider"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <label className="text-sx text-light-white">
                            Company Name
                          </label>
                          <FormControl>
                            <Input
                              placeholder="Company Name"
                              {...field}
                              className="shadow-sm bg-light-white-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <label className="text-light-white text-sx">
                          Message
                        </label>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us how can we help?"
                            className="resize-none text-background bg-light-white-100"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    variant={"default"}
                    className="hover:text-light-white"
                    type="submit"
                  >
                    {isLoading ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
