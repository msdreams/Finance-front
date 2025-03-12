import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  useDraggable,
} from "@nextui-org/react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useRef, useState } from "react";
import { DataName } from "../../api/expenseIncomeCategory";
import {
  ExpenseGetAllCategories,
  fetchExpenseAddCategory,
  fetchIncomeAddCategory,
  IncomeGetAllCategories,
} from "../../features/expenseIncomeCategorySlice";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  categoryType: string;
};

export const ModalCreateCategory: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  categoryType,
}) => {
    const [errowMessage, setErrowMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.expenseIncomeCategory.loading
  );
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const handleSubmitAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formData: DataName = {
      name: String(data.name),
    };

    if (categoryType === "Income") {
      dispatch(fetchIncomeAddCategory(formData))
        .unwrap()
        .then(() => onOpenChange())
        .catch((err) => setErrowMessage(err.message))
        .finally(() => dispatch(IncomeGetAllCategories())
      );
    } else if (categoryType === "Expense") {
      dispatch(fetchExpenseAddCategory(formData))
        .unwrap()
        .then(() => onOpenChange())
        .catch((err) => setErrowMessage(err.message))
        .finally(() => dispatch(ExpenseGetAllCategories())
      );
    }
  };

  return (
    <Modal
      isDismissable={false}
      className="font-sans w-full bg-gray-300 text-gray-800"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      ref={targetRef}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              New {categoryType} Category
            </ModalHeader>
            <ModalBody>
              <Form
                id="create-target-form"
                className=" flex flex-col text-gray-900"
                validationBehavior="native"
                onSubmit={(e) => handleSubmitAddCategory(e)}
              >
                <Input
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter category name"
                  name="name"
                  placeholder="Enter category name"
                  type="string"
                  maxLength={15}
                  autoFocus
                />
              </Form>
              {errowMessage && (
                <div className="text-danger">{errowMessage}</div>
              )}
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
              <Button
                color="primary"
                variant="light"
                onPress={onClose}
                type="submit"
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
