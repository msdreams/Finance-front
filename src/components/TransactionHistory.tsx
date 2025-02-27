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
import { fetchGetAllTransfers } from "../features/accountSlice";
import { HistoryTransfersTable } from "./HistoryTransfersTable";
import { useMediaQuery } from "react-responsive";
import { BsTable } from "react-icons/bs";


export const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const { allExpenses, allIncomes } = useAppSelector((state) => state.expenseIncomeTransaction);
  const { allTransfers } = useAppSelector((state) => state.account)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "transactionDate", direction: "descending",});
  const [sorterFilter, setSorterFilter] = useState<Selection>("all");
  const [selectedTab, setSelectedTab] = useState<string>("Income"); 
  const [selectedIds, setSelectedIds] = useState("0")
  const [page, setPage] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
      dispatch(fetchGetAllTransfers({ ...dataForTable, page: page - 1 }));
    }

  }, [dispatch, selectedTab, selectedIds, page]);

  const filteredCategoryExpense = React.useCallback(() => {
    if (allExpenses) {
      return allExpenses.transactionsPageDtoList.map(t => 
        t.categoryName === "Target Replenishment" 
        ? { ...t, categoryName: `Target ${t.comment}` } 
        : t
       )
    } return [];
  }, [allExpenses])

  // @ts-ignore
  const sortedIncomes = sortData(allIncomes?.transactionsPageDtoList || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);
  // @ts-ignore
  const sortedExpenses = sortData(filteredCategoryExpense(), sortDescriptor.column, sortDescriptor.direction, sorterFilter);
  
  const sortedTransfers = allTransfers?.transactionsPageDtoList  || [];

  return (
    <div className="font-sans p-4 pt-6 lg:px-8">
      <Tabs 
                  {...(isMobile ? { fullWidth: true } : {})}
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
            totalPages={allIncomes?.totalPages || 2}
          />
        </Tab>
        <Tab key="Expense" title="Expense">
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
            totalPages={allExpenses?.totalPages || 1}
          />
        </Tab>
        <Tab key="Transfers" title="Transfers">
          {allTransfers && sortedTransfers.length > 0 ? (
            <HistoryTransfersTable 
              topContent={<div className="h-[40px]" />} 
              sortedData={sortedTransfers} 
              sortDescriptor={sortDescriptor}
              setSortDescriptor={setSortDescriptor}
              setPage={setPage}
              page={page}
              selectedTab={selectedTab}
              totalPages={allTransfers.totalPages}
            />
          ) : (
            <div className="flex flex-row gap-2 text-white items-center justify-center w-full min-h-[400px] border rounded-lg">
              <BsTable size={60} /> <p> There is no Data yet</p>
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};
