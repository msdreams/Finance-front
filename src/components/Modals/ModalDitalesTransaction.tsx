import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Transaction } from "../../types/expenseIncomeTransaction";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  transaction: Transaction;
  action: () => void;
};

export const ModalDitalesTransaction: React.FC<Props> = ({ isOpen, onOpenChange, transaction, action }) => {

  return (
    <Modal
      isDismissable={false}
      className="font-sans"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col">
              Transaction details
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1 p-2 bg-background rounded-lg">
                  <div>Date: {transaction.transactionDate}</div>
                  <div>{transaction.accountName}</div>
                  <div> {transaction.amount} {transaction.currency} </div>
                  <div>Category: {transaction.categoryName} </div>
                </div>
                  <div> {transaction.comment} </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                onPress={() => {
                  action()
                  onOpenChange()
                }}
              >
                Delete
              </Button>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
