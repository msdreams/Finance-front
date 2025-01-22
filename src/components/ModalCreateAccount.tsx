import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Form, Input, Select, SelectItem, useDraggable} from "@nextui-org/react";
import { useAppDispatch } from "../app/hooks";
import { currensySet } from "../Components";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useRef } from "react";
import { DataAddAccount } from "../api/account";
import { AddAccount, fetchGetAllAccounts } from "../features/accountSlice";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const ModalCreateAccount: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.target.loading);
  const targetRef = useRef(null);
  const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
  
  const handleSubmitAddAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formDataIncome: DataAddAccount = {
      name: String(data.name),
      balance: +data.amount,
      currency: String(data.currency),
    };
  
  
    dispatch(AddAccount(formDataIncome))
      .finally(() => dispatch(fetchGetAllAccounts()));
    onOpenChange();
  };

  return (
    <Modal
      isDismissable={false}
      className="font-sans w-full bg-gray-300 text-gray-800" 
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      ref={targetRef}
    >
      <ModalContent >
        {(onClose) => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              New Account
            </ModalHeader>
            <ModalBody>
              <Form
                id="create-target-form"
                className=" flex flex-col text-gray-900"
                validationBehavior="native"
                onSubmit={(e) => handleSubmitAddAccount(e)}
              >
                <Input
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter account name"
                  name="name"
                  placeholder="Enter account name"
                  type="string"
                  autoFocus
                />
                <Input
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter a valid amount"
                  name="amount"
                  placeholder="Enter account balance"
                  type="number"
                  min="1"
              />

                <Select 
                  isRequired
                  name="currency" 
                  label="Currency" 
                  placeholder="Select currency type"
                >
                  {currensySet.map((c) => (
                    <SelectItem key={c.key}>{c.label}</SelectItem>
                  ))}
                </Select>
              </Form>
            </ModalBody>
            <ModalFooter>
            <Button 
              isLoading={isLoading} 
              className="bg-primary-400" 
              type="submit"
              form="create-target-form"
              >
                    Submit
                </Button>
              <Button color="danger" variant="light" onPress={onClose} type="submit">
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}