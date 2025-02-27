import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  header: string;
  body: string;
}

export const ModalWindow:React.FC<Props> = ({ isOpen, onOpenChange, header, body }) => {
  
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
              <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
              <ModalBody>
                <p>
                {body}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onOpenChange}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}