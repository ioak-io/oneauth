import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OakText from '../../oakui/OakText';
import OakButton from '../../oakui/OakButton';
import { updateSpace } from '../../actions/SpaceActions';
import { isEmptyOrSpaces } from '../Utils';
import { sendMessage } from '../../events/MessageService';

interface Props {
  space: any;
  toggleVisibilityHandler: Function;
}

const EditSpace = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector(state => state.authorization);
  const [spaceData, setSpaceData] = useState({
    name: '',
  });

  useEffect(() => {
    setSpaceData(props.space);
  }, [props.space]);

  const handleChange = event => {
    setSpaceData({
      ...spaceData,
      [event.target.name]: event.target.value,
    });
  };

  const validateEmptyText = (text, message) => {
    if (isEmptyOrSpaces(text)) {
      sendMessage('notification', true, {
        type: 'failure',
        message,
        duration: 5000,
      });
      return false;
    }
    return true;
  };

  const editSpace = () => {
    if (validateEmptyText(spaceData.name, 'Space name cannot be empty')) {
      dispatch(updateSpace(authorization, spaceData));
    }
  };

  return (
    <>
      <div className="modal-body">
        <OakText
          label="Space Name"
          data={spaceData}
          id="name"
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
          <i className="material-icons">close</i>Cancel
        </OakButton>
        <OakButton
          theme="primary"
          action={editSpace}
          variant="animate none"
          align="right"
        >
          <i className="material-icons">double_arrow</i>Update
        </OakButton>
      </div>
    </>
  );
};

export default EditSpace;
