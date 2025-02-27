import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  options: any[],
  selectedValue: string,
  onChange: (value: any) => void,
}

export const SingleSelect: React.FC<Props> = ({ options, selectedValue, onChange }) => {
  return (
    <Select
      className="min-w-28"
      label="Select a year"
      variant="flat"
      selectedKeys={[selectedValue]}
      onChange={(e) => onChange(e.target.value)}
      color="secondary"
    >
      {options.map((option) => {
        return (
        <SelectItem className="font-sans" key={option} value={option} color="secondary">
          {option}
        </SelectItem>
        )
      })}
    </Select>
  );
};
