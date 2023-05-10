import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonVariantType, IconButton, ThemeType } from 'basicui';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

interface Props {
  onSave?: any;
  onCancel?: any;
  saving?: boolean;
}

const EditControls = (props: Props) => {

  return (
    <div className='note-section-edit-controls'>
      {props.onSave && <IconButton loading={props.saving} onClick={props.onSave} circle variant={ButtonVariantType.default} theme={ThemeType.primary}>
        <FontAwesomeIcon icon={faCheck} />
      </IconButton>}
      {props.onCancel && <IconButton onClick={props.onCancel} circle variant={ButtonVariantType.default} theme={ThemeType.default}>
        <FontAwesomeIcon icon={faXmark} />
      </IconButton>}
    </div>
  );
};

export default EditControls;
