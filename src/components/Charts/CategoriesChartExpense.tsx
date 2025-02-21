import { CartesianGrid, XAxis, YAxis,  Tooltip, ResponsiveContainer,ComposedChart,TooltipProps, Bar, Legend, PieChart, Pie, Cell, LabelProps } from "recharts";
import { Account } from "../../types/account";
import { MonthCategoryType } from "../../Hendlers/filterCategiryesData";
import { CategoriesExpenceColors, CategoriesIncomeColors } from "../../Components";
import { useMediaQuery } from "react-responsive";
import { DataPieType } from "../../types/expenseIncomeTransaction";
import { calculatePercentages } from "../../Hendlers/CalculatePercentages";

type Props = {
  currentAccount: Account,
  filteredExpenseData: MonthCategoryType[]
  expenseData: DataPieType[],
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

export const CategoriesChartExpense: React.FC<Props> = ({ currentAccount, filteredExpenseData, expenseData }) => {
  const isMobile = useMediaQuery({ maxWidth: 550 });

  const expenseDataWithPercentages = calculatePercentages(expenseData);

  const categoryExpenseKeys = filteredExpenseData.reduce((keys, entry) => {
    Object.keys(entry).forEach(key => {
      if (key !== 'date' && !keys.includes(key)) {
        keys.push(key);
      }
    });
    return keys;
  }, [] as string[]);

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div style={{width: !isMobile? '41%' : "100%", height: isMobile ? 560 : 370 }}>
        <ResponsiveContainer>
          <PieChart>  
            <Tooltip content={<CustomTooltipPie />} />
            <Legend
              payload={expenseDataWithPercentages.map(({ sumByDateOrCategory, percentage }) => ({
                value: `${sumByDateOrCategory}: ${percentage}%`,
                type: 'triangle',
                color: "#D7E1FF",
              }))}
              wrapperStyle={{
                lineHeight: "30px",
                padding: "10px",
                backgroundColor: "#2C4359",
                borderRadius: "8px",
                border: "1px solid #D7E1FF",
                textAlign: "left",
              }}
            />
            {expenseData.length > 0 && (
              <Pie
                data={expenseData} 
                dataKey="sum"
                paddingAngle={5}
                innerRadius={40} 
                outerRadius={90} 
                fill="#AFC2FF"
                stroke="#AFC2FF"
                labelLine={false}
                label={renderCustomizedLabelOuter}
              >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CategoriesExpenceColors[index % CategoriesExpenceColors.length]} />
              ))}
            </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div style={{width: !isMobile? '56%' : "100%", height: isMobile ? 560 : 370 }}>
        <ResponsiveContainer>
          <ComposedChart
            barGap={0}
            data={filteredExpenseData}
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
              payload={categoryExpenseKeys.map((key, index) => {
                const sum = filteredExpenseData.reduce((acc, entry) => acc + Number(entry[key] || 0), 0);
                return {
                  value: `${key}: ${sum.toFixed(2)}`,
                  type: "rect",
                  color: "#D7E1FF",
                };
              })}
              wrapperStyle={{ 
                lineHeight: "30px",
                padding: "10px",
                backgroundColor: "#2C4359",
                borderRadius: "8px",
                border: "1px solid #D7E1FF",
                textAlign: "left",
              }}
            />
            <Tooltip content={<CustomTooltipBar />} />

            {categoryExpenseKeys.map((key, index) => (
              <Bar
                key={index}
                type="monotone"
                stackId="a"
                dataKey={key}
                fill={CategoriesExpenceColors[index % CategoriesExpenceColors.length]}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};