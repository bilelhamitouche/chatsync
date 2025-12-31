"use client";

import { usePathname } from "next/navigation";
import { NavigationMenuLink } from "./ui/navigation-menu";
import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps) {
  const pathname = usePathname();
  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  return (
    <NavigationMenuLink className="px-4" asChild data-active={isActive(href)}>
      <Link href={href} className="font-semibold">
        {text}
      </Link>
    </NavigationMenuLink>
  );
}
