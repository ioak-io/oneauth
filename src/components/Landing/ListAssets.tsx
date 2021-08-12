import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import AssetItem from './AssetItem';

interface Props {
  history: any;
}

const ListAssets = (props: Props) => {
  const assetList = useSelector((state: any) => state.asset);
  return (
    <div className="list-assets">
      <div className="typography-7 realm-bottom-2">
        Choose an asset to proceed
      </div>
      <div className="list-assets--content">
        {assetList?.assets?.map((asset) => (
          <AssetItem asset={asset} history={props.history} key={asset.id} />
        ))}
      </div>
    </div>
  );
};

export default ListAssets;
