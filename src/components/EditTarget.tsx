import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetAllTargets } from "../features/targetSlice";
import { ModalCreateTarget } from "./Modals/ModalCreateTarget";
import { Button, useDisclosure } from "@nextui-org/react";
import { TargetItems } from "./TargetItems";

export const EditTarget = () => {
  const dispatch = useAppDispatch();
  const { targets } = useAppSelector((state) => state.target) || [];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    dispatch(GetAllTargets());
  }, [dispatch]);

  if (!targets || targets.length === 0) {
    return (
      <div className="flex flex-col gap-4 justify-center p-6 pb-12 pt-12 bg-white rounded-lg">
        <p className="flex justify-center text-lg text-gray-800">
          Create your first target and fill it up!
        </p>
        <Button className="md:w-auto" color="primary" onPress={onOpen}>
          Create New Target
        </Button>

        <ModalCreateTarget isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {targets.length > 0 && <TargetItems targets={targets} />}
      <Button
        className="w-full md:w-auto bg-gray-500 text-gray-100"
        onPress={onOpen}
      >
        Create New Target
      </Button>

      <ModalCreateTarget isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
