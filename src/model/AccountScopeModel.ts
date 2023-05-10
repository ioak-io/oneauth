export default interface AccountScopeModel {
  _id?: string | null;
  scope: 'This month' | 'This year' | 'Last month' | 'Last year' | 'Custom';
  from?: string;
  to?: string;
}
