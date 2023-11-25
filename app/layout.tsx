import ClientProviders from "@/components/ClientProviders";
import "./globals.css";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import { AuthProvider } from "@/context/AuthContext";

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
            {/* <AuthProvider> */}
            <main>{children}</main>
            {/* </AuthProvider> */}
          </FirebaseAuthProvider>
        </body>
      </html>
    </ClientProviders>
  );
}
