import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { DataAddAccount } from "../api/account";
import { AddAccount } from "../features/accountSlice";

export const NewAccountPage = () => {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");

  const dispatch = useAppDispatch();
  const regAccount = (data: DataAddAccount) => {
    try {
      const response = dispatch(AddAccount(data));
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsedBalance = parseFloat(balance);
    if (isNaN(parsedBalance)) {
      console.error("Expected Sum is not a valid number");
      return;
    }

    const formData = {
      name,
      balance: parsedBalance,
      currency,
    };

    regAccount(formData);
  };

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
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          className="new-target__input-name"
          placeholder="balance"
          type="number" // Тип для даты
        />
        <input
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
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
