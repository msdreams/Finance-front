import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ExpenseGetAllCategories,
  IncomeGetAllCategories,
} from "../features/expenseIncomeCategorySlice";
import {
  fetchTransactionsAddExpense,
  fetchTransactionsAddIncome,
} from "../features/expenseIncomeTransactionSlice";
import { fetchGetAllAccounts } from "../features/accountSlice";

export const AddTransaction = () => {
  const [modalIncome, setModalIncome] = useState(false);
  const [modalExpense, setModalExpense] = useState(false);

  const [formDataIncome, setFormDataIncome] = useState({
    comment: "",
    amount: 0,
    transactionDate: "",
    accountId: 0,
    categoryId: 0,
  });

  const [formDataExpense, setFormDataExpense] = useState({
    comment: "",
    amount: 0,
    transactionDate: "",
    accountId: 0,
    categoryId: 0,
  });

  const dispatch = useAppDispatch();
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );
  const { allAccounts } = useAppSelector((state) => state.account);

  const handleSubmitAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = dispatch(fetchTransactionsAddIncome(formDataIncome));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = dispatch(fetchTransactionsAddExpense(formDataExpense));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const allCategoriesExpense = () => {
    dispatch(ExpenseGetAllCategories());
  };

  const allCategoriesIncome = () => {
    dispatch(IncomeGetAllCategories());
  };

  const getallAccounts = () => {
    dispatch(fetchGetAllAccounts());
  };

  useEffect(() => {
    if (expenseCategoryAll && expenseCategoryAll.length > 0) {
      setFormDataExpense((prev) => ({
        ...prev,
        categoryId:
          prev.categoryId !== expenseCategoryAll[0].id
            ? expenseCategoryAll[0].id
            : prev.categoryId,
      }));
    }
  }, [expenseCategoryAll]);

  useEffect(() => {
    if (incomeCategoryAll && incomeCategoryAll.length > 0) {
      setFormDataIncome((prev) => ({
        ...prev,
        categoryId:
          prev.categoryId !== incomeCategoryAll[0].id
            ? incomeCategoryAll[0].id
            : prev.categoryId,
      }));
    }
  }, [incomeCategoryAll]);

  useEffect(() => {
    if (allAccounts && allAccounts?.length > 0) {
      setFormDataIncome((prev) => ({
        ...prev,
        accountId: allAccounts ? allAccounts[0].id : allAccounts,
      }));
      setFormDataExpense((prev) => ({
        ...prev,
        accountId: allAccounts[0].id,
      }));
    }
  }, [allAccounts]);

  useEffect(() => {
    console.log("Accounts are updated:", allAccounts);
  }, [allAccounts]);

  useEffect(() => {
    allCategoriesExpense();
    allCategoriesIncome();
    getallAccounts();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        columnGap: "10px",
      }}
    >
      <div className="transaction__button-div" style={{ position: "relative" }}>
        <button
          onClick={() => setModalIncome(!modalIncome)}
          className="transaction__button"
        >
          Add income
        </button>

        <form
          onSubmit={handleSubmitAddIncome}
          className={classNames({
            "add-transaction__income": !modalIncome,
            "add-transaction__income add-transaction__income-is-active":
              modalIncome,
          })}
        >
          <select
            value={formDataIncome.categoryId}
            onChange={(e) =>
              setFormDataIncome({
                ...formDataIncome,
                categoryId: parseInt(e.target.value, 10), // Обновляем categoryId
              })
            }
          >
            {incomeCategoryAll?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={formDataIncome.accountId}
            onChange={(e) =>
              setFormDataIncome({
                ...formDataIncome,
                accountId: parseInt(e.target.value, 10), // Обновляем categoryId
              })
            }
          >
            {allAccounts?.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Date:
            <input
              value={formDataIncome.transactionDate}
              onChange={(e) =>
                setFormDataIncome({
                  ...formDataIncome,
                  transactionDate: e.target.value,
                })
              }
              style={{ width: "50%" }}
              type="date"
            />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Amount:
            <input
              value={formDataIncome.amount}
              onChange={(e) =>
                setFormDataIncome({
                  ...formDataIncome,
                  amount: +e.target.value,
                })
              }
              style={{ width: "50%" }}
              type="number"
            />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Comment:
            <textarea
              value={formDataIncome.comment}
              onChange={(e) =>
                setFormDataIncome({
                  ...formDataIncome,
                  comment: e.target.value,
                })
              }
              placeholder="Comment"
              style={{ width: "50%" }}
            ></textarea>
          </label>

          <button className="button-s" type="submit">
            submit
          </button>
        </form>
      </div>
      <div className="transaction__button-div" style={{ position: "relative" }}>
        <button
          onClick={() => setModalExpense(!modalExpense)}
          className="transaction__button"
        >
          Add expense
        </button>

        <form
          onSubmit={handleSubmitAddExpense}
          className={classNames({
            "add-transaction__expense": !modalExpense,
            "add-transaction__expense add-transaction__expense-is-active":
              modalExpense,
          })}
        >
          <select
            value={formDataExpense.categoryId}
            onChange={(e) =>
              setFormDataExpense({
                ...formDataExpense,
                categoryId: +e.target.value,
              })
            }
          >
            {expenseCategoryAll?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Date:
            <input
              onChange={(e) =>
                setFormDataExpense({
                  ...formDataExpense,
                  transactionDate: e.target.value,
                })
              }
              value={formDataExpense.transactionDate}
              style={{ width: "50%" }}
              type="date"
            />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Amount:
            <input
              onChange={(e) =>
                setFormDataExpense({
                  ...formDataExpense,
                  amount: +e.target.value,
                })
              }
              value={formDataExpense.amount}
              style={{ width: "50%" }}
              type="number"
            />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Comment:
            <textarea
              onChange={(e) =>
                setFormDataExpense({
                  ...formDataExpense,
                  comment: e.target.value,
                })
              }
              value={formDataExpense.comment}
              placeholder="Comment"
              style={{ width: "50%" }}
            ></textarea>
          </label>
          <button className="button-s" type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};
