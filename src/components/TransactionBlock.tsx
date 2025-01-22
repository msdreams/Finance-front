import { CiMoneyCheck1 } from "react-icons/ci"; 
import { TransactionAction } from "../components/TransactionAction";
import { Account } from "../types/account";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchGetAllAccounts } from "../features/accountSlice";
import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Accounts } from "./Accounts";
import {Tooltip} from "@heroui/react";
import { useDisclosure } from "@nextui-org/react";
import { ModalAccountTransfer } from "./ModalAccountTransfer";

export const TransactionBlock = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.account.loading);
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const [account, setAccount] = useState<Account | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch]);
  
  return (
    <div className="flex flex-col text-white gap-8 p-4 pt-6 md:p-8 ">
    <div className="flex gap-4 flex-row items-center flex-wrap justify-between ">
      {isLoading || !allAccounts ? (
        <div className="flex items-center justify-center h-[40px] w-[140px] bg-gray-600 rounded-lg">
        </div>
        ) : (
        <Accounts allAccounts={allAccounts} setAccount={setAccount} />
      )}
      {account && allAccounts && (
    <div className=" flex flex-row gap-2 items-center text-lg md:text-2xl text-end  animate-fadeInSlow">
        {account?.balance + "$"}
        <Tooltip className="font-sans" content="Transfer to another account">
          <div>
            <CiMoneyCheck1
              className="cursor-pointer hover:scale-95"
              size={38}
              onClick={onOpen}
            />
          </div>
        </Tooltip>
        <ModalAccountTransfer
          AllAccounts={allAccounts}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          currentAccountId={account.id}
        />
      </div>
       )}
    </div>
    <div className="flex flex-col gap-1 lg:max-w-[420px]">
      <TransactionAction
        selectedAccount={account}
        setAccount={setAccount}
      />
    </div>
  </div>
  )
}