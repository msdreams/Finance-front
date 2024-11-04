import classNames from "classnames";
import { useState } from "react";

export const AddTransaction = () => {
  const [modalIncome, setModalIncome] = useState(false);
  const [modalExpense, setModalExpense] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", columnGap: '10px' }}>
      <div className="transaction__button-div" style={{ position: "relative" }}>
        <button
          onClick={() => setModalIncome(!modalIncome)}
          className="transaction__button"
        >
          Add income
        </button>

        <form
          className={classNames({
            "add-transaction__income": !modalIncome,
            "add-transaction__income add-transaction__income-is-active":
              modalIncome,
          })}
        >
          <p>Category*</p>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Date:
            <input style={{ width: "50%" }} type="date" />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Comment:
            <textarea placeholder="Comment" style={{ width: "50%" }}></textarea>
          </label>

          <button className="button-s" type="submit">submit</button>
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
          className={classNames({
            "add-transaction__expense": !modalExpense,
            "add-transaction__expense add-transaction__expense-is-active":
              modalExpense,
          })}
        >
          {" "}
          <p>Category*</p>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Date:
            <input style={{ width: "50%" }} type="date" />
          </label>
          <label
            style={{ display: "flex", alignItems: "center", columnGap: "3px" }}
          >
            Comment:
            <textarea placeholder="Comment" style={{ width: "50%" }}></textarea>
          </label>

          <button className="button-s" type="submit">submit</button>

        </form>
      </div>
    </div>
  );
};
