import ScheduleReceiptItemModel from './ScheduleReceiptItemModel';

export default interface ScheduleReceiptModel {
  _id?: string;
  from: string;
  to: string;
  name: string;
  description: string;
  total: number;
  recurrence?: 'Weekly' | 'Monthly' | 'Yearly' | 'Once';
  daysInWeek?: (
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'
  )[];
  daysInMonth?: (
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27
    | 28
    | 29
    | 30
    | 31
    | 'Last day in month'
  )[];
  monthsInYear?: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12)[];
  items: ScheduleReceiptItemModel[];
}
