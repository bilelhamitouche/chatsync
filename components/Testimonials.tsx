import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  const testimonials: {
    title: string;
    job: string;
    testimonial: string;
  }[] = [
    {
      title: "Sarah Johnson",
      job: "Product Manager",
      testimonial:
        "ChatSync has transformed how our team communicates. The real-time collaboration features are game-changing.",
    },
    {
      title: "David Chen",
      job: "Software Developer",
      testimonial:
        "I've tried many chat apps, but none match the speed and reliability of ChatSync. It's become essential to my workflow.",
    },
    {
      title: "Emily Rodriguez",
      job: "Marketing Director",
      testimonial:
        "The interface is intuitive and beautiful. Our entire marketing team was able to adopt it without any training.",
    },
  ];
  return (
    <section className="flex flex-col gap-2 items-center py-28 px-8 md:px-16 bg-neutral-100">
      <h2 className="text-4xl font-bold">Loved by users</h2>
      <p className="text-lg text-gray-500">
        See what our users have to say about ChatSync.
      </p>
      <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-2 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            title={testimonial.title}
            job={testimonial.job}
            testimonial={testimonial.testimonial}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
