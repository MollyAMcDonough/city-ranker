import React, { useState } from 'react';
import {Transition} from '@headlessui/react'; //For smooth transition between tabs
// import {Link} from 'react-scroll'; //Alternate for a tag. In Next js we use Link for ref.
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

function NavBar() {
    // useState is used to change state on dropdown being open for mobile navBar. only open when click sets to true
    const [isOpen,setIsOpen] = useState(false);
    const { user, isLoading } = useUser();
    function handleSetActive(e) {
        console.log(e)
    }
  return (
    <div>
    {/* For Main Navcontainer */}
    <nav className="fixed z-10 w-full shadow-sm">
        <div className="w-full">
            <div className="flex items-center w-full h-20">
                {/* first block section Outer part */}
                <div className="flex items-center justify-between w-full mx-20 items">
                    <div className="flex items-center justify-center flex-shrink-0">
                        <h1 className="text-xl font-bold cursor-pointer">
                            City<span className="text-blue-500">Ranker</span>
                        </h1>
                    </div>
                    {/* for small screnn we don't show tabs that's why written hidden and on medium device i.e. m we want them as block */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline ml-10 space-x-4">
                            {/* link carry some of the properties like activeClass i.e. on current page, to i.e. on about page if there, smooth i.e. transtion between tabs, offset i.e. time interval transition. duration i.e. how much time it weill change. */}
                            <Link
                                href="/" 
                                activeClass="home" 
                                to="home" 
                                smooth={true} 
                                offset={50} 
                                duration={500} 
                                className="px-3 py-2 font-semibold text-blue-600 cursor-pointer text-md hover:font-black"
                            >
                                <a
                                    activeClass="home" 
                                    to="home" 
                                    smooth={true} 
                                    offset={50} 
                                    duration={500} 
                                    className="px-3 py-2 font-semibold text-blue-600 cursor-pointer text-md hover:font-black"
                                >
                                    Home
                                </a>
                            </Link>
                            <Link 
                                href="/find-cities"
                                activeClass="find-cities" 
                                to="find-cities" 
                                smooth={true} 
                                offset={50} 
                                duration={500} 
                                className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                            >
                                <a
                                    activeClass="find-cities" 
                                    to="find-cities" 
                                    smooth={true} 
                                    offset={50} 
                                    duration={500} 
                                    className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Find Cities
                                </a>
                            </Link>
                            {!isLoading && user && (
                                <Link 
                                    href="/my-cities"
                                    activeClass="my-cities" 
                                    to="my-cities" 
                                    smooth={true} 
                                    offset={50} 
                                    duration={500} 
                                    className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    <a
                                        activeClass="my-cities" 
                                        to="my-cities" 
                                        smooth={true} 
                                        offset={50} 
                                        duration={500} 
                                        className="px-3 py-2 text-sm font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                    >
                                        My Cities
                                    </a>
                                </Link>
                            )}
                            {!isLoading && !user ? (
                                <Link 
                                    href="/api/auth/login"
                                    // passHref={true}
                                    activeClass="login" 
                                    to="login" 
                                    onSetActive={handleSetActive}
                                    smooth={true} 
                                    offset={50} 
                                    duration={500} 
                                    className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                                >
                                    <a
                                        activeClass="login" 
                                        to="login" 
                                        onSetActive={handleSetActive}
                                        smooth={true} 
                                        offset={50} 
                                        duration={500} 
                                        className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                                    >
                                        Login
                                    </a>
                                </Link>
                            ) : (
                                <Link 
                                href="/api/auth/logout"
                                // passHref={true}
                                activeClass="logout" 
                                to="logout" 
                                onSetActive={handleSetActive}
                                smooth={true} 
                                offset={50} 
                                duration={500} 
                                className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                            >
                                <a
                                    activeClass="logout" 
                                    to="logout" 
                                    onSetActive={handleSetActive}
                                    smooth={true} 
                                    offset={50} 
                                    duration={500} 
                                    className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md cursor-pointer hover:bg-black"
                                >
                                    Logout
                                </a>
                            </Link>
                            )}
                        </div>
                    </div>
                </div>
                {/* Mobile responsive- can remove these bits if looks weird with not getting rest of site to mobile responsive */}
                <div className="flex mr-10 md:hidden">
                    {/* when we click what will happen on mobile */}
                    <button onClick={() => setIsOpen(!isOpen)} 
                        type="button" 
                        className="inline-flex items-center justify-center p-2 text-white bg-blue-600 rounded-md outline-none hover:bg-blue-600 focus: focus:ring-offset-blue-800 focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        {/* basically menu icon from w3 website */}
                        {!isOpen ? (
                            <svg 
                                className="block w-6 h-6" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                aria-hidden="true"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M4 6h16M4 12h16M4 18h16" //for menu shape
                                />
                            </svg>
                        ) : (
                            <svg 
                                className="block w-6 h-6" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                aria-hidden="true"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M6 18L18 6M6 6l12 12"  //for cross shape
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
        {/* traansition from headlessui to smoothness in mobile experience */}
        <Transition 
            show={isOpen} 
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            {(ref) => (
                //handle the mobile menu tabs
                <div className="md:hidden id=mobile-menu">
                    <div
                        ref={ref}
                        className="px-2 pt-2 pb-3 space-y-1 bg-white sm:px-3"
                    >
                        <Link 
                            href="/"
                            activeClass="home"
                            to="home"
                            smooth={true}
                            offset={50}
                            duration={500}
                            className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                        >
                            <a
                                activeClass="home"
                                to="home"
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                            >
                                Home
                            </a>
                        </Link>
                        <Link 
                            href="/find-cities"
                            activeClass="find-cities"
                            to="find-cities"
                            smooth={true}
                            offset={50}
                            duration={500}
                            className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                        >
                            <a
                                activeClass="find-cities"
                                to="find-cities"
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                            >
                                Find Cities
                            </a>
                        </Link>
                        {!isLoading && user && (
                            <Link 
                                href="/my-cities"
                                activeClass="my-cities"
                                to="my-cities"
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                            >
                                <a
                                    activeClass="my-cities"
                                    to="my-cities"
                                    smooth={true}
                                    offset={50}
                                    duration={500}
                                    className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    My Cities
                                </a>
                            </Link>
                        )}
                        {!isLoading && !user ? (
                            <Link 
                                href="/api/auth/login"
                                activeClass="login"
                                to="login"
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                            >
                                <a
                                    activeClass="login"
                                    to="login"
                                    smooth={true}
                                    offset={50}
                                    duration={500} 
                                    className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Login
                                </a>
                            </Link>
                        ) : (
                            <Link 
                                href="/api/auth/logout"
                                activeClass="logout"
                                to="logout"
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                            >
                                <a
                                    activeClass="logout"
                                    to="logout"
                                    smooth={true}
                                    offset={50}
                                    duration={500} 
                                    className="block px-3 py-2 text-base font-medium text-black rounded-md cursor-pointer hover:bg-blue-600 hover:text-white"
                                >
                                    Logout
                                </a>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </Transition>
    </nav>
    </div>
  )
}

export default NavBar