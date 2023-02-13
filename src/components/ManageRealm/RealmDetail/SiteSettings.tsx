import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Input, Radio, ThemeType } from 'basicui';
import './SiteSettings.scss';
import { updateRealm } from '../../../store/actions/RealmActions';
import { newId } from '../../../events/MessageService';

interface Props {
  site: any;
  onChange: any;
  handleUploadChange: any;
}

const SiteSettings = (props: Props) => {
  const dispatch = useDispatch();
  const formId = newId();
  const authorization = useSelector((state: any) => state.authorization);

  const onChange = (event: any) => {
    console.log(event.currentTarget.name, event.currentTarget.value)
    props.onChange({ ...props.site, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleImageChange = (event: any) => {
    props.handleUploadChange(event.currentTarget.name, event.currentTarget.value);
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
          <div className="">
            <Radio theme={ThemeType.primary}
              onChange={onChange}
              id="layout-full"
              name="layout"
              value="full"
              checked={props.site.layout === "full"}
              label="Full page"
            />
            <Radio theme={ThemeType.primary}
              label="Split Section"
              value="split"
              onChange={onChange}
              id="layout-split"
              name="layout"
              checked={props.site.layout === "split"}
            />
          </div>
          <div className="">
            <Radio theme={ThemeType.primary} label="None" value="none" onChange={onChange} id="borderRadius-none" name="borderRadius" checked={props.site.borderRadius === "none"} />
            <Radio theme={ThemeType.primary} label="Small" value="small" onChange={onChange} id="borderRadius-small" name="borderRadius"
              checked={props.site.borderRadius === "small"}
            />
            <Radio theme={ThemeType.primary} label="Medium" value="medium" onChange={onChange} id="borderRadius-medium" name="borderRadius" checked={props.site.borderRadius === "medium"} />
            <Radio theme={ThemeType.primary} label="Large" value="large" onChange={onChange} id="borderRadius-large" name="borderRadius" checked={props.site.borderRadius === "large"} />
          </div>
          <div className="">
            <Radio theme={ThemeType.primary} label="Bottom" value="bottom" onChange={onChange} id="signupVariant-bottom" name="signupVariant" checked={props.site.signupVariant === "bottom"} />
            <Radio theme={ThemeType.primary} label="Top single line" value="top-one-line" onChange={onChange} id="signupVariant-top-one-line" name="signupVariant" checked={props.site.signupVariant === "top-one-line"} />
            <Radio theme={ThemeType.primary} label="Top multi line" value="top-two-line" onChange={onChange} id="signupVariant-top-two-line" name="signupVariant" checked={props.site.signupVariant === "top-two-line"} />
          </div>
          <Input
            value={props.site.background}
            name="background"
            label="Background"
            type="text"
            onChange={onChange}
          />
          {props.site.layout === 'full' && props.site.background && (
            <Checkbox
              id="container"
              name="container"
              value={props.site.container}
              checked={props.site.container}
              onChange={onChange}
            >
              Enclose form inside a container
            </Checkbox>
          )}
        </div>
        <div className="site-settings__image">
          <div className="site-settings__image__logo">
            Logo
            "upload prompt"
            {/* <OakImageUpload
              toolbarPosition="top"
              name="logo"
              value=""
              onChange={handleImageChange}
            /> */}
          </div>
          <div className="site-settings__image__background">
            Background
            "upload prompt"
            {/* <OakImageUpload
              toolbarPosition="top"
              name="background"
              value=""
              initialFile={props.site.background}
              onChange={handleImageChange}
            /> */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default SiteSettings;
