import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <Card className="flex transition-shadow duration-200 hover:drop-shadow-lg">
      <CardHeader>
        <div className="mx-auto">{icon}</div>
        <CardTitle className="text-2xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-base">{text}</CardContent>
    </Card>
  );
}

export default FeatureCard;
