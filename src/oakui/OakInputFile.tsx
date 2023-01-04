import {
  AttachFile,
  CloudUpload,
  CloudUploadOutlined,
  FolderOpen,
} from '@material-ui/icons';
import React, { useState } from 'react';
import { newId } from '../events/MessageService';

import './styles/OakInputFile.scss';

interface Props {
  label?: string;
  id: string;
  data: any;
  handleChange: any;
  placeholder?: string;
  children?: any;
  multiple?: boolean;
}
const OakInputFile = (props: Props) => {
  const [files, setFiles] = useState<any>();
  const [dragClass, setDragClass] = useState('');
  const [id, setId] = useState(newId());

  const chooseFiles = (event: { target: { files: any } }) => {
    processFiles(event.target.files);
  };

  const processFiles = (filesLocal: Iterable<unknown> | ArrayLike<unknown>) => {
    let filesToProcess = Array.from(filesLocal);
    if (!props.multiple && filesToProcess.length > 1) {
      filesToProcess = [filesToProcess[0]];
    }
    setFiles(filesToProcess);
    props.handleChange(filesToProcess);
  };

  const dragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setDragClass('dropping');
  };

  const drop = (event: {
    preventDefault: () => void;
    dataTransfer: { files: any };
  }) => {
    event.preventDefault();
    setDragClass('');
    processFiles(event.dataTransfer.files);
  };

  const dragLeave = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setDragClass('');
  };

  return (
    <div className="oak-input-file">
      {props.label && (
        <label className="oak-input-file--form-label">{props.label}</label>
      )}
      <input
        className="oak-input-file--input"
        id={id}
        type="file"
        onChange={chooseFiles}
        multiple={props.multiple}
        required
      />
      <label
        htmlFor={id}
        className="oak-input-file--label"
        onDragOver={dragOver}
        onDrop={drop}
        onDragLeave={dragLeave}
      >
        {!props.children && (
          <div className={`drop-container ${dragClass}`}>
            {(!files || files.length === 0) && (
              <>
                <CloudUploadOutlined />
                <div>{props.placeholder || 'Drop files / Browse'}</div>
              </>
            )}
            {files && files.length > 0 && (
              <>
                <CloudUpload />
                <div>
                  {`${files.length} file${
                    files.length > 1 ? 's' : ''
                  } selected`}
                </div>
              </>
            )}
          </div>
        )}
        {props.children && (
          <div className="oak-input-file--label--custom">{props.children}</div>
        )}
      </label>
      <div className="oak-input-file--list">
        {files &&
          files.map((item: any) => (
            <div key={item.name} className="oak-input-file--list--item">
              {item.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OakInputFile;
