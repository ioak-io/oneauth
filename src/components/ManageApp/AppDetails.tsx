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
    _id: '',
    name: '',
    redirect: '',
    jwtpassword: '',
    protected: false,
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

  const handleChangeCheckbox = event => {
    setAppData({
      ...appData,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <>
      <div className="modal-body two-column">
        <OakText
          data={appData}
          id="_id"
          label="Application Id"
          disabled
          handleChange={e => handleChange(e)}
        />
        <OakText
          data={appData}
          id="name"
          label="Application name"
          disabled
          handleChange={e => handleChange(e)}
        />
        <OakText
          data={appData}
          id="redirect"
          label="Redirect url"
          disabled
          handleChange={e => handleChange(e)}
        />
        <OakText
          data={appData}
          id="jwtpassword"
          label="JWT Password"
          disabled
          handleChange={e => handleChange(e)}
        />
        <OakCheckbox
          data={appData}
          id="protected"
          label="Protected application"
          theme="primary"
          disabled
          handleChange={e => handleChangeCheckbox(e)}
        />
      </div>
      <div className="modal-footer">
        <OakButton
          action={props.toggleVisibilityHandler}
          theme="default"
          variant="appear"
          align="left"
        >
          <i className="material-icons">close</i>Close
        </OakButton>
      </div>
    </>
  );
};

export default AppDetails;
