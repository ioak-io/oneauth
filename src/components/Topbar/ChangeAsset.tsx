import React, { useEffect, useState } from 'react';
import { useSelector, connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { getProfile, setProfile } from '../../store/actions/ProfileActions';
import { sendMessage } from '../../events/MessageService';
import './ChangeAsset.scss';

interface Props {
  realm: string;
}

const ChangeAsset = (props: Props) => {
  const authorization = useSelector((state: any) => state.authorization);

  const profile = useSelector((state: any) => state.profile);

  const history = useNavigate();

  const assets = useSelector((state: any) => state.asset.assets);

  const [currentAsset, setCurrentAsset] = useState<any>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.realm && assets) {
      setCurrentAsset(
        assets?.find((item: any) => item.assetId === Number(props.realm))
      );
    } else {
      setCurrentAsset(null);
    }
  }, [props.realm, assets]);

  const goToChangeAssetPage = () => {
    history('/');
  };

  return (
    <div className="change-asset">
      {currentAsset && <div>{currentAsset.name}</div>}
      {/* <div>
        <OakLink
          action={goToChangeAssetPage}
          theme="secondary"
          
        >
          {currentAsset ? 'Change company' : 'Choose company'}
        </OakLink>
      </div> */}
    </div>
  );
};

export default ChangeAsset;
