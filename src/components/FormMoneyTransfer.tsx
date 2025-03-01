import {
  Form,
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
  useDisclosure,
  DatePicker,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchTransactionsAddExpense,
  fetchTransactionsAddIncome,
} from "../features/expenseIncomeTransactionSlice";
import { DataUpdate } from "../api/expenseIncomeTransaction";
import { Account } from "../types/account";
import { AddCategory, AllCategories } from "../types/expenseIncomeCategory";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { fetchGetAllAccounts } from "../features/accountSlice";
import { ModalWindow } from "./Modals/ModalWindow";
import { getLocalTimeZone, today } from "@internationalized/date";

type Props = {
  selectedAccount: Account;
  category: AddCategory[] | null | AllCategories;
  selectedTab: string;
  setAccount: (value: Account) => void;
};

export const FormMoneyTransfer: React.FC<Props> = ({
  selectedAccount,
  category,
  selectedTab,
  setAccount,
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.expenseIncomeTransaction.error);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const categories = category || [{ id: 1, name: "Other" }];
  const isLoading = useSelector(
    (state: RootState) => state.expenseIncomeTransaction.loading
  );
  const handleSubmitAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formDataIncome: DataUpdate = {
      comment: String(data.comment),
      amount: +data.amount,
      transactionDate: String(data.date),
      accountId: +String(selectedAccount.id),
      categoryId: +String(data.categoryId),
    };

    dispatch(fetchTransactionsAddIncome(formDataIncome)).finally(() => {
      dispatch(fetchGetAllAccounts());
      setAccount(selectedAccount);
    });
  };

  const handleSubmitAddExpence = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const formDataIncome: DataUpdate = {
      comment: String(data.comment),
      amount: +data.amount,
      transactionDate: String(data.date),
      accountId: +String(selectedAccount.id),
      categoryId: +String(data.categoryId),
    };

    dispatch(fetchTransactionsAddExpense(formDataIncome))
      .unwrap()
      .catch(() => onOpen())
      .finally(() => dispatch(fetchGetAllAccounts()));
  };

  return (
    <Form
      className=" flex flex-col text-gray-900"
      validationBehavior="native"
      onSubmit={(e) => {
        if (selectedTab === "Add Income") {
          handleSubmitAddIncome(e);
        } else {
          handleSubmitAddExpence(e);
        }
      }}
    >
      <Input
        isRequired
        className="text-gray-500"
        errorMessage="Please enter a valid amount"
        name="amount"
        placeholder="Enter amount of money"
        type="number"
        min="1"
      />

      <div className="flex flex-col md:flex-row md:items-start w-full gap-2">
        {categories.length > 0 && (
          <>
            <label htmlFor="categoryId" className="sr-only">
              Category
            </label>
            <Select
              isRequired
              name="categoryId"
              className="min-w-36 md:align-top"
              placeholder="Select category"
              aria-label="Select category"
            >
              {categories.map((c) => (
                <SelectItem className="font-sans" key={c.id} value={c.id.toString()}>
                  {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                </SelectItem>
              ))}
            </Select>
          </>
        )}

        <DatePicker
          isRequired
          className="text-gray-500 pb-0 !p-0"
          errorMessage="Please enter a valid date"
          defaultValue={today(getLocalTimeZone())}
          name="date"
          aria-label="date"
        />
      </div>

      <Textarea
        placeholder="Enter your message"
        type="comment"
        name="comment"
      />
      <div className="flex flex-col space-y-4 w-full font-sans pt-2 pb-2">
        <Button isLoading={isLoading} className="bg-primary-400" type="submit">
          Submit
        </Button>
      </div>

      <ModalWindow
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        header={"Rejected"}
        body={error ?? "Errow"}
      />
    </Form>
  );
};
