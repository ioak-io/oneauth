/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import AddSpinnerCommand from '../../events/AddSpinnerCommand';
import RemoveSpinnerCommand from '../../events/RemoveSpinnerCommand';
import { isEmptyOrSpaces } from '../Utils';

interface Props {}

const Spinner = (props: Props) => {
  const [state, setState] = useState<any[]>([]);

  useEffect(() => {
    AddSpinnerCommand.asObservable().subscribe((taskId: string) => {
      if (!isEmptyOrSpaces(taskId)) {
        setState([...state, taskId]);
      }
    });

    RemoveSpinnerCommand.asObservable().subscribe((taskId: string) => {
      setState(state.filter((item) => item !== taskId));
    });
  }, []);

  return (
    <>
      {state.length > 0 && (
        <div className="spinner">
          {/* <BouncingDots /> */}
          Dots
        </div>
      )}
    </>
  );
};

export default Spinner;
