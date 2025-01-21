import React, {useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Tabs, Tab, Selection } from "@nextui-org/react";
import { SortDescriptor} from "@nextui-org/react";
import { fetchAllExpenses, fetchAllIncomes} from "../features/expenseIncomeTransactionSlice";
import { sortData } from "../Hendlers/Sort";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { HistoryTable } from "./HistoryTable";
import { dataForTable } from "../Components";
import { DataAllIncome } from "../api/expenseIncomeTransaction";
import { TopContent } from "./TableTopContent";


export const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const { allExpenses, allIncomes } = useAppSelector((state) => state.expenseIncomeTransaction);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "transactionDate", direction: "descending",});
  const [sorterFilter, setSorterFilter] = useState<Selection>("all");
  const [selectedTab, setSelectedTab] = useState<string>("Income"); 
  const [selectedIds, setSelectedIds] = useState("0")

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());

    if (selectedIds !== "0") {
      const filteredData: DataAllIncome = { ...dataForTable, page: page - 1 };
      filteredData.filterTransactionsDto = {
        ...filteredData.filterTransactionsDto,
        accountId: selectedIds.toString(),
      }
      dispatch(fetchAllIncomes(filteredData))
      dispatch(fetchAllExpenses(filteredData))
    }  else if (selectedIds === "0") {

      dispatch(fetchAllExpenses({ ...dataForTable, page: page - 1 }))
      dispatch(fetchAllIncomes({ ...dataForTable, page: page - 1 }))
    }

  }, [dispatch, selectedTab, selectedIds, page]);

  // @ts-ignore
  const sortedIncomes = sortData(allIncomes?.transactionsPageDtoList || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);
  // @ts-ignore
  const sortedExpenses = sortData(allExpenses?.transactionsPageDtoList || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);

  return (
    <div className="font-sans">
      <Tabs 
        aria-label="Disabled Options" 
        size="md"
        color="primary"
        selectedKey={selectedTab} 
        onSelectionChange={(key) => setSelectedTab(String(key))}        
      >
        <Tab key="Income" title="Income">
          <HistoryTable 
            topContent={<TopContent
                          selectedTab={selectedTab}
                          sorterFilter={sorterFilter}
                          setSorterFilter={setSorterFilter}
                          setSelectedIds={setSelectedIds}
            />}
            sortedData={ sortedIncomes}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            setPage={setPage}
            page={page}
            selectedTab={selectedTab}
          />
        </Tab>
        <Tab key="Expence" title="Expence">
          <HistoryTable 
            topContent={<TopContent
                          selectedTab={selectedTab}
                          sorterFilter={sorterFilter}
                          setSorterFilter={setSorterFilter}
                          setSelectedIds={setSelectedIds}
                        />} 
            sortedData={sortedExpenses} 
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
            setPage={setPage}
            page={page}
            selectedTab={selectedTab}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
