import { BsUiRadiosGrid } from "react-icons/bs"; 
import { AiFillPlusCircle } from "react-icons/ai"; 
import { TransactionAction } from "../components/TransactionAction";
import { Account } from "../types/account";
import { useEffect, useState } from "react";
import { fetchGetAllAccounts } from "../features/accountSlice";
import { RootState } from "../app/store";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Accounts } from "./Accounts";
import { Tooltip } from "@heroui/react";
import { useDisclosure } from "@nextui-org/react";
import { ModalAccountTransfer } from "./Modals/ModalAccountTransfer";
import { ModalCreateAccount } from "./Modals/ModalCreateAccount";

export const TransactionBlock = () => {
  const dispatch = useAppDispatch();
  const allAccounts = useAppSelector((state: RootState) => state.account.allAccounts);
  const [account, setAccount] = useState<Account | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isOpenAccount, onOpen: onOpenAccount, onOpenChange: onOpenChangeAccount } = useDisclosure();

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch]);

  console.log(account?.balance)

  return (
    <div className="flex flex-col text-white gap-8 p-4 pt-6 lg:p-8 ">
      <div className="flex gap-4 flex-row items-center flex-wrap justify-between ">
        { !allAccounts ? (
          <div className="flex items-center justify-center h-[40px] w-[140px] bg-gray-600 rounded-lg">
          </div>
        ) : (
          <div className="flex flex-row gap-2 items-center">
            <Tooltip placement="bottom-start" color="primary" className="font-sans" content="Create New Account">
            <div>
              <AiFillPlusCircle
                className="cursor-pointer hover:scale-95"
                size={32}
                fill="#59D493"
                onClick={onOpenAccount}
              />
            </div>
          </Tooltip>
                  
          <Accounts
            allAccounts={allAccounts}
            setAccount={setAccount}
            account={account || allAccounts[0]}
          />
          </div>
        )}
        {allAccounts && (
          <div className=" flex flex-row gap-2 items-center text-lg md:text-xl text-end animate-fadeInSlow">
            {account?.balance || allAccounts[0].balance} {account?.currency || allAccounts[0].currency}
            <Tooltip
              placement="bottom-end"
              className="font-sans"
              color="primary"
              content="Transfer to another account"
            >
              <div>
                <BsUiRadiosGrid
                  className="cursor-pointer hover:scale-95"
                  size={28}
                  fill="#59D493"
                  onClick={onOpen}
                />
              </div>
            </Tooltip>
            <ModalAccountTransfer
              AllAccounts={allAccounts}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              currentAccountId={account?.id || allAccounts[0].id}
              currentAccountname={account?.name || allAccounts[0].name}
            />
            <ModalCreateAccount isOpen={isOpenAccount} onOpenChange={onOpenChangeAccount} />

          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 lg:max-w-[420px]">
        {allAccounts && (
          <TransactionAction selectedAccount={account || allAccounts[0]} setAccount={setAccount} />
        )}
      </div>
    </div>
  );
};
