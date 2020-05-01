import React, { useState, useEffect } from 'react';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';
import OakCheckbox from '../../oakui/OakCheckbox';

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
      <div className="modal-body two-column">
        <div className="typography-5">App Id</div>
        <OakText
          data={appData}
          id="_id"
          disabled
          handleChange={e => handleChange(e)}
        />
        <div className="typography-5">App Name</div>
        <OakText
          data={appData}
          id="name"
          disabled
          handleChange={e => handleChange(e)}
        />
        <div className="typography-5">Redirect url</div>
        <OakText
          data={appData}
          id="redirect"
          disabled
          handleChange={e => handleChange(e)}
        />
        <div className="typography-5">JWT Password</div>
        <OakText
          data={appData}
          id="jwtpassword"
          disabled
          handleChange={e => handleChange(e)}
        />
        <div className="typography-5">Protected</div>
        <OakCheckbox
          data={appData}
          id="protected"
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
