export default interface CompanyModel {
  _id?: string | null;
  reference?: number | null;
  name: string;
  description: string;
  numberFormat: string;
  currency: string;
}
