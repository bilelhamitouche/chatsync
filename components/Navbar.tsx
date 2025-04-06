"use client";

import { MenuIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const Navbar = () => {
  const legals = [
    {
      title: "Terms of service",
      href: "/terms",
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
  ];

  return (
    <section className="p-4">
      <div className="container mx-auto">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex gap-2 items-center">
            <span className="text-xl font-semibold tracking-tighter">
              ChatSync
            </span>
          </Link>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Legal</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-40">
                    {legals.map((legal, index) => (
                      <NavigationMenuLink
                        href={legal.href}
                        key={index}
                        className={`min-w-full p-2 rounded-md transition-colors hover:bg-muted/70 ${navigationMenuTriggerStyle()}`}
                        asChild
                      >
                        <Link href={legal.href}>
                          <div key={legal.title} className="w-full">
                            <p className="mb-1 font-semibold text-foreground">
                              {legal.title}
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className={navigationMenuTriggerStyle()}
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden gap-4 items-center lg:flex">
            <Button variant="outline" asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="overflow-auto max-h-screen">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex gap-2 items-center">
                    <span className="text-lg font-semibold tracking-tighter">
                      ChatSync
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Legal
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {legals.map((legal, index) => (
                          <Link
                            href={legal.href}
                            key={index}
                            className="p-3 rounded-md transition-colors hover:bg-muted/70"
                          >
                            <div key={legal.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {legal.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <Link href="/about" className="font-medium">
                    About
                  </Link>
                  <Link href="/contact" className="font-medium">
                    Contact
                  </Link>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                  <Button variant="outline" asChild>
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
