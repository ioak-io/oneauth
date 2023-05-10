import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import LabelViewer from '../../sections/LabelViewer';
import { Label } from 'basicui';
import TypeViewer from '../TypeViewer';
import KeywordViewer from '../KeywordViewer';
import ColorViewer from '../ColorViewer';

interface Props {
  note: NoteModel;
}

const HeadViewer = (props: Props) => {
  const [color, setColor] = useState<string | undefined>();
  const noteDictionary = useSelector((state: any) => state.note.map);

  useEffect(() => {
    if (props.note && noteDictionary) { setColor(noteDictionary[props.note.reference]?.color) }
  }, [props.note, noteDictionary]);

  return (
    <div className='head-viewer'>
      <div>
        {/* <Label>Name</Label> */}
        <div className="head-viewer__title">
          {/* <ColorViewer color={color} /> */}
          <TypeViewer note={props.note} />
          {props.note.name}
        </div>
      </div>
      <div>
        <Label>Labels</Label>
        {props.note.labels.length > 0 && <LabelViewer note={props.note} />}
        {props.note.labels.length === 0 && '-'}
      </div>
      <div>
        <Label>Keywords</Label>
        <KeywordViewer keywords={props.note.keywords} />
      </div>
    </div>
  );
};

export default HeadViewer;
