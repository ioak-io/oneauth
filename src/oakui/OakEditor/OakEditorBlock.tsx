import React, { useEffect, useState } from 'react';
import OakEditorHeading from './OakEditorHeading';
import OakEditorList from './OakEditorList';
import OakEditorParagraph from './OakEditorParagraph';
import OakEditorImage from './OakEditorImage';
import OakEditorBlockType from './types/OakEditorBlockType';

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
const OakEditorBlock = (props: Props) => {
  return (
    <div className="oak-editor-block">
      {props.block.type === OakEditorBlockType.PARAGRAPH && (
        <OakEditorParagraph
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          changeBlockType={props.changeBlockType}
          fixed={props.fixed}
        />
      )}
      {props.block.type === OakEditorBlockType.LIST && (
        <OakEditorList
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          changeBlockType={props.changeBlockType}
          fixed={props.fixed}
        />
      )}
      {props.block.type === OakEditorBlockType.HEADING && (
        <OakEditorHeading
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          changeBlockType={props.changeBlockType}
          fixed={props.fixed}
        />
      )}
      {props.block.type === OakEditorBlockType.IMAGE && (
        <OakEditorImage
          groupId={props.groupId}
          block={props.block}
          handleChange={props.handleChange}
          add={props.add}
          remove={props.remove}
          moveDown={props.moveDown}
          moveUp={props.moveUp}
          changeBlockType={props.changeBlockType}
          fixed={props.fixed}
        />
      )}
    </div>
  );
};

export default OakEditorBlock;
