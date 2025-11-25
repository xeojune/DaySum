import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white text-black p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <a href="/">DAYSUM</a>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                                <span className="text-white">P</span> {/* Placeholder for Profile */}
                            </div>
                        </li>
                        <li><a href="/about" className="hover:text-gray-600">About</a></li>
                        <li><a href="/contact" className="hover:text-gray-600">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;