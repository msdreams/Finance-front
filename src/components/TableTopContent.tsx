import React, { useCallback, useEffect, useState } from "react";
import { Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Selection} from "@nextui-org/react";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

type Props = {
  selectedTab: string;
  sorterFilter: Selection;
  setSorterFilter: React.Dispatch<React.SetStateAction<Selection>>;
  setSelectedIds: (value: string) => void;
}

export const TopContent: React.FC<Props> = ({ selectedTab, sorterFilter, setSorterFilter, setSelectedIds }) => {
    const { expenseCategoryAll, incomeCategoryAll } = useAppSelector((state) => state.expenseIncomeCategory);
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const { loading } = useAppSelector((state) => state.expenseIncomeTransaction);
    const [sorterFilter2, setSorterFilter2] = useState<Selection>(new Set(['0-All Accounts']));
  
  
    const selectedValue = useCallback(() => {
      if (!allAccounts || allAccounts.length === 0) return "0-All Accounts";
      return Array.from(sorterFilter2).join(", ").replace(/_/g, "");
    }, [allAccounts, sorterFilter2]);
  
    useEffect(() => {
      const value = selectedValue();
      setSelectedIds(value.split("-")[0]);
    }, [selectedValue, setSelectedIds]);
  
    const categories = useCallback(() => {
      if (selectedTab === "Income") {
        return incomeCategoryAll;
      }
      return expenseCategoryAll;
    }, [selectedTab, incomeCategoryAll, expenseCategoryAll]);
  
    const extendedAccount = () => {
      if (allAccounts) {
        return     [...allAccounts,
          {
            id: 0,
            name: 'All Accounts',
            balance: 0,
            currency: 'USD',
            byDefault: false,
          }];
      }
      return  [
        {
          id: 0,
          name: 'all',
          balance: 0,
          currency: 'USD',
          byDefault: false,
        }];
    }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:justify-between">
      <div>
        <div className="text-default-600 text-base pr-4 pt-2"></div>
        <div className="flex flex-row gap-4 items-center">
          <Dropdown>
            <DropdownTrigger className=" sm:flex">
              <Button
                size="sm"
                variant="solid"
                className="bg-primary-300 "
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
                isLoading={loading}
              >
                {selectedValue().split("-")[1].toUpperCase()}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={sorterFilter2}
              selectionMode="single"
              onSelectionChange={setSorterFilter2}
              defaultSelectedKeys={new Set(['0-All Accounts'])}

            >
              {extendedAccount().map((account) => (
                <DropdownItem key={`${account.id}-${account.name}`} className="capitalize font-sans">
                  {account.name}
                </DropdownItem>
              )
              )}
              
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  )
};
