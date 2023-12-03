import Navbar from "@/components/Navbar";
import "../globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Circhoolar",
  description: "Your School Community’s Virtual Hub",
};

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className=" z-50 sticky top-0 pt-8 bg-transparent">
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
