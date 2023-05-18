export default interface BudgetModel {
  _id?: string | null;
  year: number;
  month: number;
  amount: number;
  categoryId: string;
}
