export default interface IncomeModel {
  _id?: string;
  description: string;
  billDate: string;
  amount?: number;
  category: string;
  tagId: string[];
}
