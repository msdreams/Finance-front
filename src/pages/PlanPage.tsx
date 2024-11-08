import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetAllTargets } from "../features/targetSlice";
import { GetAllBudgets } from "../features/budgetSlice";

export const PlanPage = () => {
  const { targets } = useAppSelector((state) => state.target); // Получаем данные из Redux
  const { budgets } = useAppSelector((state) => state.budget); // Получаем данные из Redux
  const dispatch = useAppDispatch();

  const regTarget = async () => {
    try {
      const response = await dispatch(GetAllTargets());
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const regBudget = async () => {
    try {
      const response = await dispatch(GetAllBudgets());
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    regTarget();
    regBudget();
  }, [dispatch]);

  return (
    <>
      <h1>PlanPage</h1>

      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <h2>Target</h2>
        <Link to="/new-target">+</Link>
      </div>
      {targets && targets.length > 0 ? (
        targets.map((el) => (
          <div key={el.name + el.id}>
            <div className="target__block">
              <div>
                <h3 className="target__block-h">{el.name}</h3>
                <p className="target__block-price">{el.expectedSum}$</p>
              </div>

              <div>
                <p className="target__block-price">{el.expectedSum}$</p>
                <h2 className="target__block-h">{el.currentSum}</h2>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No targets available.</p>
      )}

      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <h2>Budget</h2>
        <Link to="/new-budget">+</Link>
      </div>
      {budgets && budgets.length > 0 ? (
        budgets.map((el) => (
          <div key={el.name + el.id}>
            <div className="history__block">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <h2 className="history__block-h">{el.name}</h2>
              </div>

              <p className="history__block-price">{el.limitSum}$</p>
            </div>
          </div>
        ))
      ) : (
        <p>No targets available.</p>
      )}
    </>
  );
};
