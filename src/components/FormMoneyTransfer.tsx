import { Form, Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { useAppDispatch } from "../app/hooks";
import { fetchTransactionsAddIncome } from "../features/expenseIncomeTransactionSlice";
import { DataUpdate } from "../api/expenseIncomeTransaction";
import { Account } from "../types/account";
import { AddCategory, AllCategories } from "../types/expenseIncomeCategory";

type Props = {
  allAccounts: Account[],
  category: AddCategory[] | null | AllCategories,
}

export const FormMoneyTransfer: React.FC<Props> = ( {allAccounts, category } ) => {

  const dispatch = useAppDispatch();

  const categories = category || [{ id: 1, name: "Salary" }];

    const handleSubmitAddIncome = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      const data = Object.fromEntries(new FormData(e.currentTarget));
      console.log(data)
      const formDataIncome: DataUpdate = {
        comment: String(data.comment),
        amount: +data.amount,
        transactionDate: String(data.date),
        accountId:+String(data.accountId),
        categoryId:+String(data.categoryId),
      };
    
      dispatch(fetchTransactionsAddIncome(formDataIncome))
    };

  return (
    <Form
      className=" flex flex-col text-gray-900"
      validationBehavior="native"
      onSubmit={(e) => handleSubmitAddIncome(e)}
    >
      <Input
        isRequired
        className="text-gray-500"
        errorMessage="Please enter a valid amount"
        name="amount"
        placeholder="Enter amount of money"
        type="number"
      />
      <Input
        isRequired
        className="text-gray-500"
        errorMessage="Please enter a valid date"
        name="date"
        type="date"
      />
      <div className="flex flex-col md:flex-row w-full gap-2">
        <Select name="categoryId" className="min-w-36" label="Select category">
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
          ))}
        </Select>
    
        <Select name="accountId" className="min-w-44" label="Tagget account" placeholder="Select an account">
          {allAccounts.map((account) => (
            <SelectItem key={account.id} value={account.id.toString()}>{account.name}</SelectItem>
          ))}
        </Select>
        
      </div>

      <Textarea placeholder="Enter your message" type="comment" name="comment" />
      <div className="flex flex-col space-y-4 w-full font-sans pt-2 pb-2">
        <Button className="bg-primary-400 " type="submit">
            Submit
        </Button>
      </div>
    </Form>
  )
}