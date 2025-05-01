import { Mail, Map, Phone } from "lucide-react";
import ContactCard from "./components/ContactCard";
import Faq from "./components/Faq";
import ContactForm from "./components/ContactForm";

function Contact() {
  const contacts: {
    icon: React.ReactNode;
    title: string;
    firstText: string;
    secondText: string;
  }[] = [
    {
      icon: <Mail size="52" className="text-primary" />,
      title: "Email",
      firstText: "support@chatsync.com",
      secondText: "business@chatsync.com",
    },
    {
      icon: <Phone size="52" className="text-primary" />,
      title: "Phone",
      firstText: "+1 (555) 123-4567",
      secondText: "Mon-Fri, 9AM-6PM EST",
    },
    {
      icon: <Map size="52" className="text-primary" />,
      title: "Office",
      firstText: "Seasme Street, CA 9525",
      secondText: "San Fransisco, United States",
    },
  ];
  return (
    <div className="container py-28 px-16 mx-auto space-y-16 max-w-sm text-center lg:max-w-5xl">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">Contact Us</h2>
        <p className="mx-auto max-w-2xl text-xl text-gray-500">
          Have questions? We&apos;re here to help. Reach out to our team through
          any of the channels below.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact, index) => (
          <ContactCard
            key={index}
            icon={contact.icon}
            title={contact.title}
            firstText={contact.firstText}
            secondText={contact.secondText}
          />
        ))}
      </div>
      <Faq />
      <h3 className="mb-8 text-3xl font-bold">Send us a message</h3>
      <ContactForm />
    </div>
  );
}

export default Contact;
