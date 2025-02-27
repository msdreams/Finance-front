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
  action: () => void
  error?: string | null;
}

export const ModalApruveDelete:React.FC<Props> = ({ isOpen, onOpenChange, header, body, action }) => {
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
              <Button color="danger" onPress={() => { 
                onOpenChange();
                action(); 
              }}>
                  Yes
                </Button>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
              </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}