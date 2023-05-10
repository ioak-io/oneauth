import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addDays, format } from 'date-fns';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'basicui';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ExpenseModel from '../../../model/ExpenseModel';
import BillDetails from './BillDetails';
import ExpenseItems from './ExpenseItems';
import { newId } from '../../../events/MessageService';
import { isEmptyAttributes, isEmptyOrSpaces } from '../../../components/Utils';
import { saveBill, getBillById } from './service';
import {
  ONEAUTH_PREF_ADDBILL_ANOTHER,
  ONEAUTH_PREF_ADDBILL_DATE,
} from '../../../constants/SessionStorageConstants';
import Topbar from '../../../components/Topbar';
import { updateExpenseItems } from '../../../store/actions/ExpenseActions';
import { updateReceiptItems } from '../../../store/actions/ReceiptActions';
import { useSearchParams } from 'react-router-dom';

const EMPTY_EXPENSE: ExpenseModel = {
  amount: undefined,
  billDate: '',
  category: '',
  description: '',
  tagId: [],
};

const EMPTY_BILL: ReceiptModel = {
  billDate: format(new Date(), 'yyyy-MM-dd'),
  items: [{ ...EMPTY_EXPENSE }],
  number: '',
  total: 0,
  description: '',
};

interface Props {
  space: string;
  location: any;
}

const EditBillPage = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const getEmptyBill = (): ReceiptModel => {
    return {
      ...EMPTY_BILL,
      billDate:
        sessionStorage.getItem(ONEAUTH_PREF_ADDBILL_DATE) ||
        EMPTY_BILL.billDate,
    };
  };
  const navigate = useNavigate();
  const authorization = useSelector((state: any) => state.authorization);
  const [formId, setFormId] = useState(newId());
  const [errorInItemList, setErrorInItemList] = useState<boolean[]>([]);
  const [errorInBillDetails, setErrorInBillDetails] = useState<boolean>(false);
  const [state, setState] = useState<ReceiptModel>({ ...getEmptyBill() });
  const [addAnother, setAddAnother] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(ONEAUTH_PREF_ADDBILL_ANOTHER)) {
      setAddAnother(
        sessionStorage.getItem(ONEAUTH_PREF_ADDBILL_ANOTHER) === 'true'
      );
    }
  }, []);

  useEffect(() => {
    if (searchParams.has('id')) {
      setId(searchParams.get('id'));
    }
  }, [searchParams])

  useEffect(() => {
    if (id && authorization.isAuth) {
      getBillById(props.space, id, authorization).then(
        (response: any) => {
          if (!isEmptyAttributes(response)) {
            setState({
              ...response,
              items: [...response.items, { ...EMPTY_EXPENSE }],
            });
          }
        }
      );
    }
  }, [id, authorization]);

  // useEffect(() => {
  //   addRow(state.items);
  // }, []);

  const addRow = (_existingItems: ExpenseModel[], total?: number) => {
    const items: ExpenseModel[] = [..._existingItems];
    items.push({ ...EMPTY_EXPENSE });
    setState({ ...state, total: total || state.total, items });
  };

  const handleBillChange = (_bill: ReceiptModel) => {
    setState(_bill);
  };

  const handleItemsChange = (items: ExpenseModel[], isAddRow: boolean) => {
    let total: number = 0;
    items.forEach((item) => {
      total += item.amount || 0;
    });
    if (isAddRow) {
      addRow(items, total);
    } else {
      setState({ ...state, total, items });
    }
  };

  const save = (_addAnother: boolean) => {
    const items = state.items.filter(
      (item: ExpenseModel) =>
        !isEmptyOrSpaces(item._id) ||
        !isEmptyOrSpaces(item.description) ||
        (item.amount && item.amount > 0) ||
        !isEmptyOrSpaces(item.category)
    );
    items.push({ ...EMPTY_EXPENSE });

    const _errorInItemList: boolean[] = [];
    items.forEach((item: ExpenseModel, index: number) => {
      _errorInItemList.push(
        (index !== items.length - 1 || index === 0) &&
        (isEmptyOrSpaces(item.description) ||
          (item.amount && item.amount < 1) ||
          isEmptyOrSpaces(item.category))
      );
    });
    const _state = { ...state, items };
    setState(_state);
    setErrorInItemList(_errorInItemList);
    if (!state.billDate) {
      setErrorInBillDetails(true);
    }
    if (!_errorInItemList.includes(true) && state.billDate) {
      saveBill(
        props.space,
        {
          ..._state,
          items: _state.items.filter((item) => !isEmptyOrSpaces(item.category)),
        },
        authorization
      ).then((response: any) => {
        if (!isEmptyAttributes(response)) {
          const { items, ..._receipt } = response;
          dispatch(updateReceiptItems([_receipt]));
          dispatch(updateExpenseItems(items));
          setState({
            ...response,
            items: [...response.items, { ...EMPTY_EXPENSE }],
          });
          if (!_addAnother) {
            navigate(-1)
          } else {
            setState({ ...getEmptyBill() });
          }
        }
      });
    }
  };

  const saveAndAddAnother = () => {
    save(true);
  };

  const saveAndClose = () => {
    save(false);
  };

  const goBack = () => {
    navigate(-1)
  };

  const toggleAddAnother = () => {
    sessionStorage.setItem(
      ONEAUTH_PREF_ADDBILL_ANOTHER,
      (!addAnother).toString()
    );
    setAddAnother(!addAnother);
  };

  return (
    <div className="edit-bill-page page-animate">
      <Topbar title={id ? 'Edit bill' : 'New bill'}>right</Topbar>
      <div className="edit-bill-page__main main-section">
        <div className="edit-bill-page__main__bill page-width content-section">
          <BillDetails
            bill={state}
            handleChange={handleBillChange}
            formId={formId}
            errors={errorInBillDetails}
          />
        </div>
        <div className="edit-bill-page__main__expense page-width content-section">
          <ExpenseItems
            data={state.items}
            handleChange={handleItemsChange}
            formId={formId}
            errors={errorInItemList}
          />
        </div>
      </div>
      <div className="footer">
        <div className="edit-bill-page__footer__left">
          {/* {!id && (
            <Checkbox
              name="addAnother"
              value={addAnother}
              handleChange={toggleAddAnother}
            >
              Add another
            </Checkbox>
          )} */}
        </div>
        <div className="footer-right">
          <Button
            onClick={saveAndClose}
          >
            <FontAwesomeIcon icon={faCheck} />
            Save and close
          </Button>
          {!id && (
            <Button
              onClick={saveAndAddAnother}
            >
              <FontAwesomeIcon icon={faCheck} />
              Save and add another
            </Button>
          )}
          <Button onClick={goBack}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBillPage;
