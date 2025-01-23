import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Container, Logo, LogoutBtn } from '../index';

function Header() {
    const authStatus = useSelector((state) => state.status);

    // Dynamic navigation items based on authentication status
    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="py-4 shadow-md ">
            <Container>
                <nav className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    {/* Navigation Items */}
                    <ul className="flex gap-6 items-center">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name} className="group">
                                        <NavLink
                                            to={item.slug}
                                            className={({ isActive }) =>
                                                `px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg hover:scale-105 ${isActive ? 'bg-blue-600' : 'bg-gray-700'
                                                }`
                                            }
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                )
                        )}

                        {/* Logout Button */}
                        {authStatus && (
                            <li className="group">
                                <LogoutBtn
                                    className="px-4 py-2 text-sm font-medium text-white transition duration-300 rounded-lg bg-red-600 hover:bg-red-700 hover:scale-105"
                                />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
