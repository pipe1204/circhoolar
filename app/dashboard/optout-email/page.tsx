"use client";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useProfileEdit from "@/hooks/useProfileEdit";
import React from "react";

const page = () => {
  const {
    notificationForm,
    editPreferences,
    isLoading: isProfileLoading,
    hideEditPreferences,
    handleEditPreferences,
    handlePreferencesSubmit,
    handleCancelEditreferences,
  } = useProfileEdit();

  return (
    <section className="bg-light-white w-11/12 xl:w-3/4 mx-auto my-8 p-10 shadow-md rounded-lg flex flex-col justify-center items-center">
      <h1 className="text-2xl text-primary-purple font-semibold mb-4">
        Opt Out of Email Notifications
      </h1>
      <p className="text-center">
        We send you email notifications when you receive a new message or a
        notification in relation to your posts in the community forrum. If you
        would like to opt out of these notifications, please select from the
        below options.
      </p>
      <Form {...notificationForm}>
        <form
          className="grid gap-4 mt-8"
          onSubmit={(...args) =>
            void notificationForm.handleSubmit(handlePreferencesSubmit)(...args)
          }
        >
          <FormField
            control={notificationForm.control}
            name="optout"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    disabled={editPreferences}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="No"
                          className="border border-dark-purple text-dark-purple"
                        />
                      </FormControl>
                      <FormLabel className="text-dark-purple font-semibold">
                        No, I would like to get updated on my account, items and
                        post in the forum
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="Yes"
                          className="border border-dark-purple text-dark-purple"
                        />
                      </FormControl>
                      <FormLabel className="font-semibold text-dark-purple">
                        Yes, I don't want to get emails with notifications about
                        my account
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          {!editPreferences && (
            <div className="flex">
              <Button
                variant={"link"}
                className="text-dark-purple"
                type="submit"
              >
                Save
              </Button>
              <Button
                variant={"link"}
                className="text-red"
                onClick={handleCancelEditreferences}
                type="button"
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="mx-auto">
            <Button
              variant={"outlineLight"}
              className="hover:text-light-white"
              onClick={handleEditPreferences}
              type="button"
              disabled={hideEditPreferences}
            >
              {isProfileLoading ? "Loading..." : "Edit preferences"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default page;
