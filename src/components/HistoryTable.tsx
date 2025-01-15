import React from "react"
import { Table, Selection, TableHeader, TableColumn, TableBody,Tooltip, TableRow, TableCell, ChipProps, Chip, Pagination } from "@nextui-org/react";
import { Transaction } from "../types/expenseIncomeTransaction";
import { DeleteIcon, EditIcon, EyeIcon } from "../assets/SVG/svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchAllExpenses, fetchAllIncomes, fetchTransactionsDeleteExpense, fetchTransactionsDeleteIncome } from "../features/expenseIncomeTransactionSlice";
import { dataForTable } from "../Components";

type Props = {
  topContent: any;
  sortedData: Transaction[];
  setSortDescriptor: any;
  sortDescriptor: any;
  setPage: (value: number) => void;
  page: number;
  selectedTab: string;
}

export const HistoryTable: React.FC<Props> = ({selectedTab, topContent, sortedData, setSortDescriptor, sortDescriptor, setPage, page}) => {
  const totalPages = 10;
  const dispatch = useAppDispatch();

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));

  const columns = [
    {
      key: "transactionDate",
      label: "DATE",
      sortable: true,
    },
    {
      key: "categoryName",
      label: "CATEGORY",
      sortable: true,
    },
    {
      key: "accountName",
      label: "ACCOUNT",
      sortable: true,
    },
    {
      key: "amount",
      label: "AMOUNT",
      sortable: true,
    },
    {
      key: "currency",
      label: "CUR",
      sortable: true,
    },
    {
      key: "actions",
      label: "ACTIONS",
    },
  ];

  const handleDelete = React.useCallback((transactionId: string) => {
    if (selectedTab === "Income") {
      dispatch(fetchTransactionsDeleteIncome(transactionId));
      dispatch(fetchAllIncomes({ ...dataForTable, page: page - 1 }))
    } else {
      dispatch(fetchTransactionsDeleteExpense(transactionId));
      dispatch(fetchAllExpenses({ ...dataForTable, page: page - 1 }))
    }
  }, [dispatch, selectedTab, page])

  const renderCell = React.useCallback((MoneyTransfer: Transaction, columnKey: React.Key) => {
    const cellValue = MoneyTransfer[columnKey as keyof Transaction];
    const statusColorMap: Record<string, ChipProps["color"]> = {
      "Salary": "warning",
      "Freelance": "success",
      "Investments": "danger",
      "Rental Income": "primary",
      "Other": "secondary",
      "Utilities": "warning",
      "Groceries": "success",
      "Transportation": "danger",
      "Entertainment": "primary",
    };

    switch (columnKey) {
      case "transactionDate":
        return (
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        );
      case "amount":
        return (
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        );
      case "currency":
        return (
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        );
      case "accountName":
        return (
          <p className="text-bold text-sm capitalize">{cellValue}</p>
        );

      case "categoryName":
        return (
          <Chip className="capitalize" color={statusColorMap[MoneyTransfer.categoryName]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  console.log(MoneyTransfer.id);
                  handleDelete(`${MoneyTransfer.id}`)}
                }
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, [handleDelete]);
  
  return (
    <Table
      isStriped
      isCompact
      aria-label="table with dynamic content"
      selectionMode="single"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      color="secondary"
      classNames={{
        base: "max-h-[720px]",
        table: "min-h-[500px] ",
        wrapper: "bg-gray-200"
      }}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      topContent={topContent}
      topContentPlacement="inside"
      bottomContentPlacement="outside"
      bottomContent={
        totalPages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} align={column.key === "actions" ? "start" : "start"}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedData}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell key={columnKey}>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
