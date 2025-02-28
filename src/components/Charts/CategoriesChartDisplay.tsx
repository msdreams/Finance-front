import { BsBarChartLine } from "react-icons/bs"; 
import { AiOutlinePieChart } from "react-icons/ai"; 
import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, TooltipProps, Cell, LabelProps, ComposedChart, CartesianGrid, XAxis, YAxis, Bar, LegendType } from "recharts";
import { CategoriesExpenseColors, CategoriesIncomeColors } from "../../Components";
import { DataPieType } from "../../types/expenseIncomeTransaction";
import { useMediaQuery } from "react-responsive";
import { MonthCategoryType } from "../../Hendlers/filterCategiryesData";
import { calculatePercentages } from "../../Hendlers/CalculatePercentages";
import { useEffect, useState } from "react";

type Props = {
  PieIncomeData: DataPieType[],
  BarIncomeData: MonthCategoryType[],
  dataType: string,
  selectedChart?: string
}

type CustomLabelProps = LabelProps & {
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
};

const CustomTooltipPie: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (!(active && payload && payload.length)) {
    return null;
  }

  const data = payload[0]?.payload;
  return (
    <div className=" bg-gray-700 flex flex-col gap-2 rounded-md p-2">
    <p className={`text-sm ${data?.type === "Income" ? "text-primary-200" : "text-secondary-200"} font-semibold`}>
    {data?.sumByDateOrCategory}
      </p>
        <span>{data?.sum} {data?.currency}</span>
    </div>
  );
};

const CustomTooltipBar: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (!(active && payload && payload.length)) {
    return null;
  }

  return (
    <div className="p-2 bg-gray-700 flex flex-col gap-2 rounded-md">
      <p className="text-medium font-semibold text-gray-300">{label}</p>
      {payload
        .map((entry, index) => {
        const categoryName = entry.name || "Unknown";
        return (
          <p key={index} className="text-sm">
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}:&nbsp;
            <span>{entry.value}</span>
          </p>
        );
      })}
    </div>
  );
};

const RADIAN = Math.PI / 180;

const renderCustomizedLabelOuter = ({ 
  cx = 0, 
  cy = 0, 
  midAngle = 0, 
  innerRadius = 0, 
  outerRadius = 0, 
  percent = 0, 
  index = 0 
}: CustomLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);
  

  return (
    <text 
      x={x} 
      y={y} 
      fill="white"
      fontSize={16}
      textAnchor={x > Number(cx) ? 'start' : 'end'} 
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const CategoriesChartDisplay: React.FC<Props> = ({ PieIncomeData, BarIncomeData, dataType }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const incomeDataWithPercentages = calculatePercentages(PieIncomeData);
  const [selectedMonth, setSelectedMonth] = useState(BarIncomeData.length > 0 ? BarIncomeData[0].date : "");

  useEffect(() => {
    if (BarIncomeData.length > 0) {
      setSelectedMonth(BarIncomeData[0].date);
    }
  }, [BarIncomeData]);

  const handleBarClick = (data: any) => {
    setSelectedMonth(data.date);
  };

  const categoryIncomeKeys = BarIncomeData.reduce((keys, entry) => {
    Object.keys(entry).forEach(key => {
      if (key !== 'date' && !keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, [] as string[]);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 w-full ">
      <div style={{ width: !isMobile ? '50%' : "100%", height: isMobile ? 500 : 450 }}>
        {PieIncomeData.length > 0 ? (
        <ResponsiveContainer>
          <PieChart>  
            <Tooltip content={<CustomTooltipPie />} />
              <Legend
              payload={[
                {
                  value: `📅 ${selectedMonth.split("-")[0]}:`,
                  type: "line", 
                  color: "transparent", 
                },
                ...incomeDataWithPercentages
                  .map(({ sumByDateOrCategory, percentage, type }, index) => ({
                value: `${sumByDateOrCategory.toUpperCase()}: ${percentage}%`,
                type: 'triangle' as LegendType,
                color: type === "Income" ? CategoriesIncomeColors[index] : CategoriesExpenseColors[index],
              }))]}
              formatter={(value, entry) => (
                <span style={{ color: "#fff" }}>{value}</span>
              )}
              wrapperStyle={{
                lineHeight: "26px",
                padding: "8px",
                backgroundColor: "#2C4359",
                borderRadius: "8px",
                border: "1px solid #D5ECF1",
                textAlign: "left",
                opacity: "90%"
              }}
            />
            {incomeDataWithPercentages.length > 0 && (
              <Pie
                data={incomeDataWithPercentages} 
                dataKey="sum"
                paddingAngle={8}
                outerRadius={95} 
                labelLine={false}
                stroke="#D5ECF1"
                label={renderCustomizedLabelOuter}
              >
              {incomeDataWithPercentages.map(({type}, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={type === "Income" ? CategoriesIncomeColors[index] : CategoriesExpenseColors[index]}
                />
              ))}
            </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>

        ) : (
            <div className="flex items-center justify-center w-full h-full border rounded-lg">
               <AiOutlinePieChart size={60} /><p> There is no Data yet</p>
            </div>
        )}
      </div>
      <div style={{ width: !isMobile ? '50%' : "100%", height: isMobile ? 500 : 450 }}>
        {BarIncomeData.length > 0 ? (
          <ResponsiveContainer>
            <ComposedChart
              barGap={0}
              data={BarIncomeData}
              margin={{
                top: 24,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#D5ECF1", dy: 5 }} />
              <YAxis tick={{ fill: dataType === "Income" ? "#93F0B6" : "#AFC2FF" }} />
              <Legend
                  payload={[
                    {
                      value: `📅 ${selectedMonth}:`,
                      type: "line", 
                      color: "transparent", 
                    },
                    ...categoryIncomeKeys
                      .map((key, index) => {
                        const filteredData = BarIncomeData.find(entry => entry.date === selectedMonth) || BarIncomeData[0];
                
                        const sum = Number(filteredData[key] || 0);
                
                        return {
                          value: `${key}: ${sum.toFixed(2)}`,
                          type: "square" as LegendType,
                          color: dataType === "Income" ? CategoriesIncomeColors[index] : CategoriesExpenseColors[index],
                          sum
                        };
                      })
                      .sort((a, b) => b.sum - a.sum)
                      .map(({ sum, ...rest }) => rest)
                  ]}
                formatter={(value) => (
                  <span style={{ color: "#fff" }}>{value}</span>
                )}
                wrapperStyle={{
                  lineHeight: "26px",
                  padding: "8px",
                  backgroundColor: "#2C4359",
                  borderRadius: "8px",
                  border: "1px solid #D5ECF1",
                  opacity: "90%"
                }}
              />
              <Tooltip content={<CustomTooltipBar />} />

              {categoryIncomeKeys.map((key, index) => (
                <Bar
                  key={index}
                  type="monotone"
                  stackId="a"
                  dataKey={key}
                  fill={dataType === "Income" ? CategoriesIncomeColors[index] : CategoriesExpenseColors[index]}
                  onClick={(data) => handleBarClick(data)}
                  cursor="pointer"
                />
              ))}
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center w-full h-full border rounded-lg">
            <BsBarChartLine size={60} /> <p> There is no Data yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
