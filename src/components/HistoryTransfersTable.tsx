import React from "react";
import { Table, Selection, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination }from "@nextui-org/react";
import { Transfer } from "../types/account";

type Props = {
  topContent: any;
  sortedData: Transfer[];
  setSortDescriptor: any;
  sortDescriptor: any;
  setPage: (value: number) => void;
  page: number;
  selectedTab: string;
  totalPages: number;
};

export const HistoryTransfersTable: React.FC<Props> = ({
  topContent,
  sortedData,
  setPage,
  page,
  totalPages,
}) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  console.log(sortedData)

  const columns = [
    {
      key: "transactionDate",
      label: "DATE",
      sortable: true,
    },
    {
      key: "fromAccountId",
      label: "FROM",
      sortable: true,
    },
    {
      key: "toAccountId",
      label: "TO",
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
    }
  ];

  const renderCell = React.useCallback(
    (MoneyTransfer: Transfer, columnKey: React.Key) => {
      const cellValue = MoneyTransfer[columnKey as keyof Transfer];

      switch (columnKey) {
        case "transactionDate":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "amount":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "currency":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "fromAccountId":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
        case "toAccountId":
          return <p className="text-bold text-sm capitalize">{cellValue}</p>;
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
        color="secondary"
        classNames={{
          base: "max-h-[720px]",
          table: "min-h-[500px] ",
          wrapper: "bg-gray-200",
        }}
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
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
