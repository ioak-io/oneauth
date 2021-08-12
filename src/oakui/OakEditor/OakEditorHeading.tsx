import React, { useEffect, useState } from 'react';
import './OakEditorHeading.scss';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';
import OakEditorToolbar from './toolbar/OakEditorToolbar';

interface Props {
  groupId: string;
  block: any;
  handleChange: any;
  changeBlockType: any;
  moveDown?: any;
  moveUp?: any;
  remove?: any;
  add?: any;
  fixed?: boolean;
}
const OakEditorHeading = (props: Props) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    OakEditorFocusedEvent.asObservable().subscribe((item) => {
      console.log(item, props.groupId, props.block.id);
      if (item.groupId === props.groupId) {
        setEditing(item.id === props.block.id);
      }
    });
  }, []);

  const handleFocus = () => {
    OakEditorFocusedEvent.next({
      groupId: props.groupId,
      id: props.block.id,
    });
  };

  const handleHeadingLevelChange = (level: number) => {
    const _newData = { ...props.block.data, level };
    props.handleChange(_newData);
  };

  const handleChange = (event: any) => {
    const _newData = { ...props.block.data, text: event.currentTarget.value };
    props.handleChange(_newData);
  };

  return (
    <div className="oak-editor-heading">
      <OakEditorToolbar
        fixed={props.fixed}
        isActive={editing}
        add={props.add}
        remove={props.remove}
        moveDown={props.moveDown}
        moveUp={props.moveUp}
        headingLevelOne={props.fixed ? null : () => handleHeadingLevelChange(1)}
        headingLevelTwo={() => handleHeadingLevelChange(2)}
        headingLevelThree={() => handleHeadingLevelChange(3)}
        headingLevelFour={() => handleHeadingLevelChange(4)}
        changeBlockType={props.changeBlockType}
      />
      <input
        className={`oak-editor-heading__input oak-editor-heading__input--level-${
          props.block.data.level || 1
        } ${editing ? 'oak-editor-heading__input--editing' : ''}`}
        placeholder="Start typing content..."
        value={props.block.data.text}
        onFocus={handleFocus}
        onChange={handleChange}
      />
    </div>
  );
};

export default OakEditorHeading;
