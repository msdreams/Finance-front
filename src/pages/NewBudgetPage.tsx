import { useState } from "react";
import { DataAddBudget } from "../api/budget";
import { useAppDispatch } from "../app/hooks";
import { AddBudget } from "../features/budgetSlice";

export const NewBudgetPage = () => {
  const [name, setName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [categoryIds, setCategoryIds] = useState('');
  const [limitSum, setLimitSum] = useState("");

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

    const formData = {
      name,
      fromDate,
      toDate,
      categoryIds,
      limitSum,
    };

    regBudget(formData);
  };

  // name: string;
  // fromDate: string;
  // toDate: string;
  // categoryIds: number[];
  // limitSum: string;
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
           type="date"  // Тип для даты
        />
        <input
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="new-target__input-name"
          placeholder="End date (YYYY-MM-DD)"
          type="date"
        />
        <input
          value={categoryIds}
          onChange={(e) => setCategoryIds(e.target.value)}
          className="new-target__input-name"
          placeholder="name"
          type="text"
        />

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
