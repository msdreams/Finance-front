import { TbCashOff } from "react-icons/tb"; 
import { TbCash } from "react-icons/tb"; 

type Props = {
  selectedYear: string,
  setSelectedChart: (value: string) => void,
  selectedChart: string
}

export const TimeFilter: React.FC<Props> = ({
  selectedYear,
  setSelectedChart,
  selectedChart
}) => {

  return (
    <div className="flex pt-4 flex-col items-start gap-4 xl:flex-row">
      <div className="w-full flex flex-col">
        <div className="flex flex-row gap-4">
          <div
            className={`flex flex-row items-center gap-1 text-white text-md font-semibold p-2 border rounded-lg 
              ${selectedChart === "YEAR" ? "border-primary-100" : "border-gray-600"} 
              hover:border-gray-400 cursor-pointer`}
            onClick={() => setSelectedChart("YEAR")}
          >
            <TbCashOff size={22} />
            {selectedYear} YEAR
          </div>

          <div
            className={`flex flex-row items-center gap-1 text-white text-md font-semibold p-2 border rounded-lg 
              ${selectedChart === "MONTHS" ? "border-primary-100" : "border-gray-600"} 
              hover:border-gray-400 cursor-pointer`}
            onClick={() => setSelectedChart("MONTHS")}
          >
            <TbCash size={24} />
            {selectedYear} BY MONTHS 
          </div>
        </div>
      </div>
  </div>
  )
}