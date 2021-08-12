import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import OakButton from '../../oakui/wc/OakButton';
import { newMessageId, sendMessage } from '../../events/MessageService';
import createAsset from './service';
import { fetchAllAssets } from '../../actions/AssetActions';
import OakForm from '../../oakui/wc/OakForm';
import OakTypography from '../../oakui/wc/OakTypography';
import OakInput from '../../oakui/wc/OakInput';

interface Props {
  history: any;
}

const GettingStartedAsset = (props: Props) => {
  const dispatch = useDispatch();
  const [showCreate, setShowCreate] = useState(false);
  const [state, setState] = useState({
    name: '',
    description: '',
  });

  const handleChange = (event: any) => {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const save = async () => {
    const jobId = newMessageId();
    sendMessage('notification', true, {
      id: jobId,
      type: 'running',
      message: `Creating asset [${state.name}]`,
    });
    const response = await createAsset({
      ...state,
      reference: state.name.toLowerCase().replace(/\s/g, '').replace(/\W/g, ''),
    });
    console.log(response);
    if (response.status === 200) {
      sendMessage('notification', true, {
        id: jobId,
        type: 'success',
        message: `Asset [${state.name}] saved successfully`,
        duration: 3000,
      });
      dispatch(fetchAllAssets());
      setState({ name: '', description: '' });
      setShowCreate(false);
    }
  };

  return (
    <div className="getting-started">
      {!showCreate && (
        <div>
          <div className="getting-started--steps realm-top-2">
            <div className="typography-7">
              Are you new and need to get started?
            </div>
            <div className="typography-4">
              An asset represents an application or product being supported.
              Create an asset to get started with the process of onboarding your
              product into Oneauth.
            </div>
          </div>
        </div>
      )}
      {showCreate && (
        <>
          <OakTypography variant="h2">Setup new asset</OakTypography>
          <OakForm handleSubmit={save} formGroupName="create-asset-form">
            <OakInput
              name="name"
              value={state.name}
              handleChange={handleChange}
              label="Asset name"
            />
            <OakInput
              value={state.description}
              name="description"
              handleChange={handleChange}
              label="Short description"
            />
          </OakForm>
        </>
      )}
      <div className="action-footer position-center">
        {!showCreate && (
          <OakButton
            theme="default"
            variant="appear"
            handleClick={() => setShowCreate(true)}
          >
            Create a new asset
          </OakButton>
        )}
        {showCreate && (
          <OakButton theme="primary" variant="appear" handleClick={save}>
            Submit
          </OakButton>
        )}
        {showCreate && (
          <OakButton
            theme="default"
            variant="appear"
            handleClick={() => setShowCreate(false)}
          >
            Cancel
          </OakButton>
        )}
      </div>
    </div>
  );
};

export default GettingStartedAsset;
