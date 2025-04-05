"use client";

import { Menu, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <header className="flex fixed z-10 justify-between items-center p-4 w-full bg-white border-b border-b-gray-200">
      <Link href="/" className="flex items-center space-x-1">
        <MessageSquare className="text-primary" />
        <span className="text-xl font-bold text-primary">ChatSync</span>
      </Link>
      <NavigationMenu className="hidden sm:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Legal</NavigationMenuTrigger>
            <NavigationMenuContent>
              <Link href="/terms" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Terms Of Service
                </NavigationMenuLink>
              </Link>
              <Link href="/privacy" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Privacy Policy
                </NavigationMenuLink>
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button
        variant="outline"
        className="block sm:hidden"
        size="sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu />
      </Button>
      <div className="hidden space-x-2 sm:flex">
        <Button variant="ghost" asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </header>
  );
}

export default Navbar;
