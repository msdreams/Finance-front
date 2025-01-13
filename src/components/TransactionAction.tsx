import {Tabs, Tab} from "@nextui-org/react";
import { FormMoneyTransfer } from "./FormMoneyTransfer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { Account } from "../types/account";

type Props = {
  selectedAccount: Account | null,
  setAccount: (value: Account) => void;
}

export const TransactionAction: React.FC<Props> = ({selectedAccount, setAccount }) => {
  const dispatch = useAppDispatch();
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );
  const selected= selectedAccount!

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
  }, [dispatch]);
  
  return (
    <Tabs className="animate-fadeIn" aria-label="Options" color="primary" size="md">
      <Tab key="Add Income" title="Add Income">
        <FormMoneyTransfer
              selectedAccount={selected}
              category={incomeCategoryAll}
              setAccount={setAccount}
          />
      </Tab>
      <Tab key="Add Expense" title="Add Expense">
        <FormMoneyTransfer
              selectedAccount={selected}
              category={expenseCategoryAll}
              setAccount={setAccount}
          />
      </Tab>
    </Tabs>
  )
}