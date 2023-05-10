import React, { useEffect, useRef, useState } from 'react';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { Input, Label, Select, SelectPropsConverter, Textarea } from 'basicui';
import { Editor, Bold, Italic, Underline, HighlightColor, ClearFormatting, BulletList, OrderedList, BlockQuote } from 'writeup';
import MetadataDefinitionModel from '../../../../model/MetadataDefinitionModel';
import DataPicker from './DataPicker';
import { useSelector } from 'react-redux';

interface Props {
  note: NoteModel;
  onChange: any;
  metadataDefinition: MetadataDefinitionModel;
}

const LineItem = (props: Props) => {
  const metadataValueMap = useSelector((state: any) => state.metadataValue?.items);

  const handleChange = (event: any) => {
    event.preventDefault();
    props.onChange({
      ...props.note, [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <div className='metadata-editor-line-item'>
      {props.metadataDefinition.type === 'long-text' &&
        <Textarea label={props.metadataDefinition.name} name={props.metadataDefinition._id} value={props.note[props.metadataDefinition._id || '']} onInput={handleChange} />
      }
      {props.metadataDefinition.type === 'short-text' && !props.metadataDefinition.linkable &&
        <Input label={props.metadataDefinition.name} name={props.metadataDefinition._id} value={props.note[props.metadataDefinition._id || '']} onInput={handleChange} />
      }
      {/* {props.metadataDefinition.type === 'short-text' && props.metadataDefinition.linkable &&
        <DataPicker note={props.note} metadataDefinition={props.metadataDefinition} onChange={handleDataPickerChange} />
      } */}
      {props.metadataDefinition.type === 'short-text' && props.metadataDefinition.linkable &&
        <Select
          autocomplete
          allowNewValues
          label={props.metadataDefinition.name} 
          name={props.metadataDefinition._id || ''}
          value={[props.note[props.metadataDefinition._id || '']]}
          options={SelectPropsConverter.optionsFromSimpleList(metadataValueMap[props.metadataDefinition._id || ''] || [])}
          onInput={handleChange} />
      }
    </div>
  );
};

export default LineItem;
