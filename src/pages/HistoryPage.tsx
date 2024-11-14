import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAllExpenses,
  fetchAllIncomes,
} from "../features/expenseIncomeTransactionSlice";

export const HistoryPage = () => {
  const dispatch = useAppDispatch();
  const { allExpenses, allIncomes } = useAppSelector(
    (state) => state.expenseIncomeTransaction
  );

  useEffect(() => {
    dispatch(fetchAllIncomes());
    dispatch(fetchAllExpenses());
  }, [dispatch]);

  return (
    <>
      <h1>History Page</h1>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h2>Incomes</h2>
          {allIncomes && allIncomes.length > 0 ? (
            allIncomes.map((el, index) => (
              <div key={index} className="history__block">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <h3 className="history__block-h">
                    Category: {el.categoryId}
                  </h3>
                </div>
                <p className="history__block-price">{el.amount}$</p>
              </div>
            ))
          ) : (
            <p>No incomes available</p>
          )}
        </div>

        <div>
          <h2>Expenses</h2>
          {allExpenses && allExpenses.length > 0 ? (
            allExpenses.map((el, index) => (
              <div key={index} className="history__block">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "10px",
                  }}
                >
                  <h3 className="history__block-h">
                    Category: {el.categoryId}
                  </h3>
                </div>
                <p className="history__block-price">{el.amount}$</p>
              </div>
            ))
          ) : (
            <p>No expenses available</p>
          )}
        </div>
      </div>
    </>
  );
};
