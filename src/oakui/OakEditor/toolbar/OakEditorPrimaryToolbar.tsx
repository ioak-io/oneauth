import React, { useState } from 'react';
import './OakEditorPrimaryToolbar.scss';
import OakEditorToolbarButton from './OakEditorToolbarButton';

interface Props {
  moveDown?: any;
  moveUp?: any;
  remove?: any;
  add?: any;
  headingLevelOne?: any;
  headingLevelTwo?: any;
  headingLevelThree?: any;
  headingLevelFour?: any;
  handleClose?: any;
}
const OakEditorPrimaryToolbar = (props: Props) => {
  return (
    <div className="oak-editor-primary-toolbar">
      {props.headingLevelOne && (
        <OakEditorToolbarButton handleClick={props.headingLevelOne}>
          H1
        </OakEditorToolbarButton>
      )}
      {props.headingLevelTwo && (
        <OakEditorToolbarButton handleClick={props.headingLevelTwo}>
          H2
        </OakEditorToolbarButton>
      )}
      {props.headingLevelThree && (
        <OakEditorToolbarButton handleClick={props.headingLevelThree}>
          H3
        </OakEditorToolbarButton>
      )}
      {props.headingLevelFour && (
        <OakEditorToolbarButton handleClick={props.headingLevelFour}>
          H4
        </OakEditorToolbarButton>
      )}
      {props.add && (
        <OakEditorToolbarButton handleClick={props.add}>
          <svg id="icon-add" viewBox="0 0 12 12">
            <path d="M9.492 6.492h-3v3h-0.984v-3h-3v-0.984h3v-3h0.984v3h3v0.984z" />
          </svg>
        </OakEditorToolbarButton>
      )}
      {props.moveDown && (
        <OakEditorToolbarButton handleClick={props.moveDown}>
          <svg id="icon-arrow_downward" viewBox="0 0 12 12">
            <path d="M10.008 6l-4.008 4.008-4.008-4.008 0.727-0.703 2.789 2.789v-6.094h0.984v6.094l2.813-2.789z" />
          </svg>
        </OakEditorToolbarButton>
      )}
      {props.moveUp && (
        <OakEditorToolbarButton handleClick={props.moveUp}>
          <svg id="icon-arrow_upward" viewBox="0 0 12 12">
            <path d="M1.992 6l4.008-4.008 4.008 4.008-0.727 0.703-2.789-2.789v6.094h-0.984v-6.094l-2.813 2.789z" />
          </svg>
        </OakEditorToolbarButton>
      )}
      {props.remove && (
        <OakEditorToolbarButton handleClick={props.remove}>
          <svg id="icon-delete" viewBox="0 0 12 12">
            <path d="M9.492 1.992v1.008h-6.984v-1.008h1.734l0.516-0.492h2.484l0.516 0.492h1.734zM3 9.492v-6h6v6q0 0.398-0.305 0.703t-0.703 0.305h-3.984q-0.398 0-0.703-0.305t-0.305-0.703z" />
          </svg>
        </OakEditorToolbarButton>
      )}
      {props.handleClose && (
        <OakEditorToolbarButton handleClick={props.handleClose}>
          <svg id="icon-create" viewBox="0 0 12 12">
            <path d="M10.359 3.516l-0.914 0.914-1.875-1.875 0.914-0.914q0.141-0.141 0.352-0.141t0.352 0.141l1.172 1.172q0.141 0.141 0.141 0.352t-0.141 0.352zM1.5 8.625l5.531-5.531 1.875 1.875-5.531 5.531h-1.875v-1.875z" />
          </svg>
          Block type
        </OakEditorToolbarButton>
      )}
    </div>
  );
};

export default OakEditorPrimaryToolbar;
