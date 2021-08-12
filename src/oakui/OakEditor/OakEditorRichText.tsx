import React, { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import { newId } from '../../events/MessageService';
import './OakEditorRichText.scss';
import OakRichTextControlType from './types/OakRichTextControlType';

interface Props {
  blockStyle?: boolean;
  onDemandDataRefreshEvent?: boolean;
  value: any;
  handleChange: any;
  handleFocus?: any;
  controls: OakRichTextControlType[];
}
const OakEditorRichText = (props: Props) => {
  const [quillInstance, setQuillInstance] = useState<any>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (props.value !== null && props.value !== undefined && !quillInstance) {
      init();
    }
  }, [props.value]);

  useEffect(() => {
    if (quillInstance && props.value) {
      const delta = quillInstance.clipboard.convert(props.value);
      quillInstance.setContents(delta, 'silent');
    }
  }, [props.onDemandDataRefreshEvent]);

  const id = `id-${newId()}`;

  const getToolbarOptions = () => {
    const toolbarOptions: any[] = props.controls.map((control) =>
      translateControl(control)
    );
    // [
    //   { list: 'ordered' },
    //   { list: 'bullet' },
    //   { indent: '-1' },
    //   { indent: '+1' },
    //   { size: ['small', false, 'large', 'huge'] },
    // ],

    return toolbarOptions;
  };

  const translateControl = (control: OakRichTextControlType) => {
    switch (control) {
      case OakRichTextControlType.BOLD:
        return 'bold';
      case OakRichTextControlType.ITALIC:
        return 'italic';
      case OakRichTextControlType.UNDERLINE:
        return 'underline';
      case OakRichTextControlType.STRIKE:
        return 'strike';
      case OakRichTextControlType.ORDERED_LIST:
        return { list: 'ordered' };
      case OakRichTextControlType.BULLET_LIST:
        return { list: 'bullet' };
      case OakRichTextControlType.DECREASE_INDENT:
        return { indent: '-1' };
      case OakRichTextControlType.INCREASE_INDENT:
        return { indent: '+1' };
      case OakRichTextControlType.FONT_SIZE:
        return { size: ['small', false, 'large', 'huge'] };
      default:
        break;
    }
  };

  const init = () => {
    const toolbarOptions = getToolbarOptions();
    const quill: any = new Quill(`#${id}`, {
      theme: props.blockStyle ? 'bubble' : 'snow',
      placeholder: 'Start typing content...',
      modules: {
        toolbar: toolbarOptions?.length > 0 ? toolbarOptions : false,
        keyboard: {
          bindings: {
            tab: {
              key: 9,
              handler: () => {
                return true;
              },
            },
          },
        },
      },
    });
    // quill.root.addEventListener('blur', function () {
    //   console.log('blur');
    //   props.handleChange(quillInstance.root.innerHTML);
    // });
    const delta = quill.clipboard.convert(props.value);
    quill.setContents(delta, 'silent');
    quill.clipboard.addMatcher(
      Node.ELEMENT_NODE,
      function (node: any, delta: any) {
        const plaintext = node.innerText;
        const Delta = Quill.import('delta');
        return new Delta().insert(plaintext);
      }
    );
    setQuillInstance(quill);
  };

  useEffect(() => {
    if (quillInstance) {
      quillListeners();
    }
  }, [quillInstance]);

  const quillListeners = () => {
    quillInstance.on('text-change', function () {
      props.handleChange(quillInstance.root.innerHTML);
    });
    quillInstance.on(
      'selection-change',
      function (range: any, oldRange: any, source: any) {
        setEditing(!!range);
        if (range === null && oldRange !== null) {
          // console.log('manual blur');
          // props.handleChange(quillInstance.root.innerHTML);
        } else if (range !== null && oldRange === null) {
          //
        }
      }
    );
  };

  useEffect(() => {
    if (quillInstance) {
      quillInstance.root.setAttribute('spell-check', editing);
    }
    if (props.handleFocus) {
      props.handleFocus(editing);
    }
  }, [editing]);

  return (
    <div className="oak-editor-rich-text">
      <div id={id} />
    </div>
  );
};

export default OakEditorRichText;
