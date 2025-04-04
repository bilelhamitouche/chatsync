import { MessageSquare } from "lucide-react";
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

function Navbar() {
  return (
    <header className="flex sticky z-10 justify-between items-center p-4 border-b border-b-gray-200 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <h1 className="flex items-center space-x-1">
        <MessageSquare className="text-primary" />
        <span className="text-xl font-bold text-primary">ChatSync</span>
      </h1>
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
