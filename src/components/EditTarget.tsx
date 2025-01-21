import { MdSavings } from "react-icons/md"; 
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { GetAllTargets } from "../features/targetSlice";
import { ModalCreateTarget } from "./ModalCreateTarget";
import { Button, useDisclosure } from "@nextui-org/react";
import { Listbox, ListboxItem, cn } from "@heroui/react";
import {Progress} from "@heroui/react";

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
          <p className="flex justify-center text-lg text-gray-800">Create your first target and fill it up!</p> 
          <Button
            className="md:w-auto"
            color="primary"
            onPress={onOpen}
          >
            Create New Target
          </Button>
  
          <ModalCreateTarget
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        </div>
      )
    }
  
  return (
    <div className="flex flex-col w-full">
      {targets.length > 0 && (
        <Listbox aria-label="Dynamic Actions" items={targets} variant="bordered">
          {(item) => (
            <ListboxItem
              key={item.id}
              color="default"
            >
              <div className="flex flex-row gap-2 items-center text-lg pb-4 pt-4">
                <MdSavings className="min-w-[24px]"/>
                <span className="pr-6 font-semibold">{item.name}</span>
                <Progress
                  className="max-w-md"
                  color="warning"
                  formatOptions={{style: "currency", currency: item.currency}}
                  label="progress"
                  maxValue={item.expectedSum}
                  showValueLabel={true}
                  size="md"
                  value={item.currentSum}
    />
              </div>


            </ListboxItem>
          )}
        </Listbox>
      )}
              <Button
          className="w-full md:w-auto"
          color="primary"
          onPress={onOpen}
        >
          Create New Target
        </Button>

        <ModalCreateTarget
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
    </div>
  )
}