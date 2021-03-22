import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getProfile, setProfile } from '../../actions/ProfileActions';
import { sendMessage } from '../../events/MessageService';
import OakLink from '../../oakui/OakLink';
import './ChangeAsset.scss';

interface Props {
  space: string;
}

const ChangeAsset = (props: Props) => {
  const authorization = useSelector((state) => state.authorization);

  const profile = useSelector((state) => state.profile);

  const history = useHistory();

  const assets = useSelector((state) => state.asset.assets);

  const [currentAsset, setCurrentAsset] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.space && assets) {
      setCurrentAsset(
        assets?.find((item: any) => item.assetId === Number(props.space))
      );
    } else {
      setCurrentAsset(null);
    }
  }, [props.space, assets]);

  const goToChangeAssetPage = () => {
    history.push('/');
  };

  return (
    <div className="change-asset">
      {currentAsset && <div>{currentAsset.name}</div>}
      <div>
        <OakLink
          action={goToChangeAssetPage}
          theme="secondary"
          variant="appear"
        >
          {currentAsset ? 'Change company' : 'Choose company'}
        </OakLink>
      </div>
    </div>
  );
};

export default ChangeAsset;
