import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Account } from "../types/account";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ModalCreateAccount } from "./Modals/ModalCreateAccount";
import { Tooltip } from "@heroui/react";

type Props = {
  allAccounts: Account[];
  setAccount: (value: Account) => void;
  account: Account;
};

export const Accounts: React.FC<Props> = ({
  allAccounts,
  setAccount,
  account,
}) => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set([`${account.id}-${account.name}`])
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const selectedValue = useMemo(() => {
    const value = Array.from(selectedKeys).join(", ").replace(/_/g, "");
    return value;
  }, [selectedKeys]);

  useEffect(() => {
    setAccount(allAccounts[+selectedValue.split("-")[0] - 1]);
  }, [selectedValue, allAccounts, setAccount, account]);

  return (
    <div className="flex flex-row gap-2 items-center animate-fadeIn">
      <Tooltip className="font-sans" content="Create New Account">
        <div>
          <AiOutlinePlusCircle
            className="cursor-pointer hover:scale-95"
            size={28}
            onClick={onOpen}
          />
        </div>
      </Tooltip>

      <Dropdown>
        <DropdownTrigger>
          <Button
            className="capitalize text-md text-white "
            variant="bordered"
            size="md"
          >
            {account.name}
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
          {allAccounts.map((account) => (
            <DropdownItem key={`${account.id}-${account.name}`}>
              {account.name.replace(/\b\w/g, (char) => char.toUpperCase())}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>

      <ModalCreateAccount isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
