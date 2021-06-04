import React from 'react';
import './OakEditorBlockTypeToolbar.scss';
import OakEditorToolbarButton from './OakEditorToolbarButton';
import OakEditorBlockType from '../types/OakEditorBlockType';

interface Props {
  handleChange: any;
  handleClose?: any;
}
const OakEditorBlockTypeToolbar = (props: Props) => {
  const _handleChange = (action: OakEditorBlockType) => {
    props.handleChange(action);
  };

  return (
    <div className="oak-editor-block-type-toolbar">
      <OakEditorToolbarButton
        handleClick={() => _handleChange(OakEditorBlockType.HEADING)}
      >
        <svg id="icon-header" viewBox="0 0 12 12">
          <path d="M11.263 11.143c-0.589 0-1.185-0.047-1.781-0.047-0.589 0-1.179 0.047-1.768 0.047-0.228 0-0.335-0.248-0.335-0.442 0-0.596 0.67-0.342 1.018-0.569 0.221-0.141 0.221-0.703 0.221-0.938l-0.007-2.618c0-0.074 0-0.141-0.007-0.208-0.107-0.033-0.228-0.027-0.335-0.027h-4.52c-0.114 0-0.234-0.007-0.342 0.027-0.007 0.067-0.007 0.134-0.007 0.208l-0.007 2.484c0 0.254 0 0.951 0.248 1.098 0.348 0.214 1.138-0.087 1.138 0.516 0 0.201-0.094 0.469-0.328 0.469-0.623 0-1.246-0.047-1.862-0.047-0.569 0-1.138 0.047-1.708 0.047-0.221 0-0.321-0.254-0.321-0.442 0-0.583 0.616-0.342 0.944-0.569 0.214-0.147 0.221-0.723 0.221-0.958l-0.007-0.382v-5.444c0-0.321 0.047-1.353-0.254-1.533-0.335-0.208-1.051 0.114-1.051-0.489 0-0.194 0.087-0.469 0.321-0.469 0.616 0 1.239 0.047 1.855 0.047 0.563 0 1.132-0.047 1.694-0.047 0.241 0 0.335 0.268 0.335 0.469 0 0.576-0.663 0.295-0.991 0.502-0.234 0.141-0.234 0.83-0.234 1.071l0.007 2.143c0 0.074 0 0.141 0.007 0.214 0.087 0.020 0.174 0.020 0.261 0.020h4.681c0.080 0 0.167 0 0.254-0.020 0.007-0.074 0.007-0.141 0.007-0.214l0.007-2.143c0-0.248 0-0.931-0.234-1.071-0.335-0.201-1.004 0.067-1.004-0.502 0-0.201 0.094-0.469 0.335-0.469 0.589 0 1.179 0.047 1.768 0.047 0.576 0 1.152-0.047 1.728-0.047 0.241 0 0.335 0.268 0.335 0.469 0 0.583-0.69 0.288-1.025 0.496-0.228 0.147-0.234 0.837-0.234 1.078l0.007 6.315c0 0.221 0.013 0.804 0.228 0.938 0.342 0.214 1.065-0.060 1.065 0.522 0 0.194-0.087 0.469-0.321 0.469z" />
        </svg>
        Heading
      </OakEditorToolbarButton>
      <OakEditorToolbarButton
        handleClick={() => _handleChange(OakEditorBlockType.PARAGRAPH)}
      >
        <svg id="icon-format_align_left" viewBox="0 0 12 12">
          <path d="M1.5 1.5h9v1.008h-9v-1.008zM1.5 10.5v-1.008h9v1.008h-9zM1.5 6.492v-0.984h9v0.984h-9zM7.5 3.492v1.008h-6v-1.008h6zM7.5 7.5v1.008h-6v-1.008h6z" />
        </svg>
        Paragraph
      </OakEditorToolbarButton>
      <OakEditorToolbarButton
        handleClick={() => _handleChange(OakEditorBlockType.LIST)}
      >
        <svg id="icon-format_list_bulleted" viewBox="0 0 12 12">
          <path d="M3.492 2.508h7.008v0.984h-7.008v-0.984zM3.492 6.492v-0.984h7.008v0.984h-7.008zM3.492 9.492v-0.984h7.008v0.984h-7.008zM1.992 8.25q0.305 0 0.527 0.223t0.223 0.527-0.223 0.527-0.527 0.223-0.527-0.223-0.223-0.527 0.223-0.527 0.527-0.223zM1.992 2.25q0.305 0 0.527 0.211t0.223 0.539-0.223 0.539-0.527 0.211-0.527-0.211-0.223-0.539 0.223-0.539 0.527-0.211zM1.992 5.25q0.305 0 0.527 0.211t0.223 0.539-0.223 0.539-0.527 0.211-0.527-0.211-0.223-0.539 0.223-0.539 0.527-0.211z" />
        </svg>
        List
      </OakEditorToolbarButton>
      <OakEditorToolbarButton
        handleClick={() => _handleChange(OakEditorBlockType.PLAIN_TEXT)}
      >
        <svg id="icon-text_fields" viewBox="0 0 12 12">
          <path d="M10.758 4.5v1.5h-1.5v3.492h-1.5v-3.492h-1.5v-1.5h4.5zM1.242 1.992h6.516v1.5h-2.508v6h-1.5v-6h-2.508v-1.5z" />
        </svg>
        Plain Text
      </OakEditorToolbarButton>
      <OakEditorToolbarButton
        handleClick={() => _handleChange(OakEditorBlockType.IMAGE)}
      >
        <svg id="icon-photo_size_select_actual" viewBox="0 0 12 12">
          <path d="M2.508 8.508h6.984l-2.25-3-1.734 2.25-1.266-1.5zM10.5 1.5q0.375 0 0.691 0.316t0.316 0.691v6.984q0 0.375-0.316 0.691t-0.691 0.316h-9q-0.398 0-0.703-0.305t-0.305-0.703v-6.984q0-0.375 0.316-0.691t0.691-0.316h9z" />
        </svg>
        Image
      </OakEditorToolbarButton>
      <OakEditorToolbarButton
        handleClick={() => _handleChange(OakEditorBlockType.MARKDOWN)}
      >
        <svg id="icon-markdown" viewBox="0 0 12 12">
          <path d="M11.134 9.692h-10.269c-0.478 0-0.865-0.387-0.865-0.865v0-5.655c0-0.478 0.387-0.865 0.865-0.865h10.269c0.478 0 0.865 0.387 0.865 0.865v5.654c0 0 0 0.001 0 0.001 0 0.478-0.387 0.865-0.865 0.865 0 0 0 0 0 0v0zM2.885 7.961v-2.25l1.154 1.442 1.154-1.442v2.25h1.154v-3.923h-1.154l-1.154 1.442-1.154-1.442h-1.154v3.923zM10.616 6h-1.154v-1.961h-1.154v1.961h-1.154l1.73 2.020z" />
        </svg>
        Markdown
      </OakEditorToolbarButton>
      {props.handleClose && (
        <OakEditorToolbarButton handleClick={props.handleClose}>
          <svg id="icon-chevron-left" viewBox="0 0 12 12">
            <path d="M7.853 8.647l-2.647-2.647 2.647-2.647c0.196-0.196 0.196-0.512 0-0.707s-0.512-0.196-0.707 0l-3 3c-0.196 0.196-0.196 0.512 0 0.707l3 3c0.196 0.196 0.512 0.196 0.707 0s0.196-0.512 0-0.707z" />
          </svg>
        </OakEditorToolbarButton>
      )}
    </div>
  );
};

export default OakEditorBlockTypeToolbar;
