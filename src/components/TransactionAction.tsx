import {Tabs, Tab} from "@nextui-org/react";
import { FormMoneyTransfer } from "./FormMoneyTransfer";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { Account } from "../types/account";
import { FormTargetTransfer } from "./FormTargetTransfer";
import { useMediaQuery } from "react-responsive";

type Props = {
  selectedAccount: Account,
  setAccount: (value: Account) => void;
}

export const TransactionAction: React.FC<Props> = ({selectedAccount, setAccount }) => {
  const dispatch = useAppDispatch();
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector((state) => state.expenseIncomeCategory);
  const selected = selectedAccount!
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const [selectedTab, setSelectedTab] = useState<string>("Add Income"); 

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
  }, [dispatch]);

  return (
    <Tabs 
      fullWidth
      className="animate-fadeIn "
      aria-label="Options"
      color="primary"
      size={isMobile ? "sm" : "md"}
      classNames={{
        tabList: "gap-0 w-full relative mx-1",
      }}
      onSelectionChange={(key) => setSelectedTab(String(key))}
    >
      <Tab className="pl-1 pr-1" key="Add Income" title="Add Income">
        <FormMoneyTransfer
          selectedAccount={selected}
          category={incomeCategoryAll.filter(c => c.name !== "Target Deletion")}
          selectedTab={selectedTab}
          setAccount={setAccount}
          />
      </Tab>
      <Tab className="pl-1 pr-1" key="Add Expense" title="Add Expense">
        <FormMoneyTransfer
          selectedAccount={selected}
          category={expenseCategoryAll.filter(c => c.name !== "Target Replenishment")}
          selectedTab={selectedTab}
          setAccount={setAccount}
          />
      </Tab>
      <Tab className="pl-1 pr-1" key="Top up Target" title="Top up Target">
        <FormTargetTransfer
            selectedAccount={selected}
        />
      </Tab>
    </Tabs>
  )
}