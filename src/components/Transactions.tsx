import {Tabs, Tab} from "@nextui-org/react";
import { FormMoneyTransfer } from "./FormMoneyTransfer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { Account } from "../types/account";

type Props = {
  selectedAccount: Account,
  setAccount: (value: Account) => void;
}

export const Transactions: React.FC<Props> = ({selectedAccount, setAccount }) => {
  const dispatch = useAppDispatch();
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
  }, [dispatch]);
  
  return (
    <Tabs aria-label="Options" color="primary" radius="full" size="md">
      <Tab key="Add Income" title="Add Income">
        <FormMoneyTransfer
              selectedAccount={selectedAccount}
              category={incomeCategoryAll}
              setAccount={setAccount}
          />
      </Tab>
      <Tab key="Add Expense" title="Add Expense">
        <FormMoneyTransfer
              selectedAccount={selectedAccount}
              category={expenseCategoryAll}
              setAccount={setAccount}
          />
      </Tab>
    </Tabs>
  )
}