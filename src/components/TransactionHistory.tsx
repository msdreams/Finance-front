import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Tabs, Tab, Selection } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { SortDescriptor, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { fetchAllExpenses, fetchAllIncomes, fetchAllIncomesForChartsDays} from "../features/expenseIncomeTransactionSlice";
import { sortData } from "../Hendlers/Sort";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";
import { HistoryTable } from "./HistoryTable";
import { parseDate } from "@internationalized/date";
import type {RangeValue} from "@react-types/shared";
import type {DateValue} from "@react-types/datepicker";

export const TransactionHistory = () => {
  const dispatch = useAppDispatch();
  const { allExpenses, allIncomes, allIncomesD } = useAppSelector((state) => state.expenseIncomeTransaction);
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector((state) => state.expenseIncomeCategory);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({ column: "transactionDate", direction: "ascending",});
  const [sorterFilter, setSorterFilter] = useState<Selection>("all");
  const [selectedTab, setSelectedTab] = useState<string>("Income"); 
  const [value, setValue] = React.useState<RangeValue<DateValue> | null>({
    start: parseDate(
      new Date(new Date().setDate(new Date().getDate() - 92)).toISOString().split("T")[0]
    ),
    end: parseDate(new Date().toISOString().split("T")[0]),
  });

  console.log(value)

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
    if (value) {
      dispatch(fetchAllExpenses({
          fromDate: value.start.toString(),
          toDate: value.end.toString(),
      }));

      dispatch(fetchAllIncomes({
        fromDate: value.start.toString(),
        toDate: value.end.toString(),
    }));
    }
  }, [dispatch]);

  const categories = useCallback(() => {
    if (selectedTab === "Income") {
      return incomeCategoryAll;
    }
    return expenseCategoryAll;
  }, [selectedTab, incomeCategoryAll, expenseCategoryAll]);
  
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col md:flex-row gap-4 md:justify-between">
        <Dropdown>
          <DropdownTrigger className=" sm:flex">
            <Button
              size="sm"
              variant="flat"
            >
              Categories
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
              <DropdownItem key={status.id} className="capitalize">
                {status.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

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
  }, [sorterFilter, categories, value, setValue])
// @ts-ignore
  const sortedIncomes = sortData(allIncomes || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);
  // @ts-ignore
  const sortedExpenses = sortData(allExpenses || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);

  return (
    <Tabs 
      aria-label="Disabled Options" 
      size="md"
       variant="light" 
      selectedKey={selectedTab} 
      onSelectionChange={(key) => setSelectedTab(String(key))}
    >
      <Tab key="Income" title="Income" >
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
  );
};
