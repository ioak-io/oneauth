import ExpenseModel from './ExpenseModel';

export default interface ReceiptModel {
  _id?: string;
  number: string;
  description?: string;
  billDate: string;
  total: number;
  items: ExpenseModel[];
}
