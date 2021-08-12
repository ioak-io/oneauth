import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import './style.scss';
import OakTab from '../../oakui/wc/OakTab';
import OakSection from '../../oakui/wc/OakSection';

interface Props {
  match: any;
  history: any;
}

const PlayToolbar = (props: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (detail: any) => {
    setActiveTab(detail.value);
  };

  return (
    <OakTab tabs={['Overview', 'Playground', 'API']} handleChange={changeTab}>
      <OakSection fillColor="none">
        {activeTab === 0 && <>Overview content</>}
        {activeTab === 2 && <>api content</>}
        {activeTab === 1 && <>Playground content</>}
      </OakSection>
    </OakTab>
  );
};

export default PlayToolbar;
