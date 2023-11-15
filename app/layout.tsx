import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className="bg-background">
        <div className=" z-50 sticky top-0 pt-8 bg-transparent">
          <Navbar />
        </div>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
