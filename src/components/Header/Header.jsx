import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'


function Header() {

    const authStatus = useSelector((state) => state.status)
    const navigate = useNavigate()

    // it's for dynamic code
    // it used because, we not interested to show all things in navbar 
    // this list help to make more dynamic code 
    // we not required to set all navbar items  
    const navItems = [
        {
            name: "Home",
            slug: '/',
            active: true
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        },
        {
            name: 'SignUp',
            slug: '/signup',
            active: !authStatus
        },
        {
            name: 'All post',
            slug: '/all-post',
            active: authStatus
        },
        {
            name: 'All Posts',
            slug: '/all-posts',
            active: authStatus,
        }
    ]

    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>

                    <div className='mr-4'>
                        {/* logo section */}
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>

                    {/* all navbar items */}
                    <ul>
                        {navItems.map((item) => (
                            //  it's one type of syntaxt 
                            // if active status is true then and then only ( LI) will be execute
                            item.active && (
                                <li key={item.name}>
                                    <button>
                                        {item.name}
                                    </button>
                                </li>
                            )
                        ))}

                        {/* logout section  */}
                        {/* if user is login then authstatus is true and then only logout btn appears */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>

                </nav>

            </Container>
        </header>
    )
}

export default Header
