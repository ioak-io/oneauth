import React from 'react';
import './style.scss';
import OakButton from '../../oakui/wc/OakButton';
import OakTypography from '../../oakui/wc/OakTypography';

interface Props {
  history: any;
}

const GettingStartedRealm = (props: Props) => {
  const goToCreatePage = () => {
    props.history.push('/asset/create');
  };
  return (
    <div className="getting-started">
      <div>
        <OakTypography variant="h2">Getting Started</OakTypography>
        <div className="getting-started--steps realm-top-2">
          <div className="typography-7">Create Realm</div>
          <div className="typography-4">
            An asset represents an application or product being supported.
            Create an asset to get started with the process of onboarding your
            product into Oneauth.
          </div>
          <div className="typography-7">Set Oneauth URL in your product</div>
          <div className="typography-4">
            To provide seemless experience to your users, add a link from your
            product to Oneauth. By triggering a button for example from your
            product, your users will be securely transferred to Oneauth with
            their details.
          </div>
          <div className="typography-7">
            Securely transmit user information to Oneauth
          </div>
          <div className="typography-4">
            When you redirect from your product, transmit the user information
            like email and name securely using JWT tokens. Password for JWT is
            set by you during the asset creation process.
          </div>
        </div>
      </div>
      <div className="action-footer position-center">
        <OakButton
          theme="primary"
          variant="disappear"
          handleClick={goToCreatePage}
        >
          Create a new realm
        </OakButton>
      </div>
    </div>
  );
};

export default GettingStartedRealm;
