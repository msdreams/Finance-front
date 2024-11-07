import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetAllTargets } from "../features/targetSlice";

export const PlanPage = () => {
  const { targets } = useAppSelector((state) => state.target); // Получаем данные из Redux
  const dispatch = useAppDispatch();

  const regTarget = async () => {
    try {
      const response = await dispatch(GetAllTargets());
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    regTarget();
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
          <div key={el.name + el.id} className="history__block">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <h2 className="history__block-h">{el.name}</h2>
            </div>

            <p className="history__block-price">{el.expectedSum}$</p>
          </div>
        ))
      ) : (
        <p>No targets available.</p>
      )}

      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <h2>Budget</h2>
        <Link to="/new-budget">+</Link>
      </div>
    </>
  );
};
