// import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      {children}
      <Footer />
    </>
  );
}
