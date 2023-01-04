import React, { useEffect, useState } from 'react';
import './OakEditorToolbar.scss';
import OakEditorBlockType from '../types/OakEditorBlockType';
import OakEditorPrimaryToolbar from './OakEditorPrimaryToolbar';
import OakEditorBlockTypeToolbar from './OakEditorBlockTypeToolbar';
import OakEditorToolbarButton from './OakEditorToolbarButton';

interface Props {
  isActive: boolean;
  changeBlockType?: any;
  moveDown?: any;
  moveUp?: any;
  remove?: any;
  add?: any;
  headingLevelOne?: any;
  headingLevelTwo?: any;
  headingLevelThree?: any;
  headingLevelFour?: any;
  fixed?: boolean;
}
const OakEditorToolbar = (props: Props) => {
  const [contentType, setContentType] = useState<
    'blocktype' | 'navigate' | 'add'
  >('navigate');
  const changeContentType = (type: 'blocktype' | 'navigate' | 'add') => {
    setContentType(type);
  };

  const changeBlockType = (type: OakEditorBlockType) => {
    props.changeBlockType(type);
    setContentType('navigate');
  };

  const addBlock = (type: OakEditorBlockType) => {
    props.add(type);
    setContentType('navigate');
  };

  useEffect(() => {
    if (!props.isActive) {
      setContentType('navigate');
    }
  }, [props.isActive]);

  return (
    <div
      className={`oak-editor-toolbar ${
        props.isActive ? 'oak-editor-toolbar--active' : ''
      }`}
    >
      {contentType === 'navigate' && !props.fixed && (
        <OakEditorPrimaryToolbar
          handleClose={
            props.changeBlockType ? () => changeContentType('blocktype') : null
          }
          add={() => changeContentType('add')}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          headingLevelOne={props.headingLevelOne}
          headingLevelTwo={props.headingLevelTwo}
          headingLevelThree={props.headingLevelThree}
          headingLevelFour={props.headingLevelFour}
        />
      )}
      {contentType === 'blocktype' && !props.fixed && (
        <OakEditorBlockTypeToolbar
          handleChange={changeBlockType}
          handleClose={() => changeContentType('navigate')}
        />
      )}
      {props.isActive && contentType === 'add' && !props.fixed && (
        <OakEditorBlockTypeToolbar
          handleChange={addBlock}
          handleClose={() => changeContentType('navigate')}
        />
      )}
    </div>
  );
};

export default OakEditorToolbar;
