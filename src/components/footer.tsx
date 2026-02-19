import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="mt-auto bg-amber-300 text-gray-800 rounded-t-3xl">
      <div className="mx-auto max-w-5xl py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Image
              src="/bangalir_street_food_logo1.jpg"
              alt="Bangalir Street Food Logo"
              width={80}
              height={80}
              className="mb-4 rounded-full object-cover "
            />
            <h3 className="text-2xl font-bold uppercase">
              Bangalir Street Food
            </h3>
            <p className="mt-2 text-sm">
              Authentic taste, warm hospitality, and unforgettable journeys.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="mt-1 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold uppercase tracking-wide">
              Contact
            </h4>
            <p className="mt-3">
              <strong>Email:</strong> hello@bangalirstreetfood.com
            </p>
            <p className="text-sm">
              <strong>Phone:</strong> +91 90000 00000
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-amber-400 pt-4 text-center text-xs">
          © {new Date().getFullYear()} Bangalir Street Food. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
