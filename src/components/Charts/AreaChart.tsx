import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis,  Tooltip, ResponsiveContainer,ComposedChart,TooltipProps, Bar, Legend, Line } from "recharts";
import { useEffect } from "react";
import { fetchAllExpensesForChartsMY, fetchAllIncomesForChartsMY } from "../../features/expenseIncomeTransactionSlice";
import { filteredAreaData } from "../../Hendlers/FilterAreaData";

    // @ts-ignore

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="p-2 bg-gray-700 flex flex-col gap-4 rounded-md">
            <p className="text-medium">Date: {label}</p>
            <p className="text-sm text-primary-300">
              Income:&nbsp;
              <span>
                {payload[0].value}
              </span>
            </p>
            <p className="text-sm text-secondary-300">
              Expence:&nbsp;
              <span>
                {payload[1].value}
              </span>
            </p>
    
          </div>
        )
      }
    }

export const AllSpendingChart = () => {
  const dispatch = useAppDispatch();
  const accountDefault = useAppSelector((state) => state.account.accountDefault)
  const { allExpensesMY, allIncomesMY } = useAppSelector((state) => state.expenseIncomeTransaction);
  console.log(allExpensesMY)

useEffect(() => {
  dispatch(fetchAllIncomesForChartsMY(
    {
      "accountId": accountDefault?.id || 1,
      "filterType": "MONTH"
    }))
    dispatch(fetchAllExpensesForChartsMY(
      {
        "accountId": accountDefault?.id || 1,
        "filterType": "MONTH"
      }))
}, [accountDefault, dispatch]);
  
  const filteredData = filteredAreaData(allIncomesMY, allExpensesMY)
  console.log(filteredData)

  return (
    <div style={{ width: '100%', height: 370 }}>
      <ResponsiveContainer>
      <ComposedChart
        data={filteredData}
        margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
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
          <Area type="monotone"  dataKey="income" fill="#59D493" legendType="none" tooltipType="none"/>
          <Area type="monotone"  dataKey="expense" fill="#AFC2FF" legendType="none" tooltipType="none"/>
          <Line type="monotone"  dataKey="income" stroke="#59D493" />
          <Line type="monotone" dataKey="expense" stroke="#AFC2FF" />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
  )
}

