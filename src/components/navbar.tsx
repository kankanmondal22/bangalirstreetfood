import Image from "next/image";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  return (
    <header className="">
      <div className="flex max-w-5xl mx-auto items-center justify-center py-4 gap-10">
        <Image
          src="/bangalir_street_food_logo1.jpg"
          alt="Logo"
          width={500}
          height={500}
          className="h-30 w-30 object-cover rounded-full"
        />
        <Image
          src="/khobarchoriadin.png"
          alt="Hero Image"
          width={800}
          height={500}
          className=" h-25 w-auto object-cover "
        />
      </div>
      <div className="mx-auto max-w-5xl bg-amber-300 p-2 rounded-lg flex items-center justify-center">
        {/* Navigation Links */}
        <nav className="flex gap-x-8">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 border border-amber-300 hover:border-gray-600 px-2 py-1 rounded-2xl uppercase font-bold  "
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
