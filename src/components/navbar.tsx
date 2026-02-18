import React from "react";

const Navbar = () => {
    return (
        <header className="fixed top-4 right-0 left-0 z-50 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl bg-amber-200 p-4 rounded-lg flex items-center">
                {/* Logo or Brand Name */}
                <div className="bg-gray-500 h-10 w-10 rounded-3xl"></div>
                {/* Navigation Links */}
                <nav className="ml-4">
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-gray-700 hover:text-gray-900"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
