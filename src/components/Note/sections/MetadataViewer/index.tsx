import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import MetadataDefinitionModel from 'src/model/MetadataDefinitionModel';
import LineItem from './LineItem';

interface Props {
  note: NoteModel;
  group: string;
  metadataDefinitionList: MetadataDefinitionModel[];
}

const MetadataViewer = (props: Props) => {
  return (
    <div className="metadata-viewer">
    <h5>{props.group}</h5>
    <div className='metadata-viewer__main'>
      {props.metadataDefinitionList.map(item =>
        <LineItem note={props.note} metadataDefinition={item} />
      )}
    </div>
    </div>
  );
};

export default MetadataViewer;
