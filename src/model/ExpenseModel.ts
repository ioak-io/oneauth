export default interface ExpenseModel {
  _id?: string;
  description: string;
  billDate: any;
  billId?: string;
  amount?: number;
  category: string;
  tagId: string[];
}
