import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RecentNote.scss';
import NoteModel from '../../../model/NoteModel';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveNote } from '../NotePage/service';
import { getRecentlyCreatedNote } from './service';
import MetadataEditor from '../../../components/Note/sections/MetadataEditor';
import MetadataDefinitionModel from '../../../model/MetadataDefinitionModel';
import MetadataViewer from '../../../components/Note/sections/MetadataViewer';
import LabelViewer from '../../../components/Note/sections/LabelViewer';
import LabelEditor from '../../../components/Note/sections/LabelEditor';

interface Props {
  editable: boolean;
  note: NoteModel;
  onChange: any;
}

const RecentNote = (props: Props) => {

  const metadataDefinitionList = useSelector((state: any) => state.metadataDefinition.items);
  const [metadataDefinitionMap, setMetadataDefinitionMap] = useState<any>({});

  useEffect(() => {
    const _metadataDefinitionMap: any = {};
    metadataDefinitionList.forEach((item: MetadataDefinitionModel) => {
      if (_metadataDefinitionMap[item.group]) {
        _metadataDefinitionMap[item.group].push(item);
      } else {
        _metadataDefinitionMap[item.group] = [item];
      }
    })
    setMetadataDefinitionMap(_metadataDefinitionMap);
  }, [metadataDefinitionList]);

  const handleLabelChange = (labelsData: any) => {
    props.onChange({ ...props.note, ...labelsData });
  };

  return (
    <div className={`recent-note  ${props.editable ? 'recent-note--editable' : ''}`}>
      {!props.editable && <LabelViewer note={props.note} />}
      {props.editable && <LabelEditor note={props.note} onChange={handleLabelChange} />}
      {Object.keys(metadataDefinitionMap).map(group => <>
        {!props.editable && <MetadataViewer key={group} note={props.note} group={group} metadataDefinitionList={metadataDefinitionMap[group]} />}
        {props.editable && <MetadataEditor key={group} onChange={props.onChange} note={props.note} group={group} metadataDefinitionList={metadataDefinitionMap[group]} />}
      </>
      )}
    </div>
  );
};

export default RecentNote;
