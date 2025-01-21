import { Account } from "../types/account";
import { useEffect, useMemo, useState } from "react";
import { fetchGetAllAccounts } from "../features/accountSlice";
import type {Selection} from "@nextui-org/react";
import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {Tabs, Tab} from "@nextui-org/react";
import { EditTarget } from "./EditTarget";

export const SettingsBlock = () => {
    const dispatch = useAppDispatch();
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const [account, setAccount] = useState<Account | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch]);
  
    useEffect(() => {
      if (allAccounts && allAccounts.length > 0) {
        const selectedAccountIndex = +Array.from(selectedKeys).join(", ").split("-")[0];
        setAccount(allAccounts[selectedAccountIndex] || allAccounts[0]);
      }
    }, [selectedKeys, allAccounts]);
  
  
  return (
    <div className="flex flex-col text-white p-4 md:px-8 md:pt-6 md:pb-0">
      <Tabs fullWidth className="animate-fadeIn" aria-label="Options" color="primary" size="md">
        <Tab key="Edit Target" title="Edit Target">
          <EditTarget />
        </Tab>
        <Tab key="Edit Account" title="Edit Account">

        </Tab>
        <Tab key="Edit Categories" title="Edit Categories">
        </Tab>
      </Tabs>
  </div>
  )
}