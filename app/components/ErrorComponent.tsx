export default function ErrorComponent({ text }: { text?: string }) {
  return (
    <div>
      <p className="text-red-500">{text}</p>
    </div>
  );
}
