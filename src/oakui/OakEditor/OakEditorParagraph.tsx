import React, { useEffect, useState } from 'react';
import './OakEditorParagraph.scss';
import OakEditorPrimaryToolbar from './toolbar/OakEditorPrimaryToolbar';
import OakEditorRichText from './OakEditorRichText';
import OakRichTextControlType from './types/OakRichTextControlType';
import OakEditorToolbar from './toolbar/OakEditorToolbar';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';

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
const OakEditorParagraph = (props: Props) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    OakEditorFocusedEvent.asObservable().subscribe((item) => {
      if (item.groupId === props.groupId) {
        setEditing(item.id === props.block.id);
      }
    });
  }, []);

  const handleFocus = (isFocused: boolean) => {
    if (isFocused) {
      OakEditorFocusedEvent.next({
        groupId: props.groupId,
        id: props.block.id,
      });
    }
  };

  const handleChange = (text: string) => {
    const _newData = { ...props.block.data, text };
    props.handleChange(_newData);
  };

  return (
    <div className="oak-editor-paragraph">
      <OakEditorToolbar
        fixed={props.fixed}
        isActive={editing}
        add={props.fixed ? null : props.add}
        remove={props.fixed ? null : props.remove}
        moveDown={props.fixed ? null : props.moveDown}
        moveUp={props.fixed ? null : props.moveUp}
        changeBlockType={props.fixed ? null : props.changeBlockType}
      />
      <div
        className={`oak-editor-paragraph__input ${
          editing ? 'oak-editor-paragraph__input--editing' : ''
        }`}
      >
        <OakEditorRichText
          blockStyle
          value={props.block?.data?.text}
          controls={[
            OakRichTextControlType.BOLD,
            OakRichTextControlType.ITALIC,
            OakRichTextControlType.UNDERLINE,
            OakRichTextControlType.INCREASE_INDENT,
            OakRichTextControlType.DECREASE_INDENT,
            OakRichTextControlType.BULLET_LIST,
            OakRichTextControlType.ORDERED_LIST,
            OakRichTextControlType.STRIKE,
            OakRichTextControlType.FONT_SIZE,
          ]}
          handleChange={handleChange}
          handleFocus={handleFocus}
        />
      </div>
    </div>
  );
};

export default OakEditorParagraph;
