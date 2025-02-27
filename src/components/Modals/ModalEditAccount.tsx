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
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useRef } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpenEdit: (value: string) => void;
  setRender: (value: (currentRender: any) => boolean) => void;
};

export const ModalEditAccount: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  onOpenEdit,
  setRender,
}) => {
  const isLoading = useSelector((state: RootState) => state.account.loading);
  const targetRef = useRef(null);
  const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setRender((currentRender) => !currentRender);
    onOpenEdit(String(data.name));
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
              Edit Account Name
            </ModalHeader>
            <ModalBody>
              <Form
                id="create-account-form"
                className=" flex flex-col text-gray-900"
                validationBehavior="native"
                onSubmit={(e) => handleSubmit(e)}
              >
                <Input
                  isRequired
                  className="text-gray-500"
                  errorMessage="Please enter new name"
                  name="name"
                  maxLength={15}
                  placeholder="Enter new account name"
                  type="string"
                  autoFocus
                />
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                className="bg-primary-400"
                type="submit"
                form="create-account-form"
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
