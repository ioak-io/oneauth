import { Cancel, Close } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import OakCheckbox from '../../oakui/wc/OakCheckbox';
import OakTypography from '../../oakui/wc/OakTypography';
import OakButton from '../../oakui/wc/OakButton';
import OakInput from '../../oakui/wc/OakInput';

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

  const handleChange = (detail: any) => {
    setAppData({
      ...appData,
      [detail.name]: detail.value,
    });
  };

  const handleChangeCheckbox = (detail: any) => {
    setAppData({
      ...appData,
      [detail.name]: detail.checked,
    });
  };

  return (
    <>
      <div slot="modal-body two-column">
        <OakInput
          value={appData._id}
          name="appId"
          placeholder="Application Id"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakInput
          value={appData.name}
          name="name"
          placeholder="Application name"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakInput
          value={appData.redirect}
          name="redirect"
          placeholder="Redirect url"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakInput
          value={appData.jwtpassword}
          name="jwtpassword"
          placeholder="JWT Password"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        />
        <OakCheckbox
          name="protected"
          value={appData.protected}
          size="small"
          handleChange={(e) => handleChange(e)}
          gutterBottom
        >
          <OakTypography variant="caption">Protected application</OakTypography>
        </OakCheckbox>
      </div>
      <div slot="modal-footer">
        <OakButton
          handleClick={props.toggleVisibilityHandler}
          theme="default"
          variant="appear"
          align="left"
        >
          <Cancel fontSize="small" />
          Close
        </OakButton>
      </div>
    </>
  );
};

export default AppDetails;
