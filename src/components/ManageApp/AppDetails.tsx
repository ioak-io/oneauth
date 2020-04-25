import React, { useState, useEffect } from 'react';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';

interface Props {
  app: any;
  toggleVisibilityHandler: Function;
}

const AppDetails = (props: Props) => {
  const [appData, setAppData] = useState({
    name: '',
    redirect: '',
  });

  useEffect(() => {
    setAppData(props.app);
  }, [props.app]);

  const handleChange = event => {
    setAppData({
      ...appData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="modal-body">
        <OakText
          label="App Id"
          data={appData}
          id="_id"
          disabled
          handleChange={e => handleChange(e)}
        />
        <OakText
          label="App Name"
          data={appData}
          id="name"
          disabled
          handleChange={e => handleChange(e)}
        />
        <OakText
          label="Redirect url"
          data={appData}
          id="redirect"
          disabled
          handleChange={e => handleChange(e)}
        />
      </div>
      <div className="modal-footer">
        <OakButton
          action={props.toggleVisibilityHandler}
          theme="default"
          variant="animate in"
          align="left"
        >
          <i className="material-icons">close</i>Close
        </OakButton>
      </div>
    </>
  );
};

export default AppDetails;
