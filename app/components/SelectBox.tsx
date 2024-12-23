import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export type SelectBoxParams = {
  items: string[];
  name: string;
  value?: string;
  format?: (value: string) => string;
  onChange?: (value: string) => void;
};
export default function SelectBox({
  items,
  name,
  value,
  format,
  onChange,
}: SelectBoxParams) {
  return (
    <Select onValueChange={onChange} value={value || ""}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={name} />
      </SelectTrigger>
      <SelectContent>
        {items.map((value) => (
          <SelectItem key={value} value={value}>
            {format ? format(value) : value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
