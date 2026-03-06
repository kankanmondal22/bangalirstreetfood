This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## navbar
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
            <div className="mx-auto max-w-5xl bg-teal-400 p-2 rounded-lg flex items-center justify-center">
                {/* Navigation Links */}
                <nav className="flex gap-x-8">
                    {navigationLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-900 border border-teal-400 hover:border-gray-600 px-2 py-1 rounded-2xl uppercase font-semibold  "
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

## footer
```jsx
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const Footer = () => {
    return (
        <footer className="mt-auto rounded-t-3xl bg-teal-900 text-gray-100">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <Image
                            src="/bangalir_street_food_logo1.jpg"
                            alt="Bangalir Street Food Logo"
                            width={80}
                            height={80}
                            className="mx-auto mb-4 rounded-full object-cover sm:mx-0"
                        />
                        <h3 className="text-xl font-bold uppercase sm:text-2xl">
                            Bangalir Street Food
                        </h3>
                        <p className="mt-2 text-sm leading-6">
                            Authentic taste, warm hospitality, and unforgettable
                            journeys.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wide sm:text-xl">
                            Quick Links
                        </h4>
                        <ul className="mt-1 space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="inline-block hover:underline"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold uppercase tracking-wide sm:text-xl">
                            Contact
                        </h4>
                        <p className="mt-3 break-words">
                            <strong>Email:</strong> hello@bangalirstreetfood.com
                        </p>
                        <p className="text-sm leading-6">
                            <strong>Phone:</strong> +91 90000 00000
                        </p>
                    </div>
                </div>

                <div className="mt-8 border-t border-teal-500 pt-4 text-center text-xs sm:text-sm">
                    © {new Date().getFullYear()} Bangalir Street Food. All
                    rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
```


## hero
import React from "react";

const Hero = () => {
    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 bg-gray-100 rounded-lg h-100 m-4">
            Hero
        </div>
    );
};

export default Hero;
