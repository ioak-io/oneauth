import React, { useEffect, useState } from 'react';
import './OakEditorListGroup.scss';
import OakEditorRichText from './OakEditorRichText';
import OakRichTextControlType from './types/OakRichTextControlType';
import { OakEditorFocusedEvent } from './OakEditorFocusedEvent';
import OakEditorInlineButton from './OakEditorInlineButton';

interface Props {
  counterPrefix?: string;
  groupId: string;
  id: string;
  items: any;
  sourceItems: any;
  handleChange: any;
  fixed?: boolean;
}
const OakEditorListGroup = (props: Props) => {
  const handleFocus = (isFocused: boolean) => {
    if (isFocused) {
      OakEditorFocusedEvent.next({
        groupId: props.groupId,
        id: props.id,
      });
    }
  };

  const decreaseIndent = (item: any) => {
    handleChange(item, { level: 1 });
  };

  const increaseIndent = (item: any) => {
    handleChange(item, { level: 2 });
  };

  const handleChange = (item: any, delta: any) => {
    const _newData = [...props.sourceItems];
    _newData.forEach((localItem, index: number) => {
      if (localItem.id === item.id) {
        _newData[index] = { ...localItem, ...delta };
      }
    });

    props.handleChange(_newData);
  };

  const handleTextChange = (text: string, item: any) => {
    handleChange(item, { text });
  };

  return (
    <div className="oak-editor-list-group">
      {props.items.map((item: any, index: number) => (
        <>
          {Array.isArray(item) && (
            <OakEditorListGroup
              counterPrefix={`${
                props.counterPrefix ? `${props.counterPrefix}.${index}` : index
              }`}
              groupId={props.groupId}
              id={props.id}
              items={item}
              sourceItems={props.sourceItems}
              handleChange={props.handleChange}
            />
          )}
          {!Array.isArray(item) && (
            <div className="oak-editor-list-group__item">
              <div className="oak-editor-list-group__item__action">
                {item.level}--{item.text}
                <OakEditorInlineButton handleClick={() => decreaseIndent(item)}>
                  &lt;
                </OakEditorInlineButton>
                <OakEditorInlineButton handleClick={() => increaseIndent(item)}>
                  &gt;
                </OakEditorInlineButton>
                <OakEditorInlineButton handleClick={decreaseIndent}>
                  A
                </OakEditorInlineButton>
                <OakEditorInlineButton handleClick={decreaseIndent}>
                  X
                </OakEditorInlineButton>
              </div>
              <div className="oak-editor-list-group__item__bullet">
                {`${
                  props.counterPrefix
                    ? `${props.counterPrefix}.${index + 1}`
                    : index + 1
                }`}
              </div>
              <div className="oak-editor-list-group__item__input">
                <OakEditorRichText
                  blockStyle
                  value={item.text}
                  controls={[
                    OakRichTextControlType.BOLD,
                    OakRichTextControlType.ITALIC,
                    OakRichTextControlType.UNDERLINE,
                  ]}
                  handleChange={(text: string) => handleTextChange(text, item)}
                  handleFocus={handleFocus}
                />
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default OakEditorListGroup;
