import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis,  Tooltip, ResponsiveContainer } from "recharts";
import { useEffect } from "react";
import { fetchAllExpensesForChartsMY, fetchAllIncomesForChartsMY } from "../../features/expenseIncomeTransactionSlice";
import { filteredAreaData } from "../../Hendlers/FilterAreaData";

export const AllSpendingChart = () => {
  const dispatch = useAppDispatch();
  const accountDefault = useAppSelector((state) => state.account.accountDefault)
  const { allExpensesMY, allIncomesMY } = useAppSelector((state) => state.expenseIncomeTransaction);

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
    <div>
      <AreaChart width={500} height={400} data={filteredData}>
      <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        <Area type="monotone" stackId="1" dataKey="income" fill="#2845DB" />
        <Area type="monotone" stackId="1" dataKey="expense"fill="#04724D" />
        </AreaChart>
    </div>
  )
}
