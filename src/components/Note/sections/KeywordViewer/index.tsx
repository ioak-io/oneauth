import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';
import NoteModel from '../../../../model/NoteModel';
import { ButtonVariantType, IconButton, Input, Link, ThemeType } from 'basicui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faMinus, faPlus, faSearch, faTrash, faUnlink, faXmark } from '@fortawesome/free-solid-svg-icons';
import { AutoLinkViewModel } from '../../AutoLinksSection/AutoLinkViewModel';

interface Props {
  keywords?: string[];
}

const KeywordViewer = (props: Props) => {

  return (<>
    {props.keywords && <div className="keyword-viewer">
      {props.keywords.map(item =>
        <div key={item} className="keyword-viewer__item">
          {item}
        </div>
      )}
    </div>}
  </>
  )
};

export default KeywordViewer;
