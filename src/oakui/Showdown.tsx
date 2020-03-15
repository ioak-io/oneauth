import React from 'react';
import showdown from 'showdown';
import './styles/Showdown.scss';

interface Props {
  source: string;
}
const Showdown = (props: Props) => {
  const converter = new showdown.Converter({ tables: true });
  const html = converter.makeHtml(props.source);
  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default Showdown;
