import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Tabs, Tab } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import { SortDescriptor, Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,} from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Selection } from "@nextui-org/react";
import {
  fetchAllExpenses,
  fetchAllIncomes,
} from "../features/expenseIncomeTransactionSlice";
import { sortData } from "../Hendlers/Sort";
import { ExpenseGetAllCategories, IncomeGetAllCategories } from "../features/expenseIncomeCategorySlice";

export const HistoryTable = () => {
  const dispatch = useAppDispatch();
  const { allExpenses, allIncomes } = useAppSelector(
    (state) => state.expenseIncomeTransaction
  );
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "transactionDate",
    direction: "ascending",
  });
  const [sorterFilter, setSorterFilter] = useState<Selection>("all");
  const [selectedTab, setSelectedTab] = useState<string>("Income"); 

  useEffect(() => {
    dispatch(fetchAllIncomes());
    dispatch(fetchAllExpenses());
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
  }, [dispatch]);

  const categories = useCallback(() => {
    if (selectedTab === "Income") {
      return incomeCategoryAll;
    }
    return expenseCategoryAll;
  }, [selectedTab, incomeCategoryAll, expenseCategoryAll]);

  const columns = [
    {
      key: "amount",
      label: "AMOUNT",
      sortable: true,
    },
    {
      key: "currency",
      label: "CUR",
    },
    {
      key: "categoryId",
      label: "CATEGORY",
    },
    {
      key: "accountId",
      label: "ACCOUNT",
    },
    {
      key: "transactionDate",
      label: "DATE",
      sortable: true,
    },

  ];

// @ts-ignore
  const sortedIncomes = sortData(allIncomes || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);
  // @ts-ignore
  const sortedExpenses = sortData(allExpenses || [], sortDescriptor.column, sortDescriptor.direction, sorterFilter);

  const topContent = React.useMemo(() => {
    return (
        <div className="flex flex-row gap-4 justify-between sticky">
          <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
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

        <DateRangePicker className="max-w-xs" label="Time Range" variant="flat" />
        </div>
    )
  }, [sorterFilter, categories])

  return (
    <Tabs 
      aria-label="Disabled Options" 
      size="md"
       variant="light" 
      selectedKey={selectedTab} 
      onSelectionChange={(key) => setSelectedTab(String(key))}
    >
      <Tab key="Income" title="Income" >
        <Table
          isStriped
          isCompact
          isHeaderSticky
          aria-label="table with dynamic content"
          selectionMode="single"
          color="secondary"
          classNames={{
            base: "max-h-[400px] overflow-x-hidden overflow-y-scroll ",
            table: "min-h-[420px] ",
            wrapper: "bg-gray-200"
          }}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          topContent={topContent}
          topContentPlacement="inside"
        >
          <TableHeader>
            {columns.map((column) =>
              <TableColumn
                key={column.key}
                allowsSorting={column.sortable}
              >
                {column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {sortedIncomes.map((row) =>
              <TableRow key={row.id}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Tab>
      <Tab key="Expence" title="Expence">
        <Table
          isCompact
          isStriped
          isHeaderSticky
          aria-label="Example table with dynamic content"
          selectionMode="single"
          color="secondary"
          classNames={{
            base: "max-h-[400px] overflow-x-hidden overflow-y-scroll ",
            table: "min-h-[420px]",
            wrapper: "bg-gray-200",
          }}
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          topContent={topContent}
          topContentPlacement="inside"
        >
          <TableHeader>
            {columns.map((column) =>
              <TableColumn
                key={column.key}
                allowsSorting={column.sortable}
              >
                {column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {sortedExpenses.map((row) =>
              <TableRow key={row.id}>
                {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Tab>
    </Tabs>
  );
};
