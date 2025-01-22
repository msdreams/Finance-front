import { Modal, Textarea, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Form, Input, DatePicker, Select, SelectItem, useDraggable} from "@nextui-org/react";
import { useAppDispatch } from "../app/hooks";
import { getLocalTimeZone, today} from "@internationalized/date";
import { currensySet } from "../Components";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useRef } from "react";
import { DataAddTransfer } from "../api/account";
import { AddTransfer, fetchGetAllAccounts } from "../features/accountSlice";
import { Account } from "../types/account";

type Props = {
  isOpen: boolean;
  AllAccounts: Account[];
  onOpenChange: () => void;
  currentAccountId: number;
}

export const ModalAccountTransfer: React.FC<Props> = ({ AllAccounts, isOpen, currentAccountId, onOpenChange }) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.target.loading);
  const targetRef = useRef(null);
  const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
  
  const handleSubmitAddTransfer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formDataTransfer: DataAddTransfer = {
      comment: String(data.comment),
      amount: +data.amount,
      transactionDate: String(data.date),
      fromAccountId: currentAccountId,
      toAccountId: +data.accountId,
    };
  
  
    dispatch(AddTransfer(formDataTransfer))
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
              New Transaction
            </ModalHeader>
            <ModalBody>
              <Form
                id="create-target-form"
                className=" flex flex-col text-gray-900"
                validationBehavior="native"
                onSubmit={(e) => handleSubmitAddTransfer(e)}
              >
                <Input
                  autoFocus
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter a valid amount"
                  name="amount"
                  placeholder="Enter transaction amount"
                  type="number"
                  min="1"
              />

                <Select 
                  isRequired
                  name="accountId" 
                  label="Transfer to" 
                  placeholder="Select an account"
                  aria-label="Transfer to"
                >
                  {AllAccounts.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </Select>

                <DatePicker
                  isRequired
                  className="text-gray-500 pb-0 !p-0"
                  errorMessage="Please enter a valid date"
                  defaultValue={today(getLocalTimeZone())}
                  name="date"
                  aria-label="date"
                />
                <Textarea placeholder="Enter your message" type="comment" name="comment" />

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