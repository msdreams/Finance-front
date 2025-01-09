import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { fetchIncomeAddCategory } from "../features/expenseIncomeCategorySlice";
import { DataName } from "../api/expenseIncomeCategory";

export const NewIncomeCategoryPage = () => {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const regIncome = (data: DataName) => {
    try {
      const response = dispatch(fetchIncomeAddCategory(data));
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
    <div className="mt-60">
      <h1>New Income Category Page</h1>
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
    </div>
  );
};
