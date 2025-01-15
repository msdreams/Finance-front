import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { TransactionAction } from "../components/TransactionAction";
import { Account } from "../types/account";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchGetAllAccounts } from "../features/accountSlice";
import type {Selection} from "@nextui-org/react";
import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";


export const TransactionBlock = () => {
    const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.account.loading);
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const [account, setAccount] = useState<Account | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch]);
  
    const selectedValue = useMemo(() => {
      if (!allAccounts || allAccounts.length === 0) return "Default account";
      const value = Array.from(selectedKeys).join(", ").replace(/_/g, "");
      return value.split("-")[1] || "Default account";
    }, [selectedKeys, allAccounts]);

    // useEffect(() => {
    //   if (allAccounts && allAccounts.length > 0) {
    //     setSelectedKeys(new Set([allAccounts[0].name]));
    //     setAccount(allAccounts[0]);
    //   }
    // }, [allAccounts]);
  
    useEffect(() => {
      if (allAccounts && allAccounts.length > 0) {
        const selectedAccountIndex = +Array.from(selectedKeys).join(", ").split("-")[0];
        setAccount(allAccounts[selectedAccountIndex] || allAccounts[0]);
      }
    }, [selectedKeys, allAccounts]);
  
  
  return (
    <div className="flex flex-col text-white gap-6 p-4 md:p-8">
    <div className="flex gap-4 flex-row flex-wrap justify-between ">
      {isLoading || !allAccounts || !account ? (
        <div className="flex items-center justify-center h-[40px] w-[140px] bg-gray-600 rounded-lg">
        </div>
      ): (
      <div className="flex flex-row gap-4 animate-fadeIn">
        <Dropdown>
          <DropdownTrigger>
            <Button className="capitalize text-white min-w-[140px]" variant="bordered" >
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Single selection example"
            selectedKeys={selectedKeys}
            selectionMode="single"
            variant="flat"
            onSelectionChange={setSelectedKeys}
          >
            {allAccounts.map((account, i) => (
              <DropdownItem key={`${i}-${account.name}`}>{account.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    )}
        {account && (
      <div className="text-2xl min-w-[210px] animate-fadeInSlow">
        Balance: {account?.balance + "$"}
      </div>
          
      )}
    </div>
    <div className="flex flex-col gap-1 lg:max-w-[400px] pt-2 ">
        <TransactionAction
          selectedAccount={account}
          setAccount={setAccount}
        />
    </div>
  </div>
  )
}