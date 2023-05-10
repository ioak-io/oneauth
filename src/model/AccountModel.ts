export default interface AccountModel {
  _id?: string | null;
  name: string;
  type: 'credit' | 'debit' | 'cash';
  opening: number;
  closing: number;
}
