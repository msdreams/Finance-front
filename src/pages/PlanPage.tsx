import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { DeleteTarget, GetAllTargets } from "../features/targetSlice";
import {
  DeleteBudget,
  GetAllBudgets,
  GetTopLvlBudget,
} from "../features/budgetSlice";
import { DataDeleteTarget } from "../api/target";
import { fetchGetAllAccounts } from "../features/accountSlice";

export const PlanPage = () => {
  const { targets } = useAppSelector((state) => state.target); // Получаем данные из Redux
  const { budgets, budget } = useAppSelector((state) => state.budget); // Получаем данные из Redux
  const { allAccounts } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();

  const [modalDelete, setModalDelete] = useState<string | null>(null); // Храним id удаляемой цели
  const [modalTargetPlus, setModalTargetPlus] = useState(false);

  const [accountId, setAccountId] = useState<number>(0);

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

  const deleteTarget = async (data: DataDeleteTarget) => {
    await dispatch(DeleteTarget(data));
    await dispatch(GetAllTargets());
    setModalDelete(null); // Закрыть модальное окно после удаления
  };

  const getallAccounts = () => {
    dispatch(fetchGetAllAccounts());
  };

  const getTopLvlBudget = () => {
    dispatch(GetTopLvlBudget());
  };

  useEffect(() => {
    regTarget();
    regBudget();
    getallAccounts();
    getTopLvlBudget();
  }, [dispatch]);

  useEffect(() => {
    getallAccounts();
    setAccountId(allAccounts ? allAccounts[0].id : 0);
  }, [modalDelete]);

  const handleDeleteTarget = (data: DataDeleteTarget) => {
    deleteTarget(data);
  };

  const deleteBudget = async (id: number) => {
    await dispatch(DeleteBudget(id.toString())); // Преобразуем id в строку, если DeleteBudget ожидает строку
    await dispatch(GetAllBudgets());
  };
  return (
    <div className="h-screen mt-36">
      <h1>PlanPage</h1>

      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <h2>Target</h2>
        <Link to="/new-target">+</Link>
      </div>
      {targets && targets.length > 0 ? (
        targets.map((el) => (
          <div className="el-target" key={el.name + el.id}>
            <div className="target__block">
              {modalDelete && modalDelete === el.id.toString() ? (
                <>
                  <h2
                    onClick={() => {
                      setModalDelete(null); // Закрыть модальное окно
                    }}
                    style={{ margin: "0", cursor: "pointer" }}
                  >
                    ×
                  </h2>
                  <form
                    style={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: "10px",
                    }}
                    onSubmit={(e) => {
                      e.preventDefault(); // Prevent default form submission
                      handleDeleteTarget({ targetId: el.id, accountId }); // Call your delete function with necessary data
                    }}
                  >
                    <select
                      value={accountId}
                      onChange={(e) => setAccountId(+e.target.value)}
                    >
                      {allAccounts?.map((account) => (
                        <option key={account.id} value={account.id}>
                          {account.name}
                        </option>
                      ))}
                    </select>

                    <button type="submit">
                      <img
                        style={{
                          width: "48px",
                          height: "48px",
                          cursor: "pointer",
                        }}
                        src="./img/free-icon-bin-839571.png"
                        alt=""
                      />
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div>
                    <h3 className="target__block-h">{el.name}</h3>
                    <p className="target__block-price">{el.expectedSum}$</p>
                  </div>

                  <div>
                    <p className="target__block-price">{el.expectedSum}$</p>
                    <h2 className="target__block-h">{el.currentSum}</h2>
                  </div>

                  <img
                    src="./img/free-icon-bin-839571.png"
                    alt=""
                    className="delete-target-img"
                    onClick={() => {
                      setModalDelete(el.id.toString()); // Открыть модальное окно для выбранного элемента
                    }}
                  />
                </>
              )}
            </div>

            <img
              onClick={() => setModalTargetPlus(!modalTargetPlus)}
              className="target__block-plus"
              src="./img/Group 21.svg"
              alt=""
            />
          </div>
        ))
      ) : (
        <p>No targets available.</p>
      )}

      <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
        <h2>Budget</h2>
        <Link to="/new-budget">+</Link>
      </div>
      {budget && budget !== null && (
        <div key={budget.name + budget.id}>
          <div className="history__block">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <h2 className="history__block-h">{budget.name}</h2>
            </div>

            <p className="history__block-price">{budget.limitSum}$</p>
          </div>
        </div>
      )}
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

              <img
                src="./img/free-icon-bin-839571.png"
                alt=""
                className="delete-target-img"
                onClick={() => {deleteBudget(el.id)}}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No budgets available.</p>
      )}
    </div>
  );
};
