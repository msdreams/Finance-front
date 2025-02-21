import { PieChart, Pie, ResponsiveContainer, Tooltip, Legend, TooltipProps, Cell, LabelProps, ComposedChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { CategoriesExpenceColors, CategoriesIncomeColors } from "../../Components";
import { DataPieType } from "../../types/expenseIncomeTransaction";
import { useMediaQuery } from "react-responsive";
import { processData } from "../../Hendlers/FilterCategoriesData";
import { MonthCategoryType } from "../../Hendlers/filterCategiryesData";
import { calculatePercentages } from "../../Hendlers/CalculatePercentages";

type Props = {
  incomeData: DataPieType[],
  filteredIncomeData: MonthCategoryType[]
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
      <p className="text-sm text-primary-200 font-semibold">{data?.type}</p>
      <span className="text-medium">{data?.sumByDateOrCategory}</span>
        <span>{data?.sum} {data?.currency}</span>
    </div>
  );
};

const CustomTooltipBar: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (!(active && payload && payload.length)) {
    return null;
  }

  return (
    <div className="p-2 bg-gray-700 flex flex-col gap-4 rounded-md">
      <p className="text-medium">Date: {label}</p>
      {payload.map((entry, index) => {
        const categoryName = entry.name || "Unknown";
        return (
          <p key={index} className={`text-sm ${categoryName === 'income' ? 'text-primary-300' : 'text-secondary-300'}`}>
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


export const CategoriesChartIncome: React.FC<Props> = ({ incomeData, filteredIncomeData}) => {
  const isMobile = useMediaQuery({ maxWidth: 550 });
  const incomeDataWithPercentages = calculatePercentages(incomeData);

    const categoryIncomeKeys = filteredIncomeData.reduce((keys, entry) => {
      Object.keys(entry).forEach(key => {
        if (key !== 'date' && !keys.includes(key)) {
          keys.push(key);
        }
      });
      return keys;
    }, [] as string[]);

  return (
    <div className="flex flex-col md:flex-row gap-2 w-full">
      <div style={{width: !isMobile? '42%' : "100%", height: isMobile ? 560 : 370 }}>
        <ResponsiveContainer>
          <PieChart>  
            <Tooltip content={<CustomTooltipPie />} />
            <Legend
              payload={incomeDataWithPercentages.map(({ sumByDateOrCategory, percentage }) => ({
                value: `${sumByDateOrCategory}: ${percentage}%`,
                type: 'triangle',
                color: "#C8F7D4",
              }))}
              wrapperStyle={{
                lineHeight: "30px",
                padding: "10px",
                backgroundColor: "#2C4359",
                borderRadius: "8px",
                border: "1px solid #C8F7D4",
                textAlign: "left",
              }}
            />
            {incomeData.length > 0 && (
              <Pie
                data={incomeData} 
                dataKey="sum"
                paddingAngle={8}
                outerRadius={95} 
                fill="#59D493"
                labelLine={false}
                stroke="#59D493"
                label={renderCustomizedLabelOuter}
              >
              {incomeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CategoriesIncomeColors[index % CategoriesIncomeColors.length]} />
              ))}
            </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{width: !isMobile? '56%' : "100%",  height: isMobile ? 560 : 370 }}>
        <ResponsiveContainer>
          <ComposedChart
            barGap={0}
            data={filteredIncomeData}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: "#59D493", dy: 5 }} />
            <YAxis tick={{ fill: "#59D493" }} />
            <Legend
              payload={categoryIncomeKeys.map((key, index) => {
                const sum = filteredIncomeData.reduce((acc, entry) => acc + Number(entry[key] || 0), 0);
                return {
                  value: `${key}: ${sum.toFixed(2)}`,
                  type: "rect",
                  color: "#C8F7D4",
                };
              })}
              wrapperStyle={{
                lineHeight: "30px",
                padding: "10px",
                backgroundColor: "#2C4359",
                borderRadius: "8px",
                border: "1px solid #C8F7D4",
                textAlign: "left",
              }}
            />
            <Tooltip content={<CustomTooltipBar />} />

            {categoryIncomeKeys.map((key, index) => (
              <Bar
                key={index}
                type="monotone"
                stackId="a"
                dataKey={key}
                fill={CategoriesIncomeColors[index % CategoriesIncomeColors.length]}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
