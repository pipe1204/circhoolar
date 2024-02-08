import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: "Email is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await axios.put(
      "https://api.sendgrid.com/v3/marketing/contacts",
      {
        contacts: [{ email }],
        list_ids: [process.env.SENDGRID_MAILING_ID],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
      }
    );

    return new NextResponse(
      JSON.stringify({
        message:
          "Your email has been successfully added to the mailing list. Welcome 👋",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("SendGrid Error:", error.response?.data || error.message);
    return new NextResponse(
      JSON.stringify({
        message:
          "Oops, there was a problem with your subscription. Please try again or contact us.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
