import React, { useState } from "react";
import {
  Table,
  Selection,
  TableHeader,
  TableColumn,
  TableBody,
  Tooltip,
  TableRow,
  TableCell,
  ChipProps,
  Chip,
  Pagination,
  useDisclosure,
} from "@nextui-org/react";
import { Transaction } from "../types/expenseIncomeTransaction";
import { DeleteIcon, EyeIcon } from "../assets/SVG/svg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchAllExpenses,
  fetchAllIncomes,
  fetchTransactionsDeleteExpense,
  fetchTransactionsDeleteIncome,
} from "../features/expenseIncomeTransactionSlice";
import { ModalWindow } from "./Modals/ModalWindow";
import { useMediaQuery } from "react-responsive";
import { ModalDitalesTransaction } from "./Modals/ModalDitalesTransaction";
import { ModalApruveDelete } from "./Modals/ModalApruveDelete";
import { dataForTable } from "../Components";

type Props = {
  topContent: any;
  sortedData: Transaction[];
  setSortDescriptor: any;
  sortDescriptor: any;
  setPage: (value: number) => void;
  page: number;
  selectedTab: string;
  totalPages: number;
};

export const HistoryTable: React.FC<Props> = ({
  selectedTab,
  topContent,
  sortedData,
  setSortDescriptor,
  sortDescriptor,
  setPage,
  page,
  totalPages,
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.expenseIncomeTransaction.error);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenMobile, onOpen: onOpenMobile, onOpenChange: onOpenChangeMobile } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();


  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 500 });

  const TransactionId = Array.from(selectedKeys)[0]; 
  
  const handleDitalesClick = React.useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
      onOpenMobile();
  },[]);
  
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

  const columnsMobile = [
    {
      key: "transactionDate",
      label: "DATE",
    },
    {
      key: "amount",
      label: "AMOUNT",
      sortable: true,
    },
  ];

  const handleDelete = React.useCallback(
    (transactionId: string) => {
      if (selectedTab === "Income") {
        dispatch(fetchTransactionsDeleteIncome(transactionId))
          .unwrap()
          .then( () => dispatch(fetchAllIncomes({ ...dataForTable, page: page - 1 }))
          )
          .catch(() => onOpen());
      } else {
        dispatch(fetchTransactionsDeleteExpense(transactionId))
        .unwrap()
        .then(() => dispatch(fetchAllExpenses({ ...dataForTable, page: page - 1 })))
        .catch(() => onOpen());
      }
    },
    [dispatch, selectedTab, onOpen, page]
  );

  const renderCell = React.useCallback(
    (MoneyTransfer: Transaction, columnKey: React.Key) => {
      const cellValue = MoneyTransfer[columnKey as keyof Transaction];
      const statusColorMap: Record<string, ChipProps["color"]> = {
        Salary: "warning",
        Freelance: "success",
        Investments: "danger",
        "Rental Income": "primary",
        Other: "secondary",
        Utilities: "warning",
        Groceries: "success",
        Transportation: "danger",
        Entertainment: "primary",
      };

      switch (columnKey) {
        case "transactionDate":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "amount":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "currency":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "accountName":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;

        case "categoryName":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[MoneyTransfer.categoryName]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip className="font-sans" content="Details">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => handleDitalesClick(MoneyTransfer)}
                >
                  <EyeIcon />
                </span>
                
              </Tooltip>
              <Tooltip  className="font-sans" color="danger" content="Delete transaction">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => onOpenDelete()}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleDitalesClick, onOpenDelete]
  );

  const renderCellMobile = React.useCallback(
    (MoneyTransfer: Transaction, columnKey: React.Key) => {
      const cellValue = MoneyTransfer[columnKey as keyof Transaction];
      const statusColorMap: Record<string, ChipProps["color"]> = {
        Salary: "warning",
        Freelance: "success",
        Investments: "danger",
        "Rental Income": "primary",
        Other: "secondary",
        Utilities: "warning",
        Groceries: "success",
        Transportation: "danger",
        Entertainment: "primary",
      };

      switch (columnKey) {
        case "transactionDate":
          return (
            <div className="flex flex-col text-xs md:text-sm gap-2">
              <p className="text-bold  capitalize" > {cellValue}</p >
              <Chip
                className="capitalize"
                color={statusColorMap[MoneyTransfer.categoryName]}
                size="sm"
                variant="flat"
              >
                {MoneyTransfer.categoryName}
              </Chip>
            </div>
          )
        case "amount":
          return (
            <div className="flex flex-col gap-1">
              <p className="text-bold text-xs md:text-sm capitalize">{cellValue} {MoneyTransfer.currency}</p>
              <p className="text-xs md:text-sm">{MoneyTransfer.accountName}</p>
            </div>
          )
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <Table
        isStriped
        isCompact
        aria-label="table with dynamic content"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        color="primary"
        classNames={{
          base: "max-h-[800px]",
          table: "min-h-[500px] ",
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
        <TableHeader columns={!isMobile ? columns : columnsMobile}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "start" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedData}>
          {(item) => (
              <TableRow key={item.id} onClick={() => isMobile && handleDitalesClick(item)}>
                {(columnKey) => (
                  <TableCell key={columnKey}>
                  {!isMobile? renderCell(item, columnKey): renderCellMobile(item, columnKey)}
                  </TableCell>
              )}
              </TableRow>
          )}
        </TableBody>
      </Table>

      <ModalWindow
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        header={"Rejected"}
        body={error ?? "Errow"}
      />

      {TransactionId && (
        <ModalApruveDelete
          isOpen={isOpenDelete}
          onOpenChange={onOpenChangeDelete}
          header="Delete Transaction"
          body="Are you shure you want to delete this transaction?"
          action={() => handleDelete(`${TransactionId}`)}
        />
      )}

      {selectedTransaction && (
        <ModalDitalesTransaction
          isOpen={isOpenMobile}
          onOpenChange={() => {
            setSelectedTransaction(null);
            onOpenChangeMobile();
          }}
          transaction={selectedTransaction}
          action={onOpenDelete}
        />
       )
      }
    </>
  );
};
