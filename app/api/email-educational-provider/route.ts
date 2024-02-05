import { EducationalProviderContactEmailTemplate } from "@/components/user/EducationalProviderContactEMailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: any) {
  try {
    const body = await req.json();
    const { email, name, provider, text } = body;
    const data = (await resend.emails.send({
      from: "Circhoolar <info@circhoolar.com>",
      to: "support@circhoolar.com",
      subject: "New Educational Centre contact form",
      react: EducationalProviderContactEmailTemplate({
        email: email,
        name: name,
        provider: provider,
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
