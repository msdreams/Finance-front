import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  SelectItem,
  useDraggable,
} from "@nextui-org/react";
import { DataAddTarget } from "../../api/target";
import { AddTarget, GetAllTargets } from "../../features/targetSlice";
import { useAppDispatch } from "../../app/hooks";
import { getLocalTimeZone, today } from "@internationalized/date";
import { currensySet } from "../../Components";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useRef } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const ModalCreateTarget: React.FC<Props> = ({
  isOpen,
  onOpenChange,
}) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector((state: RootState) => state.target.loading);
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const handleSubmitAddTarget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formDataIncome: DataAddTarget = {
      name: String(data.name),
      expectedSum: +data.amount,
      achievedBefore: String(data.date),
      currency: String(data.currency),
    };

    dispatch(AddTarget(formDataIncome)).finally(() =>
      dispatch(GetAllTargets())
    );
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
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader {...moveProps} className="flex flex-col gap-1">
              New Target
            </ModalHeader>
            <ModalBody>
              <Form
                id="create-target-form"
                className=" flex flex-col text-gray-900"
                validationBehavior="native"
                onSubmit={(e) => handleSubmitAddTarget(e)}
              >
                <Input
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter target name"
                  name="name"
                  maxLength={12}
                  placeholder="Enter target name"
                  type="string"
                  autoFocus
                />
                <Input
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter a valid amount"
                  name="amount"
                  placeholder="Enter target amount"
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
                    <SelectItem className="font-sans" key={c.key}>{c.label}</SelectItem>
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
              <Button
                color="danger"
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
