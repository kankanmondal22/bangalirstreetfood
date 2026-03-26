// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import GsapProvider from "@/lib/gsap-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GsapProvider>
      <Header />
      <main className="bg-gray-100">
        {children}
        <Footer />
      </main>
    </GsapProvider>
  );
}
