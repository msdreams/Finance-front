import { Select, SelectItem } from "@nextui-org/react";

type Props = {
  options: any[],
  selectedValue: string,
  onChange: (value: any) => void,
  label: string,
}

export const SingleSelect: React.FC<Props> = ({ options, selectedValue, onChange, label = "Select" }) => {
  return (
    <Select
      className="min-w-24"
      label={label}
      variant="flat"
      selectedKeys={[selectedValue]}
      onChange={(e) => onChange(e.target.value)}
      color="primary"
    >
      {options.map((option) => {
        return (
        <SelectItem className="font-sans" key={option} value={option} color="primary">
          {option}
        </SelectItem>
        )

      })}
    </Select>
  );
};
