import { Form, Input, Button, Selection, useDisclosure, divider } from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Account } from "../types/account";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchGetAllAccounts } from "../features/accountSlice";
import { GetAllTargets, ReplenishTarget } from "../features/targetSlice";
import { DataReplenishTarget } from "../api/target";
import { useEffect, useMemo, useState } from "react";
import { ModalCreateTarget } from "./ModalCreateTarget";
import {Tooltip} from "@heroui/react";


type Props = {
  selectedAccount: Account,
}

export const FormTargetTransfer: React.FC<Props> = ( { selectedAccount } ) => {
  const dispatch = useAppDispatch();
  const { targets } = useAppSelector((state) => state.target) || [];
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const isLoading = useSelector((state: RootState) => state.expenseIncomeTransaction.loading);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const[errowMessage, setErrowMessage] = useState<string | null>(null)

  const CurrentTarget = useMemo(() => {
    const value = Array.from(selectedKeys).join(", ").replace(/_/g, "");
    return value ;
  }, [selectedKeys]);
  
  const handleReplenishTarget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));  
    const formDataIncome: DataReplenishTarget = {
      sumOfReplenishment: +data.amount,
      fromAccountId:+String(selectedAccount.id),
      toTargetId:+String(CurrentTarget.split("-")[2]),
    };
  
    dispatch(ReplenishTarget(formDataIncome))
      .unwrap()
      .then(() => setErrowMessage(null))
      .catch((er) => setErrowMessage(er.message))
      .finally(() => {
        dispatch(fetchGetAllAccounts())
        dispatch(GetAllTargets());
      });
  };
  
  useEffect(() => {
    setErrowMessage(null)

      dispatch(GetAllTargets());
    }, [dispatch]);
  
  if (!targets || targets.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-center p-6 pb-12 pt-12 bg-white rounded-lg">
        <p className="flex justify-center text-lg text-gray-800">Create your first target and fill it up!</p> 
        <Button
          className="md:w-auto"
          isLoading={isLoading}
          color="primary"
          onPress={onOpen}
        >
          Create New Target
        </Button>

        <ModalCreateTarget
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </div>
    )
  }
    return (
     <>
    {targets.length > 0 &&(
      <Form
        className="relative flex flex-col  text-gray-900 pt-2 pb-4 bg-gray-600 "
        validationBehavior="native"
        onSubmit={(e) => handleReplenishTarget(e)}
      >
        <div className="flex flex-row justify-between items-center w-full gap-3 pb-4">
            <div className="text-white text-md">
                {`${targets[+CurrentTarget.split("-")[0]].name}: ` || ""}
                {`${targets[+CurrentTarget.split("-")[0]].currentSum} ` || ""}
                {targets[+CurrentTarget.split("-")[0]].currency}
            </div>
            <div className="text-white text-md text-end">
                Target: {`${targets[+CurrentTarget.split("-")[0]].expectedSum} ` || ""}
                {targets[+CurrentTarget.split("-")[0]].currency}
            </div>
          
        </div>
            <div className="flex flex-row justify-between items-center w-full gap-3 mb-2">
            <Tooltip className="font-sans" content="Create New Target">
              <Button 
                className=" text-gray-300 flex text-xl h-10 min-w-10 bg-gray-500" 
                isLoading={isLoading} 
                onPress={onOpen}
              >
                  +
              </Button>
            </Tooltip>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className=" w-full capitalize text-white min-w-[100px] text:sm md:text-md" 
                  variant="bordered"
                >
                {CurrentTarget.split("-")[1] || targets[0].name}
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
                {targets.map((t, i) => (
                  <DropdownItem
                    key={`${i}-${t.name}-${t.id}`}
                    value={t.id.toString()}
                    className="font-sans"
                  >
                    {t.name.replace(/\b\w/g, char => char.toUpperCase())}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          {errowMessage && <div className="text-warning-300">{errowMessage}</div> }

        <div className="flex flex-col md:flex-row md:items-baseline w-full gap-2">
          <Input
            isRequired
            className="text-gray-500 min-w-36  md:align-top flex flex-1"
            errorMessage="Please enter a valid amount"
            name="amount"
            placeholder={`Expected Sum: ${targets[+CurrentTarget.split("-")[0]].downPayment || ""} $`}
            type="number"
            min="1"
            />
        </div>
  
        <div className="flex  flex-col space-y-4 w-full font-sans pt-2 pb-2">
          <Button isLoading={isLoading} className="bg-primary-400" type="submit">
              Submit
          </Button>
          </div>
      </Form>
    )}

      <ModalCreateTarget
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
    </>
    )
}