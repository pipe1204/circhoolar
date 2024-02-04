import { ReportAbuseEmailTemplate } from "@/components/user/ReportAbuseEmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req: any) {
  try {
    const body = await req.json();
    const {
      abuserName,
      abuserEmail,
      abuserUserId,
      comment,
      reporterName,
      reporterEmail,
      behaviour,
    } = body;
    const data = (await resend.emails.send({
      from: "Circhoolar <info@circhoolar.com>",
      to: "issues@circhoolar.com",
      subject: "Comment Abuse Report",
      react: ReportAbuseEmailTemplate({
        abuserName: abuserName,
        abuserEmail: abuserEmail,
        abuserUserId: abuserUserId,
        comment: comment,
        reporterName: reporterName,
        reporterEmail: reporterEmail,
        behaviour: behaviour,
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
