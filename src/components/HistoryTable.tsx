import React from "react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, ChipProps } from "@nextui-org/react";
import { Transaction } from "../types/expenseIncomeTransaction";

type Props = {
  topContent: any;
  sortedData: Transaction[];
  setSortDescriptor: any;
  sortDescriptor: any;
}

export const HistoryTable: React.FC<Props> = ({topContent, sortedData, setSortDescriptor, sortDescriptor}) => {

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
  ];

  // const statusColorMap: Record<string, ChipProps["color"]> = {
  //   default: "success",
  //   CreditCard: "danger",
  // };

  // const renderCell = React.useCallback((MoneyTransfer: Transaction, columnKey: React.Key) => {
  //   const cellValue = MoneyTransfer[columnKey as keyof Transaction];

  //   switch (columnKey) {
  //     case "transactionDate":
  //       return (
  //         <p className="text-bold text-sm capitalize">{cellValue}</p>
  //       );
  //     case "amount":
  //       return (
  //         <p className="text-bold text-sm capitalize">{cellValue}</p>
  //       );
  //       case "currency":
  //         return (
  //           <p className="text-bold text-sm capitalize">{cellValue}</p>
  //         );
  //         case "categoryId":
  //           return (
  //             <p className="text-bold text-sm capitalize">{cellValue}</p>
  //           );
  //     case "account":
  //       return (
  //         <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
  //           {cellValue}
  //         </Chip>
  //       );
  //     case "actions":
  //       return (
  //         <div className="relative flex items-center gap-2">
  //           <Tooltip content="Details">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EyeIcon />
  //             </span>
  //           </Tooltip>
  //           <Tooltip content="Edit user">
  //             <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //               <EditIcon />
  //             </span>
  //           </Tooltip>
  //           <Tooltip color="danger" content="Delete user">
  //             <span className="text-lg text-danger cursor-pointer active:opacity-50">
  //               <DeleteIcon />
  //             </span>
  //           </Tooltip>
  //         </div>
  //       );
  //     default:
  //       return cellValue;
  //   }
  // }, []);
  
  return (
    <Table
      isStriped
      aria-label="table with dynamic content"
      selectionMode="single"
      color="secondary"
      classNames={{
        base: "max-h-[720px] overflow-y-scroll ",
        table: "min-h-[600px] ",
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
        {sortedData.map((row) =>
          <TableRow key={row.id}>
            {(columnKey) => <TableCell className="capitalize">{getKeyValue(row, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
