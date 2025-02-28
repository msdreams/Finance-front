import { Transaction } from "../types/expenseIncomeTransaction";

export enum Currency {
  USD = "USD",
  EURO = "EURO",
  UAH = "UAH"
}

export const FilterBalance = (transactions: Transaction[], selectedTab: string) => {
  const totalByCurrency: Record<Currency, number> = {
    [Currency.USD]: 0,
    [Currency.EURO]: 0,
    [Currency.UAH]: 0,
  };

  transactions.reduce((acc, tr) => {
    if (tr.currency in acc) {
      acc[tr.currency as Currency] += tr.amount;
    }
    return acc;
  }, totalByCurrency);

  return (
    <div className="flex flex-row flex-wrap gap-4 pb-4">
      <span>Total {selectedTab}</span>
      <p>USD: {totalByCurrency[Currency.USD]} $</p>
      <p>EURO: {totalByCurrency[Currency.EURO]} €</p>
      <p>UAN: {totalByCurrency[Currency.UAH]} ₴</p>
    </div>
  );
};

