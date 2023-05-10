import { Subject, Observable, BehaviorSubject } from 'rxjs';
import PaginationModel from 'src/model/PaginationModel';
import ExpenseFilterModel from '../model/ExpenseFilterModel';

export const ExpenseFilterState = new BehaviorSubject<ExpenseFilterModel>({
  from: '',
  to: '',
  description: '',
  moreThan: null,
  lessThan: null,
  days: null,
  months: null,
  monthNumber: null,
  yearNumber: null,
  categoryIdList: [],
  kakeiboList: [],
  tagIdList: [],
});

export const ExpenseFilterPaginationState =
  new BehaviorSubject<PaginationModel>({
    pageNo: 0,
    pageSize: 20,
    hasMore: true,
    sortBy: null,
    sortOrder: null,
  });
