import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { base64ToFile } from '@oakui/core-stage/service/OakImageService';
import './SiteSettings.scss';
import { updateRealm } from '../../../actions/RealmActions';
import OakInput from '../../../oakui/wc/OakInput';
import OakButton from '../../../oakui/wc/OakButton';
import OakForm from '../../../oakui/wc/OakForm';
import OakSection from '../../../oakui/wc/OakSection';
import { newId } from '../../../events/MessageService';
import OakTypography from '../../../oakui/wc/OakTypography';
import OakRadioGroup from '../../../oakui/wc/OakRadioGroup';
import OakRadio from '../../../oakui/wc/OakRadio';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';
import OakImageUpload from '../../../oakui/wc/OakImageUpload';

interface Props {
  site: any;
  handleChange: any;
  handleUploadChange: any;
}

const SiteSettings = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state: any) => state.authorization);

  const handleInput = (detail: any) => {
    props.handleChange({ ...props.site, [detail.name]: detail.value });
  };

  const handleImageChange = (detail: any) => {
    props.handleUploadChange(detail.name, detail.value);
  };

  const [groupId, setGroupId] = useState(newId());

  return (
    <OakSection
      fillColor="container"
      rounded
      paddingHorizontal={3}
      paddingVertical={3}
      elevation={1}
    >
      <OakTypography variant="h6">
        <div className="title-section">
          <FontAwesomeIcon icon={faPalette} />
          Login page design
        </div>
      </OakTypography>
      <div className="title-gutter-bottom" />
      <div className="site-settings">
        <div className="site-settings__form">
          <OakRadioGroup
            name="layout"
            radioGroupName={`layout-${groupId}`}
            value={props.site.layout}
            label="Layout"
            handleChange={handleInput}
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
            handleChange={handleInput}
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
            handleChange={handleInput}
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
          <OakInput
            formGroupName={formId}
            value={props.site.background}
            name="background"
            label="Background"
            type="text"
            minLength={1}
            handleInput={handleInput}
          />
          {props.site.layout === 'full' && props.site.background && (
            <OakCheckbox
              name="container"
              value={props.site.container}
              handleChange={handleInput}
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
              handleChange={handleImageChange}
            />
          </div>
          <div className="site-settings__image__background">
            Background
            <OakImageUpload
              toolbarPosition="top"
              name="background"
              value=""
              initialFile={props.site.background}
              handleChange={handleImageChange}
            />
          </div>
        </div>
      </div>
    </OakSection>
  );
};

export default SiteSettings;
