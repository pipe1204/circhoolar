import ClientProviders from "@/components/ClientProviders";
import "./globals.css";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import GlobalStateProvider from "@/components/GlobalStateProvider";
import { Toaster } from "@/components/ui/toaster";
import Head from "next/head";

export const metadata = {
  title: "Circhoolar",
  description:
    "Revolutionizing Educational communities through Circular Economy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/circhoo/image/upload/v1701390519/circhoolar_items_upload/cuy16eufblxl65mriacq.png"
          />
          <meta property="og:url" content="https://circhoolar.com" />
          <meta property="og:type" content="website" />
        </Head>
        <body className="bg-background">
          <FirebaseAuthProvider>
            <GlobalStateProvider>
              <main>{children}</main>
              <Toaster />
            </GlobalStateProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
