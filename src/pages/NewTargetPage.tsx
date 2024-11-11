import { useState } from "react";
import { DataAddTarget } from "../api/target";
import { AddTarget } from "../features/targetSlice";
import { useAppDispatch } from "../app/hooks";

export const NewTargetPage = () => {
  const [name, setName] = useState("");
  const [expectedSum, setExpectedSum] = useState("");
  const [achievedBefore, setAchievedBefore] = useState("");
  const [currency, setCurrency] = useState("");
  const dispatch = useAppDispatch();

  const regTarget = (data: DataAddTarget) => {
    try {
      const response = dispatch(AddTarget(data));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedExpectedSum = parseFloat(expectedSum);
    if (isNaN(parsedExpectedSum)) {
      console.error("Expected Sum is not a valid number");
      return;
    }

    const formData: DataAddTarget = {
      name,
      expectedSum: parsedExpectedSum,
      achievedBefore,
      currency,
    };

    regTarget(formData);
  };

  return (
    <>
      <h1>New target</h1>
      <div className="triangle-bg"></div>
      <div className="triangle-bg-up"></div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="new-target__input-name"
          placeholder="name"
          type="text"
        />
        <input
          onChange={(e) => setExpectedSum(e.target.value)}
          value={expectedSum}
          className="new-target__input-name"
          placeholder="expectedSum"
          type="text"
        />
        <input
          onChange={(e) => setAchievedBefore(e.target.value)}
          value={achievedBefore}
          className="new-target__input-name"
          placeholder="achievedBefore"
          type='date'
        />
        <input
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
          className="new-target__input-name"
          placeholder="currency"
          type="text"
        />

        <button className="new-target__button" type="submit">
          Save
        </button>
      </form>
    </>
  );
};
