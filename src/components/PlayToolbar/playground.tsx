import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AccessAlarmRounded,
  FingerprintRounded,
  HomeRounded,
  LocalGroceryStoreRounded,
} from '@material-ui/icons';

import './style.scss';
import OakTypography from '../../oakui/wc/OakTypography';
import OakSection from '../../oakui/wc/OakSection';
import OakSelect from '../../oakui/wc/OakSelect';
import OakButton from '../../oakui/wc/OakButton';
import OakInput from '../../oakui/wc/OakInput';
import OakSheet from '../../oakui/wc/OakSheet';
import OakFormActionsContainer from '../../oakui/wc/OakFormActionsContainer';
import OakDivider from '../../oakui/wc/OakDivider';
import OakCheckbox from '../../oakui/wc/OakCheckbox';
import OakToolbar from '../../oakui/wc/OakToolbar';

interface Props {
  match: any;
  history: any;
}

const Playground = (props: Props) => {
  const [state, setState] = useState<any>({
    fillColor: 'container',
    elevation: 0,
    borderVariant: 'both',
    paddingHorizontal: 1,
    paddingVertical: 1,
  });

  const [radioValue, setRadioValue] = useState('one');
  const [isOpen, setIsOpen] = useState(false);
  const [isValidationSettingsOpen, setIsValidationSettingsOpen] = useState(
    false
  );

  const handleChange = (detail: any) => {
    setState({ ...state, [detail.name]: detail.value });
  };

  const validatorFunction = (_, __, value: any): string[] => {
    if (state.validatorFunction) {
      const outcome: string[] = [];
      outcome.push(state.validatorFunction);
      return outcome;
    }
    return [];
  };

  return (
    <div className="tab-playground">
      <OakSheet
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        fillColor="surface"
        sizeHorizontal="full"
      >
        <OakSection fillColor="none" outlineColor="none" rounded fullWidth>
          <OakSelect
            label="fillColor"
            value={state.fillColor}
            options={[
              'none',
              'global',
              'container',
              'surface',
              'float',
              'default',
              'info',
              'invert',
            ]}
            name="fillColor"
            handleChange={handleChange}
            gutterBottom
          />
          <OakSelect
            label="borderVariant"
            value={state.borderVariant}
            options={['top', 'bottom', 'both', 'none']}
            name="borderVariant"
            handleChange={handleChange}
            gutterBottom
          />
          <OakInput
            type="number"
            name="elevation"
            label="elevation"
            value={state.elevation}
            min={0}
            max={24}
            gutterBottom
            handleInput={handleChange}
          />
          <OakInput
            type="number"
            name="paddingHorizontal"
            label="paddingHorizontal"
            value={state.paddingHorizontal}
            gutterBottom
            handleInput={handleChange}
          />
          <OakInput
            type="number"
            name="paddingVertical"
            label="paddingVertical"
            value={state.paddingVertical}
            gutterBottom
            handleInput={handleChange}
          />
        </OakSection>
      </OakSheet>
      <div className="toolbar-content">
        <OakToolbar
          elevation={state.elevation}
          fillColor={state.fillColor}
          borderVariant={state.borderVariant}
          paddingHorizontal={state.paddingHorizontal}
          paddingVertical={state.paddingVertical}
        >
          <div slot="left">
            <div className="toolbar-content__left">
              <HomeRounded />
              <AccessAlarmRounded />
              <div>Options</div>
            </div>
          </div>
          <div slot="right">
            <FingerprintRounded />
            <LocalGroceryStoreRounded />
          </div>
        </OakToolbar>
      </div>
      <br />
      <OakFormActionsContainer align="left">
        <OakButton
          theme="info"
          variant="appear"
          handleClick={() => setIsOpen(true)}
          size="xsmall"
        >
          Component settings
        </OakButton>
      </OakFormActionsContainer>
    </div>
  );
};

export default Playground;
