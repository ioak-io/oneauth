export default interface StatisticsPayloadModel {
  option: 'this month' | 'last month' | 'this year' | 'last year' | 'custom';
  from?: string;
  to?: string;
}
