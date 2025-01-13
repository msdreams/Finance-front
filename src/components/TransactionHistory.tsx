import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Tabs, Tab, Selection } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { SortDescriptor, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { fetchAllExpenses, fetchAllIncomes} from "../features/expenseIncomeTransactionSlice";
import { sortData } from "../Hendlers/Sort";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { HistoryTable } from "./HistoryTable";
import { parseDate } from "@internationalized/date";
import type {RangeValue} from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { Account } from "../types/account";
import { FilterBalance } from "../Hendlers/FilterBalance";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { dataForTable } from "../Components";


export const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const isAccountLoading = useSelector((state: RootState) => state.account.loading);
  const { allExpenses, allIncomes, loading } = useAppSelector((state) => state.expenseIncomeTransaction);
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector((state) => state.expenseIncomeCategory);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "transactionDate", direction: "descending",});
  const [sorterFilter, setSorterFilter] = useState<Selection>("all");
  const [sorterFilter2, setSorterFilter2] = useState<Selection>("all");
  const [selectedTab, setSelectedTab] = useState<string>("Income"); 
  const [value, setValue] = React.useState<RangeValue<DateValue> | null>({
    start: parseDate(
      new Date(new Date().setDate(new Date().getDate() - 92)).toISOString().split("T")[0]
    ),
    end: parseDate(new Date().toISOString().split("T")[0]),
  });

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
    dispatch(fetchAllExpenses(dataForTable))
    dispatch(fetchAllIncomes(dataForTable))
  }, [dispatch, selectedTab]);


  const categories = useCallback(() => {
    if (selectedTab === "Income") {
      return incomeCategoryAll;
    }
    return expenseCategoryAll;
  }, [selectedTab, incomeCategoryAll, expenseCategoryAll]);

// @ts-ignore
  const sortedIncomes = sortData(allIncomes || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter, sorterFilter2);
  // @ts-ignore
  const sortedExpenses = sortData(allExpenses || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter, sorterFilter2);

  const transactions = useCallback(() => {
    if (selectedTab === "Income") {
      return FilterBalance(sortedIncomes, "Income:");
    }
    return FilterBalance(sortedExpenses, "Expence:")
  }, [selectedTab, sortedExpenses, sortedIncomes]);  

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col md:flex-row gap-4 md:justify-between">
        <div>
          <div className="text-default-600 text-base pr-4">{
            transactions()}</div>
          <div className="flex flex-row gap-4 items-center">
            <Dropdown>
              <DropdownTrigger className=" sm:flex">
                <Button
                  size="sm"
                  variant="solid"
                  className="bg-primary-400 "
                >
                  CATEGORIES
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={sorterFilter}
                selectionMode="multiple"
                onSelectionChange={setSorterFilter}

              >
                {categories().map((status) => (
                  <DropdownItem key={status.id} className="capitalize font-sans">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  size="sm"
                  variant="solid"
                  color="warning"
                >
                  ACCOUNTS
                </Button>
              </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={sorterFilter2}
                  selectionMode="single"
                  onSelectionChange={setSorterFilter2}

              >
                
                    {isAccountLoading || !allAccounts ? (
                      <div className="capitalize font-sans" >
                        Loading...
                      </div>
                ) : (
                    allAccounts.map((account) => (
                        <DropdownItem key={account.id} className="capitalize font-sans">
                          {account.name}
                        </DropdownItem>
                      ))
                )}
                
                </DropdownMenu>
            </Dropdown>

          </div>
        </div>
        <DateRangePicker
          value={value}
          onChange={setValue}
          className="max-w-xs"
          label="Time Range"
          variant="flat"
          selectorButtonPlacement="start"
          defaultValue={{
            start: parseDate("2024-04-01"),
            end: parseDate("2024-04-08"),
          }}
        />
      </div>
    )
  }, [sorterFilter, 
      categories, 
      value, 
      setValue, 
      sorterFilter2, 
      transactions, 
    allAccounts,
    isAccountLoading
    ])

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
            topContent={topContent} 
            sortedData={ sortedIncomes} 
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
          />
        </Tab>
        <Tab key="Expence" title="Expence">
          <HistoryTable 
            topContent={topContent} 
            sortedData={sortedExpenses} 
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
          />
        </Tab>
      </Tabs>
    </div>
  );
};
