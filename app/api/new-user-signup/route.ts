import { NewUserSignUpEmailTemplate } from "@/components/user/NewUserSignup";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email, name, code } = body;
    const data = (await resend.emails.send({
      from: "Circhoolar <info@circhoolar.com>",
      to: "accounts@circhoolar.com",
      subject: "New user sign up",
      react: NewUserSignUpEmailTemplate({
        email: email,
        name: name,
        code: code,
      }),
    })) as any;

    if (data.status === "success") {
      return NextResponse.json({ message: "Email sent successfully" });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
