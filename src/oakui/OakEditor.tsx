import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import './styles/oak-editor.scss';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Warning } from '@material-ui/icons';

interface Props {
  id: string;
  data: any;
  errorData?: any;
  handleChange: any;
  bubble?: boolean;
  label?: string;
}
const OakEditor = (props: Props) => {
  const [blockApiChangeEvents, setBlockApiChangeEvents] = useState(true);
  const modules = {
    toolbar: [
      [
        'bold',
        'italic',
        'underline',
        'strike',
        { align: 'left' },
        { align: 'center' },
        { align: 'right' },
        { align: 'justify' },
        // { header: 1 },
        // { header: 2 },
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        { color: [] },
        { background: [] },
        // 'blockquote',
        'code-block',
        { header: [1, 2, 3, 4, 5, 6, false] },
        { font: [] },
        // 'clean',
        'image',
      ],
    ],
  };
  // toolbarBkp: [
  //   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  //   ['blockquote', 'code-block'],

  //   [{ header: 1 }, { header: 2 }], // custom button values
  //   [{ list: 'ordered' }, { list: 'bullet' }],
  //   [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  //   [{ direction: 'rtl' }], // text direction

  //   [{ header: [1, 2, 3, 4, 5, 6, false] }],

  //   [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  //   [{ font: [] }],
  //   [{ align: [] }],

  //   ['clean'], // remove formatting button
  // ],

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'color',
    'font',
    'code-block',
    'link',
    'image',
    'background',
    'align',
  ];
  const handleChange = (value, delta, source) => {
    if (source === 'api' && blockApiChangeEvents) {
      setBlockApiChangeEvents(false);
    } else {
      props.handleChange({
        target: {
          name: props.id,
          value,
        },
      });
    }
  };
  return (
    <div className={props.bubble ? 'oak-editor bubble' : 'oak-editor'}>
      <label>{props.label}</label>
      <ReactQuill
        value={props.data[props.id]}
        onChange={handleChange}
        theme={props.bubble ? 'bubble' : 'snow'}
        modules={modules}
        formats={formats}
      />
      {props.errorData && props.errorData[props.id] && (
        <div className="text-field-error">
          <Warning />
          {props.errorData[props.id]}
        </div>
      )}
    </div>
  );
};

export default OakEditor;
