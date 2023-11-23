import ClientProviders from "@/components/ClientProviders";
import "./globals.css";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";

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
            <main>{children}</main>
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
