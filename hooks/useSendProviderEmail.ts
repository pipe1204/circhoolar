import { useToast } from "../components/ui/use-toast";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { provdierEmailSchema } from "@/lib/validations/auth";

type Inputs = z.infer<typeof provdierEmailSchema>;

const useSendProviderEmail = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(provdierEmailSchema),
    defaultValues: {
      email: "",
      name: "",
      provider: "",
      text: "",
    },
  });

  const sendProviderEmail = async (
    email: string,
    name: string,
    provider: string,
    text: string
  ) => {
    setIsLoading(true);

    const requestBody = JSON.stringify({
      email: email,
      name: name,
      provider: provider,
      text: text,
    });

    const response = await fetch("/api/email-educational-provider", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if (response.status === 200) {
      console.log("Email sent");
      setIsLoading(false);
      toast({
        title: "We have received your enquiry!",
        description:
          "Thank you for contacting us. We will review your enquiry and will get back to you as soon as we can.",
        duration: 5000,
      });
      form.reset({
        email: "",
        name: "",
        provider: "",
        text: "",
      });
    }
    setIsLoading(false);
  };

  return { sendProviderEmail, isLoading, form };
};

export default useSendProviderEmail;
