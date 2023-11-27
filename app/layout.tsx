import ClientProviders from "@/components/ClientProviders";
import "./globals.css";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import VerificationCodeProvider from "@/components/VerificationCodeProvider";

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
            <VerificationCodeProvider>
              <main>{children}</main>
            </VerificationCodeProvider>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
