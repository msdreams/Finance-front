export type TargetAdd = {
  id: number;
  name: string;
  expectedSum: number;
  currentSum: number;
  monthlyDownPayment: number;
  achievedBefore: string;
  periodLeft: string;
  currency: string;
  achieved: boolean;
}