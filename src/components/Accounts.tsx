import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Selection,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { Account } from "../types/account";
import { useMediaQuery } from "react-responsive";

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

  console.log(account.balance)

  const selectedId = useMemo(() => {
    const keys = selectedKeys as Set<string>
    
    return keys.size ? Number(Array.from(keys)[0].split("-")[0]) : null;
  }, [selectedKeys]);

  const isMobile = useMediaQuery({ maxWidth: 500 });

  useEffect(() => {
    if (!selectedId ) return;
    const newAccount = allAccounts.find((acc) => acc.id === selectedId);
    if (newAccount) {
      setAccount(newAccount);
    }
  }, [selectedId, allAccounts, setAccount]);

  useEffect(() => {
    setSelectedKeys(new Set([`${account.id}-${account.name}`]));
  }, [account]);
  return (
    <div className="flex flex-row gap-2 items-center animate-fadeIn">
      <Dropdown>
        <DropdownTrigger>
          <Button
            className="text-sm md:text-medium capitalize text-white"
            variant="bordered"
            size={isMobile ? "sm" : "md"}
          >
            {account.name}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          className="font-sans"
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
    </div>
  );
};
