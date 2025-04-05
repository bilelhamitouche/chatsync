import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer className="flex justify-between p-4 text-sm">
      <div className="flex flex-col justify-between">
        <div className="flex gap-4 items-center">
          <Link href="https://instagram.com/chatsync">
            <Instagram color="maroon" />
          </Link>
          <Link href="https://twitter.com/chatsync">
            <Twitter color="skyblue" />
          </Link>
          <Link href="https://facebook.com/chatsync">
            <Facebook color="blue" />
          </Link>
        </div>
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} ChatSync. All Rights Reserved.
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center text-gray-500">
          <p className="mb-2 font-semibold uppercase">Company</p>
          <Button variant="link" className="text-gray-500" size="sm" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button variant="link" className="text-gray-500" size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
        <div className="flex flex-col items-center text-gray-500">
          <p className="mb-2 font-semibold uppercase">Legal</p>
          <Button variant="link" className="text-gray-500" size="sm" asChild>
            <Link href="/terms">Terms</Link>
          </Button>
          <Button variant="link" className="text-gray-500" size="sm" asChild>
            <Link href="/privacy">Policy</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
