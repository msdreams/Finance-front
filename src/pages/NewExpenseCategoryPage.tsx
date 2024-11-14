import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchExpenseAddCategory } from "../features/expenseIncomeCategorySlice";
import { DataName } from "../api/expenseIncomeCategory";

export const NewExpenseCategoryPage = () => {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const regIncome = (data: DataName) => {
    try {
      const response = dispatch(fetchExpenseAddCategory(data));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name,
    };

    regIncome(formData);
  };

  return (
    <>
      <h1>New Expense Category Page</h1>
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

        <button className="new-target__button" type="submit">
          Save
        </button>
      </form>
    </>
  );
};
