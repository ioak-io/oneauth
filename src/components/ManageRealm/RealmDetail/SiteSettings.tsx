import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, Input, Radio } from 'basicui';
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
    props.onChange({ ...props.site, [event.currentTarget.name]: event.currentTarget.value });
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
          <div className="">
            <Radio
            label=""
              // onChange={onChange}
              // id="full"
              // name="full"
              // value="full"
              // checked={props.site.layout === "full"}
            >
              Full page
            </Radio>
            {/* <Radio onChange={onChange} id="split" name="split" checked={props.site.layout === "split"}>
              Split Section
            </Radio> */}
          </div>
          {/* <div className="">
            <Radio onChange={onChange} id="none" name="none" checked={props.site.borderRadius === "none"}>
              None
            </Radio>
            <Radio onChange={onChange} id="small" name="small" checked={props.site.borderRadius === "small"}>
              Small
            </Radio>
            <Radio onChange={onChange} id="medium" name="medium" checked={props.site.borderRadius === "medium"}>
              Medium
            </Radio>
            <Radio onChange={onChange} id="large" name="large" checked={props.site.borderRadius === "large"}>
              Large
            </Radio>
          </div>
          <div className="">
            <Radio onChange={onChange} id="bottom" name="bottom" checked={props.site.signupVariant === "bottom"}>
              Bottom
            </Radio>
            <Radio onChange={onChange} id="top-one-line" name="top-one-line" checked={props.site.signupVariant === "top-one-line"}>
              Top single line
            </Radio>
            <Radio onChange={onChange} id="top-two-line" name="top-two-line" checked={props.site.signupVariant === "top-two-line"}>
              Top multi line
            </Radio>
          </div> */}
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
