import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import {Input} from 'basicui';
import './SiteSettings.scss';
import { updateRealm } from '../../../store/actions/RealmActions';
import { newId } from '../../../events/MessageService';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../oakui/wc/OakRadio';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';
import OakImageUpload from '../../../oakui/wc/OakImageUpload';

interface Props {
  site: any;
  onInput: any;
  handleUploadChange: any;
}

const SiteSettings = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state: any) => state.authorization);

  const onInput = (detail: any) => {
    props.onInput({ ...props.site, [detail.name]: detail.value });
  };

  const handleImageChange = (detail: any) => {
    props.handleUploadChange(detail.name, detail.value);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <div>
      <h6>
        <div className="title-section">
          <FontAwesomeIcon icon={faPalette} />
          Login page design
        </div>
      </h6>
      <div className="title-gutter-bottom" />
      <div className="site-settings">
        <div className="site-settings__form">
          <OakRadioGroup
            name="layout"
            radioGroupName={`layout-${groupId}`}
            value={props.site.layout}
            label="Layout"
            onInput={onInput}
          >
            <div className="">
              <OakRadio radioGroupName={`layout-${groupId}`} name="full">
                Full page
              </OakRadio>
              <OakRadio radioGroupName={`layout-${groupId}`} name="split">
                Split Section
              </OakRadio>
            </div>
          </OakRadioGroup>
          <OakRadioGroup
            name="borderRadius"
            radioGroupName={`borderRadius-${groupId}`}
            value={props.site.borderRadius}
            label="Roundness"
            onInput={onInput}
          >
            <div className="">
              <OakRadio radioGroupName={`borderRadius-${groupId}`} name="none">
                None
              </OakRadio>
              <OakRadio radioGroupName={`borderRadius-${groupId}`} name="small">
                Small
              </OakRadio>
              <OakRadio
                radioGroupName={`borderRadius-${groupId}`}
                name="medium"
              >
                Medium
              </OakRadio>
              <OakRadio radioGroupName={`borderRadius-${groupId}`} name="large">
                Large
              </OakRadio>
            </div>
          </OakRadioGroup>
          <OakRadioGroup
            name="signupVariant"
            radioGroupName={`signupVariant-${groupId}`}
            value={props.site.signupVariant}
            label="Signup link placement"
            onInput={onInput}
          >
            <div className="">
              <OakRadio
                radioGroupName={`signupVariant-${groupId}`}
                name="bottom"
              >
                Bottom
              </OakRadio>
              <OakRadio
                radioGroupName={`signupVariant-${groupId}`}
                name="top-one-line"
              >
                Top single line
              </OakRadio>
              <OakRadio
                radioGroupName={`signupVariant-${groupId}`}
                name="top-two-line"
              >
                Top multi line
              </OakRadio>
            </div>
          </OakRadioGroup>
          <Input
            value={props.site.background}
            name="background"
            label="Background"
            type="text"
            onInput={onInput}
          />
          {props.site.layout === 'full' && props.site.background && (
            <OakCheckbox
              name="container"
              value={props.site.container}
              onInput={onInput}
            >
              Enclose form inside a container
            </OakCheckbox>
          )}
        </div>
        <div className="site-settings__image">
          <div className="site-settings__image__logo">
            Logo
            <OakImageUpload
              toolbarPosition="top"
              name="logo"
              value=""
              onInput={handleImageChange}
            />
          </div>
          <div className="site-settings__image__background">
            Background
            <OakImageUpload
              toolbarPosition="top"
              name="background"
              value=""
              initialFile={props.site.background}
              onInput={handleImageChange}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default SiteSettings;
