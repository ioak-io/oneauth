import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDays, format } from 'date-fns';
import { faCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';
import ReceiptModel from '../../../model/ReceiptModel';
import ExpenseModel from '../../../model/ExpenseModel';
import Topbar from '../../../components/Topbar';
import { useNavigate } from 'react-router-dom';

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

const LandingPage = (props: Props) => {
  const navigate = useNavigate();

  const authorization = useSelector((state: any) => state.authorization);
  const realmList = useSelector((state: any) => state.realm.items);

  const goToCreateRealmPage = () => {
    navigate('/create-realm');
  };

  const goToRealmPage = (realmReference: number) => {
    navigate(`/${realmReference}/home`);
  };

  return (
    <div className="landing-page">
      <Topbar title="Choose realm" />
      <div className="landing-page__main__container">
        <div className="landing-page__main main-section">
          {realmList.map((realm: any) => (
            <button
              key={realm._id}
              className="landing-page__main__realm"
              onClick={() => goToRealmPage(realm.realm)}
            >
              <div className="landing-page__main__realm__title">
                {realm.name}
              </div>
              <div className="landing-page__main__realm__subtitle">
                {realm.description}
              </div>
            </button>
          ))}
          <button
            className="landing-page__main__new-realm"
            onClick={goToCreateRealmPage}
          >
            <FontAwesomeIcon icon={faPlus} />
            <div>New realm</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
