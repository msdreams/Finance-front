import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  ExpenseDeleteCategory,
  ExpenseGetAllCategories,
  IncomeDeleteCategory,
  IncomeGetAllCategories,
} from "../features/expenseIncomeCategorySlice";
import { AddCategory } from "../types/expenseIncomeCategory";
import { Tooltip } from "@heroui/react";
import { useDisclosure, Button } from "@nextui-org/react";
import { DeleteIcon } from "../assets/SVG/svg";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ModalApruve } from "./Modals/ModalApruve";
import { ModalCreateCategory } from "./Modals/ModalCreateCategory";
import {
  fetchAllExpenses,
  fetchAllIncomes,
} from "../features/expenseIncomeTransactionSlice";
import { dataForTable } from "../Components";

export const EditCategories = () => {
  const dispatch = useAppDispatch();
  const { expenseCategoryAll, incomeCategoryAll } = useAppSelector(
    (state) => state.expenseIncomeCategory
  );
  const [category, setCategory] = useState<AddCategory | null>(null);
  const [categoryType, setCategoryType] = useState("");
  const {
    isOpen: isDeleteExpenseOpen,
    onOpen: onOpenExpense,
    onOpenChange: onOpenDeleteExpense,
  } = useDisclosure();
  const {
    isOpen: isDeleteIncomeOpen,
    onOpen: onOpenIncome,
    onOpenChange: onOpenDeleteIncome,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isLoading = useSelector(
    (state: RootState) => state.expenseIncomeCategory.loading
  );

  useEffect(() => {
    dispatch(IncomeGetAllCategories());
    dispatch(ExpenseGetAllCategories());
  }, [dispatch]);

  const handleExpenseDelete = () => {
    if (category) {
      dispatch(ExpenseDeleteCategory(`${category.id}`)).finally(() => {
        dispatch(ExpenseGetAllCategories());
        dispatch(fetchAllExpenses({ ...dataForTable, page: 0 }));
      });
      onOpenDeleteExpense();
    } else {
      return;
    }
  };

  const handleIncomeDelete = () => {
    if (category) {
      dispatch(IncomeDeleteCategory(`${category.id}`)).finally(() => {
        dispatch(IncomeGetAllCategories());
        dispatch(fetchAllIncomes({ ...dataForTable, page: 0 }));
      });
      onOpenDeleteIncome();
    } else {
      return;
    }
  };

  return (
    <div className="flex w-full pt-6 pb-6">
      {expenseCategoryAll.length > 0 && incomeCategoryAll.length > 0 && (
        <div className="flex flex-col gap-6 md:gap-4 md:flex-row w-full">
          <div className="flex w-full flex-col gap-2 ">
            <div className="flex flex-row md:flex-col gap-4 items-baseline pb-1 ">
              <header className="font-semibold pl-4 text-lg">EXPENSE</header>
              <Tooltip className="font-sans" content="Create New Expense">
                <Button
                  className=" text-gray-300 md:w-full flex text-2xl h-8 min-w-8 bg-gray-500"
                  isLoading={isLoading}
                  onPress={() => {
                    onOpen();
                    setCategoryType("Expense");
                  }}
                >
                  +
                </Button>
              </Tooltip>
            </div>
            <div className="flex w-full max-h-[120px] md:max-h-[500px] overflow-y-scroll dark-scroll flex-col border border-gray-500 rounded-lg ">
              {expenseCategoryAll
                .filter((c) => c.id !== 6)
                .map((c) => (
                  <div
                    key={c.id}
                    className={`flex flex-row justify-between items-center p-2 pr-4 pl-4
                    ${category === c ? " bg-gray-500 " : "bg-gray-600"}
                    hover:bg-gray-500 cursor-pointer`}
                    onClick={() => {
                      setCategory(category === c ? null : c);
                    }}
                  >
                    <span>{c.name}</span>
                    <div
                      className={`flex flex-row gap-2 transition-all duration-300 
                    ${
                      category === c
                        ? "opacity-100 max-h-screen"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                    >
                      {c.id !== 5 && (
                        <Tooltip color="danger" content="Delete Category">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenExpense();
                            }}
                            className={`text-lg text-danger cursor-pointer active:opacity-50`}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2 ">
            <div className="flex flex-row md:flex-col gap-4 items-baseline pb-1 ">
              <header className="font-semibold pl-4 text-lg">INCOME</header>
              <Tooltip className="font-sans" content="Create New Income">
                <Button
                  className=" text-gray-300 flex md:w-full text-2xl h-8 min-w-8 bg-gray-500"
                  isLoading={isLoading}
                  onPress={() => {
                    onOpen();
                    setCategoryType("Income");
                  }}
                >
                  +
                </Button>
              </Tooltip>
            </div>
            <div className="flex w-ful max-h-[120px] md:max-h-[500px] overflow-y-scroll dark-scroll flex-col border border-gray-500 rounded-lg">
              {incomeCategoryAll
                .filter((c) => c.id !== 6)
                .map((c) => (
                  <div
                    key={c.id}
                    className={`flex flex-row justify-between items-center p-2 pr-4 pl-4 
                    ${category === c ? " bg-gray-500 " : "bg-gray-600"}
                    hover:bg-gray-500 cursor-pointer`}
                    onClick={() => {
                      setCategory(category === c ? null : c);
                    }}
                  >
                    <span>{c.name}</span>
                    <div
                      className={`flex flex-row gap-2 transition-all duration-300 
                    ${
                      category === c
                        ? "opacity-100 max-h-screen"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                    >
                      {c.id !== 5 && (
                        <Tooltip color="danger" content="Delete Category">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenExpense();
                            }}
                            className={`text-lg text-danger cursor-pointer active:opacity-50`}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      {category && (
        <>
          <ModalApruve
            header={"Do you want delete this category?"}
            body={category.name}
            onOpenChange={handleExpenseDelete}
            isOpen={isDeleteExpenseOpen}
          />

          <ModalApruve
            header={"Do you want delete this category?"}
            body={category.name}
            onOpenChange={handleIncomeDelete}
            isOpen={isDeleteIncomeOpen}
          />
        </>
      )}
      <ModalCreateCategory
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        categoryType={categoryType}
      />
    </div>
  );
};
