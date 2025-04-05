import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface TestimonialCardProps {
  title: string;
  job: string;
  testimonial: string;
}

function TestimonialCard({ title, job, testimonial }: TestimonialCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{job}</CardDescription>
      </CardHeader>
      <CardContent>{testimonial}</CardContent>
    </Card>
  );
}

export default TestimonialCard;
