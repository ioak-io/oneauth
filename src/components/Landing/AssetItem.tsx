import React from 'react';
import './style.scss';

interface Props {
  asset: any;
  history: any;
}

const AssetItem = (props: Props) => {
  const goToAssetPage = () => {
    console.log(props.asset);
    props.history(`/${props.asset.assetId}/home`);
  };
  return (
    <div className="asset-list-item" onClick={goToAssetPage}>
      <div className="asset-list-item--link">
        <div className="typography-6">{props.asset.name}</div>
      </div>
      <div className="typography-4">{props.asset.description}</div>
    </div>
  );
};

export default AssetItem;
