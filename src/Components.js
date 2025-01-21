import bg from "./assets/Capitoliy.jpg";
import Adam from "./assets/Adam.jpg"
import Maria from "./assets/Maria.jpg"


export const backgroundImage = bg;
export const AdamPhoto = Adam;
export const MariaPhoto = Maria;

export const dataForTable = {
      page: 0,
      size: 10,
      sort: "transactionDate,DESC",
      filterTransactionsDto: {}
}

export const currensySet = [
  {key: "USD", label: "USD"},
  {key: "EUR", label: "EUR"},
  { key: "UAN", label: "UAN" }
]