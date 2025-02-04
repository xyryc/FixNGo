"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for hamburger menu
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  // console.log(session);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navMenu = (
    <>
      <Link href="/" className="hover:text-gray-600">
        Home
      </Link>
      <Link href="/about" className="hover:text-gray-600">
        About
      </Link>
      <Link href="/services" className="hover:text-gray-600">
        Services
      </Link>
      <Link href="/my-bookings" className="hover:text-gray-600">
        Bookings
      </Link>
      <Link href="/blogs" className="hover:text-gray-600">
        Blog
      </Link>
      <Link href="/contact" className="hover:text-gray-600">
        Contact
      </Link>
    </>
  );

  return (
    <nav className="flex items-center justify-between p-4 bg-white container mx-auto">
      {/* Logo */}
      <div className="text-lg font-bold">
        <Link href={"/"}>FixNGo</Link>
      </div>

      {/* Hamburger Menu (Mobile Only) */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex items-center gap-4">{navMenu}</div>

      {/* User Dropdown (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {status == "authenticated" ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full "
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.image}
                      alt={session?.email}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => signOut()}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}

        <Button>Appointment</Button>
      </div>

      {/* Mobile Menu (Overlay) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Navigation Links (Mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="ml-auto block"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col p-4 gap-4" onClick={toggleMobileMenu}>
          {navMenu}
        </div>

        {/* User Dropdown (Mobile) */}
        <div className="p-4 flex flex-col gap-6">
          <Button>Appointment</Button>

          <div className="flex gap-4 items-center">
            {status == "authenticated" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full "
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session?.user?.image}
                          alt={session?.email}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => signOut()}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button asChild className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </>
            )}
            <p className="font-bold">{session?.user?.name}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
