import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <section className="container flex flex-col gap-4 justify-center items-center py-12 px-8 mx-auto max-w-4xl text-center sm:py-16 sm:px-16 md:px-24 lg:py-28">
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
        Connect in real-time with ChatSync
      </h2>
      <p className="max-w-2xl text-gray-500 sm:text-xl">
        Seamless communication for teams and friends. Experience the future of
        messaging with our lightning-fast, secure chat platform.
      </p>
      <div className="space-x-4">
        <Button size="lg" asChild>
          <Link href="/signup">
            <span>Get Started</span>
            <ArrowRight className="-ml-1" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="py-4 px-6" asChild>
          <Link href="/signup">Learn More</Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero;
