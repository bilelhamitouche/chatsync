import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function Faq() {
  const faq: { title: string; text: string }[] = [
    {
      title: "How secure is ChatSync?",
      text: "ChatSync ensures that only you and your intended recipiants can read your messages. We employ industry-leading security measures to protect your data.",
    },
    {
      title: "Is ChatSync free to use?",
      text: "Yes ChatSync free for everyone. We don't offer any paid versions.",
    },
    {
      title: "Can I use ChatSync for business?",
      text: "Yes Absolutely! You can use ChatSync for business requiring teams and collaboration.",
    },
  ];
  return (
    <section className="py-16 space-y-8">
      <h3 className="text-3xl font-bold">Frequently Asked Questions</h3>
      {faq.map((question, index) => (
        <Accordion
          key={index}
          type="single"
          collapsible
          className="flex flex-col mx-auto max-w-2xl min-w-2xl"
        >
          <AccordionItem value={index.toString()}>
            <AccordionTrigger className="w-full text-xl">
              {question.title}
            </AccordionTrigger>
            <AccordionContent className="w-full text-lg">
              {question.text}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </section>
  );
}

export default Faq;
