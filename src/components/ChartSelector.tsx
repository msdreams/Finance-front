type ChartSelectorProps = {
  label: "INCOME" | "EXPENSE";
  icon: JSX.Element;
  selectedChart: "INCOME" | "EXPENSE";
  onSelect: (chart: "INCOME" | "EXPENSE") => void;
};

export const ChartSelector: React.FC<ChartSelectorProps> = ({ label, icon, selectedChart, onSelect }) => {
  const isSelected = selectedChart === label;

  return (
    <div
      className={`flex flex-row items-center gap-1 text-white text-md font-semibold p-2 border rounded-lg 
        ${isSelected ? "border-primary-100" : "border-gray-600"} 
        hover:border-gray-400 cursor-pointer`}
      onClick={() => onSelect(label)}
    >
      {icon} {label}
    </div>
  );
};
