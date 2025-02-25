import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ModalCreateAccount } from "./Modals/ModalCreateAccount";
import { Account } from "../types/account";
import { Button, useDisclosure } from "@nextui-org/react";
import { fetchGetAllAccounts, UpdateAccount } from "../features/accountSlice";
import { Tooltip } from "@heroui/react";
import { EditIcon } from "../assets/SVG/svg";
import { ModalEditAccount } from "./Modals/ModalEditAccount";
import { BsUiRadiosGrid } from "react-icons/bs";

export const EditAccounts = () => {
  const dispatch = useAppDispatch();
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const {
    isOpen: isEditOpen,
    onOpen: onOpenEdit,
    onOpenChange: onOpenEditChange,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [account, setAccount] = useState<Account | null>(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    dispatch(fetchGetAllAccounts());
  }, [dispatch, render]);

  const handleDataEdit = (newName: string) => {
    if (account) {
      dispatch(
        UpdateAccount({
          id: account.id.toString(),
          data: { newName: newName },
        })
      );
      onOpenEditChange();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {allAccounts && (
        <div className="flex flex-col gap-4">
          {allAccounts.map((a) => (
            <div
              key={a.id}
              className={`flex flex-col gap-4 p-4 border rounded-md
                ${account === a ? " border-gray-300 bg-gray-700 " : "border-gray-400"}
                hover:border-gray-400 cursor-pointer hover:bg-gray-700`}
              onClick={() => {
                setAccount(account === a ? null : a);
              }}
            >
              <div
                id={`${a.id}`}
                className={`relative flex flex-row justify-between gap-2 items-top text-lg`}
              >
                <div className="flex flex-row gap-4 items-center">
                  <div className="flex flex-col">
                    <span className="pr-6 font-semibold min-w-[120px]">
                      {a.name}
                    </span>
                    <span className="text-base">{a.currency}</span>
                  </div>
                </div>
                <div className="text-base flex flex-col items-end gap-2">
                  <div>
                    {a.balance} {a.currency}
                  </div>

                  <Tooltip
                      placement="left"
                      color="primary"
                      className="font-sans"
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
                  <div
                    className={`flex flex-row gap-2 transition-all duration-300 
                    ${account === a
                        ? "opacity-100 max-h-screen"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    <Tooltip className="font-sans" placement="left" color="warning" content="Edit account">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEdit();
                        }}
                        className={`text-lg text-warning cursor-pointer active:opacity-50`}
                      >
                        <EditIcon />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Button
        className="w-full md:w-auto bg-gray-500 text-gray-100"
        onPress={onOpen}
      >
        Create New Account
      </Button>

      <ModalCreateAccount isOpen={isOpen} onOpenChange={onOpenChange} />

      {account && (
        <ModalEditAccount
          isOpen={isEditOpen}
          onOpenChange={onOpenEditChange}
          onOpenEdit={handleDataEdit}
          setRender={setRender}
        />
      )}
    </div>
  );
};
