export default interface IncomeFilterModel {
  _id?: string;
  name?: string | null;
  showInSummary?: boolean;
  showInDashboard?: boolean;
  from?: string | null;
  to?: string | null;
  description?: string | null;
  moreThan?: number | null;
  lessThan?: number | null;
  days?: number | null;
  months?: number | null;
  monthNumber?: number | null;
  yearNumber?: number | null;
  categoryIdList: string[];
  tagIdList: string[];
}
