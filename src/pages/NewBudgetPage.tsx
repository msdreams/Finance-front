import { useEffect, useState } from "react";
import { DataAddBudget } from "../api/budget";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AddBudget } from "../features/budgetSlice";
import { ExpenseGetAllCategories } from "../features/expenseIncomeCategorySlice";

export const NewBudgetPage = () => {
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [limitSum, setLimitSum] = useState("");

  const { expenseCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );

  const dispatch = useAppDispatch();
  const regBudget = (data: DataAddBudget) => {
    try {
      const response = dispatch(AddBudget(data));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedExpectedSum = parseFloat(categoryId);
    if (isNaN(parsedExpectedSum)) {
      console.error("Expected Sum is not a valid number");
      return;
    }

    const formData = {
      name,
      fromDate,
      toDate,
      categoryId: parsedExpectedSum,
      limitSum,
    };

    regBudget(formData);
  };

  const allCategoriesExpense = async () => {
    try {
      const response = await dispatch(ExpenseGetAllCategories());
      setCategoryId(expenseCategoryAll && expenseCategoryAll.length > 0 ? expenseCategoryAll[0].id.toString() : "");
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    allCategoriesExpense();
  }, [dispatch]);

  return (
    <>
      <h1>New budget</h1>
      <div className="triangle-bg"></div>
      <div className="triangle-bg-up"></div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="new-target__input-name"
          placeholder="Enter budget name"
          type="text"
        />
        <input
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="new-target__input-name"
          placeholder="Start date (YYYY-MM-DD)"
          type="date" // Тип для даты
        />
        <input
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="new-target__input-name"
          placeholder="End date (YYYY-MM-DD)"
          type="date"
        />
        <select
          className="new-target__input-name"
          name="new-target__input-name"
          id="new-target__input-name"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)} 
        >
          {expenseCategoryAll?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          value={limitSum}
          onChange={(e) => setLimitSum(e.target.value)}
          className="new-target__input-name"
          placeholder="Enter budget limit sum"
          type="text"
        />

        <button className="new-target__button" type="submit">
          Save
        </button>
      </form>
    </>
  );
};
