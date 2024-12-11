interface PrivacySectionProps {
  id: string;
  title: string;
  content: string[];
}

export function PrivacySection({ id, title, content }: PrivacySectionProps) {
  return (
    <section id={id} className="scroll-mt-16">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4">
        {content.map((paragraph, index) => (
          <p key={index} className="leading-7 text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
