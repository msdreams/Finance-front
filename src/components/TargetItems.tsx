import { Progress } from "@heroui/react";
import { Tooltip } from "@heroui/react";
import { DeleteIcon } from "../assets/SVG/svg";
import { TargetAdd } from "../types/target";
import { useDisclosure } from "@nextui-org/react";
import { ModalDeleteTarget } from "./Modals/ModalDeleteTarget";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";
import { useState } from "react";

type Props = {
  targets: TargetAdd[];
};

export const TargetItems: React.FC<Props> = ({ targets }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onOpenDelete,
    onOpenChange: onOpenDeleteChange,
  } = useDisclosure();
  const { allAccounts } = useAppSelector((state: RootState) => state.account);
  const [targetItem, setTargetItem] = useState<null | TargetAdd>(null);

  return (
    <div className="flex flex-col gap-4">
      {targets.map((item) => (
        <div
          key={item.id}
          className={`flex flex-col gap-4 p-4 border rounded-md
            ${targetItem === item ? " border-gray-300 bg-gray-700 " : "border-gray-400"}
            hover:border-gray-400 cursor-pointer hover:bg-gray-700`}
          onClick={() => {
            setTargetItem(targetItem === item ? null : item);
          }}
        >
          <div
            id={`${item.id}`}
            className={`relative flex flex-col gap-2 items-top text-lg`}
          >
            <div className="flex flex-row gap-4 items-center">
              <div className="flex flex-col">
                <span className="pr-6 font-semibold min-w-[120px]">
                  {item.name}
                </span>
              </div>
            </div>

            <Progress
              color="warning"
              aria-label="Progress"
              formatOptions={{
                style: "percent",
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }}
              maxValue={item.expectedSum}
              showValueLabel={true}
              size="md"
              value={item.currentSum}
            />
            <span className="absolute top-9 right-0 text-base">
              {item.currentSum} / {item.expectedSum} {item.currency}
            </span>
          </div>

          <div
            className={`flex flex-row justify-between items-end transition-all duration-300 ease-out
              ${
                targetItem === item
                  ? "opacity-100 max-h-screen"
                  : "opacity-0 max-h-0 overflow-hidden"
              }`}
          >
            <div className="text-base flex flex-col gap-1">
              <div className="flex">
                <div className="w-[125px]">Period left:</div>
                <span> {item.periodLeft.slice(14)}</span>
              </div>
              <div className="flex">
                <div className="w-[125px]">Monthly dues:</div>
                <span>
                  {" "}
                  {item.downPayment} {item.currency}
                </span>
              </div>
              <div className="flex">
                <div className="w-[125px]">Deadline:</div>
                <span> {item.achievedBefore}</span>
              </div>
            </div>
            <div className="flex flex-row gap-2 transition-all duration-300">
              <Tooltip className="font-sans" color="danger" content="Delete target">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDelete();
                  }}
                  className={`text-lg font-sans text-danger cursor-pointer active:opacity-50`}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      ))}
      {targetItem && (
        <ModalDeleteTarget
          targetName={targetItem.name}
          targetId={targetItem.id}
          isOpen={isDeleteOpen}
          onOpenChange={onOpenDeleteChange}
          allAccounts={allAccounts ?? []}
        />
      )}
    </div>
  );
};
