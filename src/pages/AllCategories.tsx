import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ExpenseDeleteCategory,
  ExpenseGetAllCategories,
  IncomeDeleteCategory,
  IncomeGetAllCategories,
} from "../features/expenseIncomeCategorySlice";
import { Link } from "react-router-dom";

export const AllCategories = () => {
  const dispatch = useAppDispatch();
  const { incomeCategoryAll, expenseCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
  }, [dispatch]);

  const deleteIncome = (id: string) => {
    dispatch(IncomeDeleteCategory(id));
  };
  const deleteExpense = (id: string) => {
    dispatch(ExpenseDeleteCategory(id));
  };
  return (
    <>
      <h1>All categories Page</h1>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "10px",
            }}
          >
            <h2>Incomes</h2>
            <Link to="/new-income-category">+</Link>
          </div>

          {incomeCategoryAll && incomeCategoryAll.length > 0 ? (
            incomeCategoryAll.map((el, index) => (
              <div
                key={el.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <div key={index} className="history__block">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                    }}
                  >
                    <h3 className="history__block-h">Category: {el.id}</h3>
                  </div>
                  <p className="history__block-price">{el.name}</p>
                </div>
                <img
                  onClick={() => deleteIncome(el.id.toString())}
                  style={{
                    width: "48px",
                    height: "48px",
                    cursor: "pointer",
                  }}
                  src="./img/free-icon-bin-839571.png"
                  alt=""
                />
              </div>
            ))
          ) : (
            <p>No incomes available</p>
          )}
        </div>

        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              columnGap: "10px",
            }}
          >
            {" "}
            <h2>Expenses</h2>
            <Link to="/new-expense-category">+</Link>
          </div>
          {expenseCategoryAll && expenseCategoryAll.length > 0 ? (
            expenseCategoryAll.map((el, index) => (
              <div
                key={el.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <div key={index} className="history__block">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "10px",
                    }}
                  >
                    <h3 className="history__block-h">Category: {el.id}</h3>
                  </div>
                  <p className="history__block-price">{el.name}</p>
                </div>
                <img
                  onClick={() => deleteExpense(el.id.toString())}
                  style={{
                    width: "48px",
                    height: "48px",
                    cursor: "pointer",
                  }}
                  src="./img/free-icon-bin-839571.png"
                  alt=""
                />
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
