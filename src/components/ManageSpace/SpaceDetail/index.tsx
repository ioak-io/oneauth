import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditSpace from './EditSpace';
import EditAdministrators from './EditAdministrators';

const SpaceDetail = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const space = useSelector((state) =>
    state.space.spaces?.find((item: any) => item._id === id)
  );

  const handleChangeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <div className="space-detail">
      <OakTab
        tabs={['Detail', 'Administrator']}
        handleChange={handleChangeTab}
        variant="pills"
        color="info"
        nobaseline
        fill
        rounded
      >
        {space && (
          <div className="space-detail__container">
            {activeTab === 0 && <EditSpace space={space} />}
            {activeTab === 1 && (
              <EditAdministrators
                space={space}
                toggleVisibilityHandler={() => {}}
              />
            )}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default SpaceDetail;
