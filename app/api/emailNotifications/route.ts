import { EmailNotificationsTemplate } from "@/components/user/EmailNotificationsTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any) {
  try {
    const body = await req.json();
    const { name, email } = body;

    const data = (await resend.emails.send({
      from: "Circhoolar <info@circhoolar.com>",
      to: [email],
      subject: "🔔 You've Got New Notifications on Circhoolar!",
      react: EmailNotificationsTemplate({ name: name }),
    })) as any;

    if (data.status === "success") {
      return NextResponse.json({ message: "Email sent successfully" });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}