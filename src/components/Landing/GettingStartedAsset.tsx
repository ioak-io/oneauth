import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './style.scss';
import Button from '../../oakui/wc/Button';
import { newMessageId, sendMessage } from '../../events/MessageService';
import createAsset from './service';
import { fetchAllAssets } from '../../store/actions/AssetActions';
import OakForm from '../../oakui/wc/OakForm';
import OakTypography from '../../oakui/wc/OakTypography';
import Input from '../../oakui/wc/Input';

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

  const onInput = (event: any) => {
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
          <h2>Setup new asset</div>
          <OakForm handleSubmit={save} formGroupName="create-asset-form">
            <Input
              name="name"
              value={state.name}
              onInput={onInput}
              label="Asset name"
            />
            <Input
              value={state.description}
              name="description"
              onInput={onInput}
              label="Short description"
            />
          </OakForm>
        </>
      )}
      <div className="action-footer position-center">
        {!showCreate && (
          <Button
            theme={ThemeType.default}
            
            onClick={() => setShowCreate(true)}
          >
            Create a new asset
          </Button>
        )}
        {showCreate && (
          <Button theme={ThemeType.primary}  onClick={save}>
            Submit
          </Button>
        )}
        {showCreate && (
          <Button
            theme={ThemeType.default}
            
            onClick={() => setShowCreate(false)}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export default GettingStartedAsset;
