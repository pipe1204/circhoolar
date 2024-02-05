import { Comment } from "@/types/Types";
import { useToast } from "../components/ui/use-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { supportEmailSchema } from "@/lib/validations/auth";

type Inputs = z.infer<typeof supportEmailSchema>;

const useSendSupportEmail = () => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(supportEmailSchema),
    defaultValues: {
      email: "",
      name: "",
      text: "",
    },
  });

  const sendSupportEmail = async (
    email: string,
    name: string,
    text: string
  ) => {
    setIsLoading(true);

    const requestBody = JSON.stringify({
      email: email,
      name: name,
      text: text,
    });

    const response = await fetch("/api/email-support", {
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
        title: "We have received your email!",
        description:
          "Thank you for contacting us. We will review your enquiry and will get back to you as soon as we can.",
        duration: 5000,
      });
      form.reset({
        email: "",
        name: "",
        text: "",
      });
    }
    setIsLoading(false);
  };

  return { sendSupportEmail, isLoading, form };
};

export default useSendSupportEmail;
