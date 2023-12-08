import ClientProviders from "@/components/ClientProviders";
import "./globals.css";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import GlobalStateProvider from "@/components/GlobalStateProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Circhoolar",
  description: "Revolutionizing School Uniforms through Circular Economy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProviders>
      <html lang="en">
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
