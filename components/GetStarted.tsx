import Link from "next/link";
import { Button } from "./ui/button";

function GetStarted() {
  return (
    <section className="py-28 mx-auto space-y-4 text-center bg-primary">
      <h2 className="text-3xl font-bold text-primary-foreground">
        Ready to Get Started?
      </h2>
      <p className="text-lg text-primary-foreground">
        Join our community of users who trust NovaChat for their communication
        needs.
      </p>
      <Button variant="outline" size="lg" asChild>
        <Link href="/signup">Create Free Account</Link>
      </Button>
    </section>
  );
}

export default GetStarted;
