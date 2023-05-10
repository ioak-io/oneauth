import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import { Input, Select, SelectPropsConverter } from 'basicui';
import { newId } from '../../../events/MessageService';
import StatisticsPayloadModel from '../../../model/StatisticsPayloadModel';
import CategoryDistribution from '../../DashboardElements/CategoryDistribution';
import Topbar from '../../Topbar';
import './style.scss';
import BudgetTrend from '../../DashboardElements/BudgetTrend';
import MonthlyCategoryTrend from '../../DashboardElements/MonthlyCategoryTrend';
import {
  DASHBOARD_COLOR_SCHEME,
  DASHBOARD_KAKEIBO_COLOR_SCHEME,
  getTrend,
  getWeeklyTrend,
  getYearlyTrend,
  getMetric,
  getBalanceTrend,
} from '../../DashboardElements/service';
import IncomeTrend from '../../DashboardElements/IncomeTrend';
import ExpenseChangeTrend from '../../DashboardElements/ExpenseChangeTrend';
import WeeklyTrend from '../../DashboardElements/WeeklyTrend';
import { isEmptyOrSpaces } from '../../Utils';
import TileSection from '../../DashboardElements/TileSection';
import TopSpendList from '../../DashboardElements/TopSpendList';
import YearTrend from '../../DashboardElements/YearTrend';

interface Props {
  space: string;
}

const KAKEIBO_MAP = {
  Needs: { name: 'Needs' },
  Wants: { name: 'Wants' },
  Culture: { name: 'Culture' },
  Unexpected: { name: 'Unexpected' },
};

const DashboardPage = (props: Props) => {
  const categories = useSelector((state: any) => state.category.categories);
  const filterExpenseList = useSelector(
    (state: any) => state.filterExpense.items
  );
  const authorization = useSelector((state: any) => state.authorization);
  const [formId, setFormId] = useState(newId());
  const [dropdown, setDropdown] = useState({ 'custom': 'Custom date range' });

  const [state, setState] = useState<StatisticsPayloadModel>({
    option: 'custom',
    from: '2022-01',
    to: '2022-04',
  });
  const [prevState, setPrevState] = useState<StatisticsPayloadModel>({
    option: 'last month',
  });
  const [data, setData] = useState<any>({});
  const [metric, setMetric] = useState<any>({});
  const [balanceTrendData, setBalanceTrendData] = useState<any[]>([]);
  const [weeklyTrendata, setWeeklyTrendData] = useState<any>({});
  const [yearlyTrendata, setYearlyTrendData] = useState<any>({});

  const [categoryMap, setCategoryMap] = useState<any>({});

  useEffect(() => {
    if (authorization.isAuth && !_.isEqual(state, prevState)) {
      setPrevState({ ...state });
      if (
        state.option !== 'custom' ||
        (state.option === 'custom' &&
          !isEmptyOrSpaces(state.from) &&
          !isEmptyOrSpaces(state.to))
      ) {
        getTrend(props.space, authorization, state).then((response: any) => {
          setData(response);
        });
        getMetric(props.space, authorization, state).then((response: any) => {
          setMetric(response);
        });
        getWeeklyTrend(props.space, authorization, state).then(
          (response: any) => {
            setWeeklyTrendData(response);
          }
        );
        getYearlyTrend(props.space, authorization, state).then(
          (response: any) => {
            setYearlyTrendData(response);
          }
        );
        getBalanceTrend(props.space, authorization, state).then(
          (response: any) => {
            setBalanceTrendData(response);
          }
        );
      }
    }
  }, [authorization, state]);

  // useEffect(() => {
  //   if (authorization.isAuth) {
  //     getYearlyTrend(props.space, authorization, state).then(
  //       (response: any) => {
  //         setYearlyTrendData(response);
  //       }
  //     );
  //   }
  // }, [authorization]);

  useEffect(() => {
    const _dropdown: any = {};
    filterExpenseList?.forEach((item: any) => {
      _dropdown[item._id] = item.name;
    });
    _dropdown['custom'] = 'Custom date range';
    setDropdown(_dropdown);
  }, [filterExpenseList]);

  useEffect(() => {
    if (categories) {
      const _categoryMap: any = {};
      categories.forEach((category: any) => {
        _categoryMap[category._id] = category;
      });
      setCategoryMap(_categoryMap);
    }
  }, [categories]);

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleOptionChange = (
    option: 'this month' | 'last month' | 'this year' | 'last year' | 'custom'
  ) => {
    setState({
      ...state,
      option,
    });
  };

  return (
    <div className="dashboard-page page-animate">
      <Topbar title="Dashboard">right</Topbar>

      <div className="main-section dashboard-page__main">
        <div className="dashboard-page__main__criteria">
          <Select
            name="option"
            value={[state.option]}
            onInput={handleChange}
            placeholder="From"
            options={SelectPropsConverter.optionsFromObject(dropdown)}
          />
          {state.option === 'custom' && (
            <>
              <Input
                name="from"
                value={state.from}
                type="month"
                onInput={handleChange}
                placeholder="From"
              />
              <Input
                name="to"
                value={state.to}
                type="month"
                onInput={handleChange}
                placeholder="To"
              />
            </>
          )}
        </div>
        <div className="dashboard-page__main__two-column">
          <div className="dashboard-page__main__chart">
            <TileSection
              space={props.space}
              categoryMap={categoryMap}
              data={balanceTrendData}
              title="Balances"
            />
          </div>
          <div className="dashboard-page__main__chart">
            <MonthlyCategoryTrend
              space={props.space}
              criteria={state}
              categoryMap={categoryMap}
              data={data.categoryDistributionMonthly}
              title="Monthly category distribution"
              colorScheme={DASHBOARD_COLOR_SCHEME}
              stacked
            />
          </div>
          <div className="dashboard-page__main__chart">
            <CategoryDistribution
              space={props.space}
              categoryMap={categoryMap}
              data={data.categoryDistribution}
              colorScheme={DASHBOARD_COLOR_SCHEME}
              title="Category distribution"
            />
          </div>
          <div className="dashboard-page__main__chart">
            <BudgetTrend
              space={props.space}
              criteria={state}
              data={data.budgetDistribution}
            />
          </div>
          <div className="dashboard-page__main__chart">
            <IncomeTrend
              space={props.space}
              criteria={state}
              data={data.incomeDistributionMonthly}
            />
          </div>
          <div className="dashboard-page__main__chart">
            <ExpenseChangeTrend
              space={props.space}
              criteria={state}
              data={data.totalChangeDistribution}
            />
          </div>
          <div className="dashboard-page__main__chart">
            <WeeklyTrend
              space={props.space}
              criteria={state}
              data={weeklyTrendata}
            />
          </div>
          <div className="dashboard-page__main__chart">
            <YearTrend
              space={props.space}
              criteria={state}
              data={yearlyTrendata}
            />
          </div>
          <div className="dashboard-page__main__chart">
            <MonthlyCategoryTrend
              space={props.space}
              criteria={state}
              categoryMap={KAKEIBO_MAP}
              data={data.kakeiboDistributionMonthly}
              title="Monthly Kakeibo distribution"
              colorScheme={DASHBOARD_KAKEIBO_COLOR_SCHEME}
              stacked
            />
          </div>
          <div className="dashboard-page__main__chart">
            <CategoryDistribution
              space={props.space}
              categoryMap={KAKEIBO_MAP}
              data={data.kakeiboDistribution}
              colorScheme={DASHBOARD_KAKEIBO_COLOR_SCHEME}
              title="Kakeibo distribution"
            />
          </div>
          <div className="dashboard-page__main__chart">
            <TileSection
              space={props.space}
              categoryMap={categoryMap}
              data={data.metric?.topSpend}
              title="Top spends by transaction"
            />
          </div>
          <div className="dashboard-page__main__chart">
            <TileSection
              space={props.space}
              categoryMap={categoryMap}
              data={data.metric?.topMonth}
              title="Top spends by month"
            />
          </div>
          {/* <div className="dashboard-page__main__chart">
            <TileSection
              space={props.space}
              categoryMap={categoryMap}
              data={data.metric?.topSpend}
              title="Top spends by transaction"
            />
          </div>
          <div className="dashboard-page__main__chart">
            <TileSection
              space={props.space}
              categoryMap={categoryMap}
              data={data.metric?.topMonth}
              title="Top spends by month"
            />
          </div> */}
        </div>
        <div className="dashboard-page__main__one-column">
          <div className="dashboard-page__main__chart">
            <TopSpendList
              space={props.space}
              categoryMap={categoryMap}
              data={data.metric?.topSpendList}
              title="Top spends list"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
