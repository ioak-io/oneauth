import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';
import LineItem from './LineItem';

interface Props {
  note: NoteModel;
  group: string;
  onChange: any;
  metadataDefinitionList: MetadataDefinitionModel[];
}

const MetadataEditor = (props: Props) => {
  return (
    <div className="metadata-editor">
    <h5>{props.group}</h5>
    <div className='metadata-editor__main'>
      {props.metadataDefinitionList.map(item =>
        <LineItem onChange={props.onChange} note={props.note} metadataDefinition={item} />
      )}
    </div>
    </div>
  );
};

export default MetadataEditor;
