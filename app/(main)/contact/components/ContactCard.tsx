import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  firstText: string;
  secondText: string;
}

function ContactCard({ icon, title, firstText, secondText }: ContactCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="mx-auto mb-1">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-base text-gray-500">{firstText}</p>
        <p className="text-base text-gray-500">{secondText}</p>
      </CardContent>
    </Card>
  );
}

export default ContactCard;
