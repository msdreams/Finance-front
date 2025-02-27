import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useAppDispatch } from "../../app/hooks";
import { DeleteTarget } from "../../features/targetSlice";
import { Account } from "../../types/account";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  targetId: number;
  targetName: string;
  allAccounts: Account[];
};

export const ModalDeleteTarget: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  targetId,
  allAccounts,
  targetName,
}) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number | null>(null);
  const [errowMessage, setErrowMessage] = useState<string | null>(null);

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(+e.target.value);
    setErrowMessage(null);
  };

  const handleDelete = (targetId: number, accountId: number | null) => {
    if (accountId) {
      dispatch(DeleteTarget({ targetId, accountId }));
      onOpenChange();
    } else {
      setErrowMessage("Please, choose one of your accounts to send money back");
    }
  };
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
            <ModalHeader className="flex flex-col gap-1">
              Delete your target {targetName}?
            </ModalHeader>
            <ModalBody>
              <p>Choose one of your accounts to send money back</p>

              <Select
                isRequired
                name="accountId"
                label="Transfer to"
                placeholder="Select an account"
                aria-label="Transfer to"
                onChange={(e) => handleSelectionChange(e)}
              >
                {allAccounts.map((a) => (
                  <SelectItem className="font-sans" key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </Select>
              {errowMessage && (
                <div className="text-danger">{errowMessage}</div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="danger"
                onPress={() => handleDelete(targetId, value)}
              >
                Delete Target
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
