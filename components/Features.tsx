import { Shield, Users, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";

function Features() {
  const features: { icon: React.ReactNode; title: string; text: string }[] = [
    {
      icon: <Zap size="48" className="text-primary" />,
      title: "Lightning Fast",
      text: "Real-time messaging with minimal latency",
    },
    {
      icon: <Shield size="48" className="text-primary" />,
      title: "Secure",
      text: "Secure authentication service to protect user privacy",
    },
    {
      icon: <Users size="48" className="text-primary" />,
      title: "Group Chat",
      text: "Seamless collaboration with teams",
    },
  ];
  return (
    <section className="container py-28 px-8 mx-auto space-y-2 text-center">
      <h1 className="text-4xl font-bold">Why Choose ChatSync?</h1>
      <p className="text-lg text-gray-500">
        Our chat platform is designed to make communication effortless and
        enjoyable.
      </p>
      <div className="grid grid-cols-1 gap-8 place-content-center mt-16 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;
