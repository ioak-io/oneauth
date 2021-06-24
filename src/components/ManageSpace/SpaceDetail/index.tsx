import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import OakTab from '../../../oakui/wc/OakTab';
import EditSpace from './EditSpace';
import AccessControl from '../../AccessControl';

const SpaceDetail = () => {
  const history = useHistory();
  const { id }: any = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const space = useSelector((state: any) =>
    state.space.spaces?.find((item: any) => item._id === id)
  );

  const handleChangeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <div className="space-detail">
      <OakTab
        tabs={['Detail', 'System roles', 'Users', 'User groups']}
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
              <AccessControl domainId={space._id} domainType="space" />
            )}
          </div>
        )}
      </OakTab>
    </div>
  );
};

export default SpaceDetail;
