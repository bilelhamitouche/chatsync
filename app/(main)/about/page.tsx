import { AwardIcon, Globe, ShieldIcon, Users } from "lucide-react";
import Image from "next/image";
import AccolateCard from "./components/AccolateCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function About() {
  const accolates: { icon: React.ReactNode; accolate: string; text: string }[] =
    [
      {
        icon: <Users size="48" className="text-primary" />,
        accolate: "100+",
        text: "Active Users",
      },
      {
        icon: <ShieldIcon size="48" className="text-primary" />,
        accolate: "100%",
        text: "Secure Messages",
      },
      {
        icon: <Globe size="48" className="text-primary" />,
        accolate: "150",
        text: "Countries",
      },
      {
        icon: <AwardIcon size="48" className="text-primary" />,
        accolate: "15",
        text: "Industry Awards",
      },
    ];
  return (
    <section className="container py-28 px-8 mx-auto space-y-4 max-w-6xl text-center">
      <h2 className="text-4xl font-bold">About ChatSync</h2>
      <p className="mx-auto max-w-2xl text-xl text-gray-500">
        We're on a mission to revolutionize digital communication by providing
        the most secure, efficient, and user-friendly messaging platform.
      </p>
      <div className="flex flex-col gap-8 mt-16 lg:flex-row">
        <div className="flex flex-col gap-4 text-left">
          <h3 className="text-2xl font-bold md:max-w-1/2">Our Story</h3>
          <p className="text-base text-gray-500">
            Founded in 2025, NovaChat emerged from a simple idea: communication
            should be seamless, secure, and accessible to everyone. What started
            as a small team of passionate developers has grown into a global
            platform serving millions of users worldwide.
          </p>
          <p className="text-base text-gray-500">
            Our commitment to privacy, innovation, and user experience has made
            us one of the fastest-growing messaging platforms in the industry.
          </p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="team image"
          width="550"
          height="400"
          className="w-full rounded-lg lg:w-fit"
        />
      </div>
      <div className="grid grid-cols-1 gap-8 place-content-center py-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {accolates.map((accolate, index) => (
          <AccolateCard
            key={index}
            icon={accolate.icon}
            accolate={accolate.accolate}
            text={accolate.text}
          />
        ))}
      </div>
      <div className="container flex flex-col gap-4 justify-center items-center mx-auto max-w-2xl">
        <h3 className="text-2xl font-bold">Join Our Team</h3>
        <p className="text-gray-500">
          We're always looking for talented individuals who share our passion
          for innovation and privacy-focused communication.
        </p>
        <Button size="lg" asChild>
          <Link href="https://emploitic.com" target="_blank">
            View Open Positions
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default About;
