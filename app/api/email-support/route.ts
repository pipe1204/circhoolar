import { SupportEmailTemplate } from "@/components/user/SupportEmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email, name, text } = body;
    const data = (await resend.emails.send({
      from: "Circhoolar <info@circhoolar.com>",
      to: "support@circhoolar.com",
      subject: "New incoming support email",
      react: SupportEmailTemplate({
        email: email,
        name: name,
        text: text,
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
