import { Area, CartesianGrid, XAxis, YAxis,  Tooltip, ResponsiveContainer,ComposedChart,TooltipProps, Bar, Legend } from "recharts";
import { Account } from "../../types/account";
import { MonthChartDataType } from "../../types/expenseIncomeTransaction";


type Props = {
  currentAccount: Account,
  filteredData: MonthChartDataType[]
}
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (!(active && payload && payload.length)) {
    return null;
  }

  return (
    <div className="p-2 bg-gray-700 flex flex-col gap-4 rounded-md">
      <p className="text-medium">Date: {label}</p>
      <p className="text-sm text-primary-300">
        Income:&nbsp;
        <span>{payload[0].value}</span>
      </p>
      <p className="text-sm text-secondary-300">
        Expense:&nbsp;
        <span>{payload[1].value}</span>
      </p>
    </div>
  );
};

export const CashFlowChart: React.FC<Props> = ({currentAccount, filteredData}) => {

  return (
    <div className="flex flex-col items-center pt-6" style={{ width: '100%', height: 450 }}>
      <ResponsiveContainer>
        <ComposedChart
          barGap={0} 
          data={filteredData}
          margin={{
              top: 10,
              right:0,
              left: 0,
              bottom: 5,
            }}>
      <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{fill: "#59D493", dy: 5}} />
          <YAxis tick={{ fill: "#59D493" }} />
          <Legend
            payload={[
            { value: "Income", type: "line", color: "#59D493" }, 
            { value: "Expense", type: "line", color: "#AFC2FF" }
            ]}
            wrapperStyle={{ lineHeight: '40px' }}
          />
          
          <Tooltip content={<CustomTooltip />} />
          <Bar type="monotone" barSize={10} dataKey="income" fill="#59D493" />
          <Bar type="monotone" barSize={10} dataKey="expense" fill="#AFC2FF"  />
          <Area type="monotone"  dataKey="income" fill="#59D493" legendType="none" tooltipType="none" stroke="noStroke"/>
          <Area type="monotone" dataKey="expense" fill="#AFC2FF" legendType="none" tooltipType="none" stroke="noStroke" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

