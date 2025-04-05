import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface AccolateProps {
  icon: React.ReactNode;
  accolate: string;
  text: string;
}

function AccolateCard({ icon, accolate, text }: AccolateProps) {
  return (
    <Card>
      <CardHeader>
        <div className="mx-auto">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold text-center">{accolate}</p>
      </CardContent>
      <CardFooter>
        <p className="mx-auto text-lg text-gray-500">{text}</p>
      </CardFooter>
    </Card>
  );
}

export default AccolateCard;
