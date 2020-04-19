import React, { useState, useEffect } from 'react';
import './style.scss';
import Navigation from '../Navigation';
import OakButton from '../../oakui/OakButton';
import OakPopoverMenu from '../../oakui/OakPopoverMenu';
import OakAutoComplete from '../../oakui/OakAutoComplete';
import OakTab from '../../oakui/OakTab';
import OakModal from '../../oakui/OakModal';
import OakDialog from '../../oakui/OakDialog';

interface Props {
  label?: string;
  logout: Function;
}
const tabDetails = [
  { slotName: 'details', label: 'Basic details', icon: 'subject' },
  { slotName: 'description', label: 'Description', icon: 'text_fields' },
];
const ManageSpace = (props: Props) => {
  const [data, setData] = useState({
    autoCompleteDropdownData: [
      { key: 'one', value: 'one odfdf value' },
      { key: 'two', value: 'two value' },
      { key: 'three', value: 'three value' },
      { key: 'four', value: 'four value' },
      { key: 'one1', value: 'one value' },
      { key: 'two2', value: 'two value' },
      { key: 'three3', value: 'three value' },
      { key: 'four4', value: 'four value' },
      { key: 'one9', value: 'one value' },
      { key: 'two9', value: 'two value' },
      { key: 'thre9', value: 'three value' },
      { key: 'fou9r', value: 'four value' },
      { key: 'one0', value: 'one value' },
      { key: 't0wo', value: 'two value' },
      { key: 'thr0ee', value: 'three value' },
      { key: 'fou0r', value: 'four value' },
    ],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const action = () => {
    console.log('action clicked');
  };
  const handleAutoCompleteChange = (value: string) => {
    console.log(value);
  };
  return (
    <div className="app-page">
      <div>
        <Navigation {...props} logout={props.logout} />
      </div>
      <div className="app-container">
        <div className="home">
          <div className="typography-2">Manage space</div>
          <div className="typography-5">Content</div>
          <div>
            <OakButton theme="primary" variant="animate in" icon="add">
              Create
            </OakButton>
          </div>
          <div className="popover-test space-top-4">
            <OakPopoverMenu
              label="dropout menu zsdcsa sd "
              id="popover-test"
              theme="primary"
              elements={[
                {
                  label: 'Task',
                  action,
                  icon: 'library_add_check',
                },
                {
                  label: 'Project',
                  action,
                  icon: 'apps',
                },
                {
                  label: 'Team',
                  action,
                  icon: 'people_alt',
                },
                {
                  label: 'Stage / Lane',
                  action,
                  icon: 'vertical_split',
                },
              ]}
              iconLeft="playlist_add"
              labelVariant="on"
              right
              mobilize
            />
          </div>
          <div className="autocomplete-test">
            <OakAutoComplete
              label="auto complete search"
              handleChange={handleAutoCompleteChange}
              objects={data.autoCompleteDropdownData}
            />
          </div>
          <div className="tab-test">
            <OakTab meta={tabDetails}>
              <div slot="details">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                eget blandit tellus. Nam vel gravida ipsum. Ut porta scelerisque
                neque, at fringilla erat tristique quis. Nunc tellus orci,
                dictum sit amet venenatis et, ornare vel neque. Maecenas
                efficitur congue tristique. Curabitur vitae imperdiet magna.
                Quisque vehicula dui eros, non varius diam luctus a. Phasellus
                lectus sapien, elementum eget orci vitae, dictum fringilla orci.
                Vestibulum id ipsum id lectus elementum blandit. Proin sed eros
                nec lectus egestas iaculis nec eu nisi. Nullam id feugiat magna.
                Etiam lorem massa, scelerisque sed faucibus a, varius eget
                magna. Quisque sit amet dui placerat, luctus orci ut, volutpat
                leo.
              </div>
              <div slot="description">
                Morbi condimentum egestas placerat. Phasellus euismod rutrum
                orci non tristique. Nullam venenatis accumsan ornare. In
                venenatis volutpat scelerisque. Praesent eu risus ac metus
                mattis tempor. Donec luctus ante nec sapien hendrerit
                condimentum. Aliquam suscipit tincidunt justo vitae volutpat.
                Cras tincidunt lorem nec erat bibendum consectetur. Maecenas
                tempus ligula eget varius sollicitudin. Nam dictum leo non
                sapien gravida aliquam. Nullam eget accumsan urna. Morbi
                facilisis dictum dui vel maximus. Fusce enim orci, fermentum
                luctus quam in, tempor rhoncus augue.
              </div>
            </OakTab>
          </div>
          <div>
            <OakButton
              theme="primary"
              variant="animate in"
              icon="add"
              action={() => setModalVisible(true)}
            >
              Modal test
            </OakButton>
          </div>
          <OakModal
            visible={modalVisible}
            toggleVisibility={() => setModalVisible(!modalVisible)}
            label="Testing a modal dialog"
          >
            <div className="modal-body">
              Morbi condimentum egestas placerat. Phasellus euismod rutrum orci
              non tristique. Nullam venenatis accumsan ornare. In venenatis
              volutpat scelerisque. Praesent eu risus ac metus mattis tempor.
              Donec luctus ante nec sapien hendrerit condimentum. Aliquam
              suscipit tincidunt justo vitae volutpat. Cras tincidunt lorem nec
              erat bibendum consectetur. Maecenas tempus ligula eget varius
              sollicitudin. Nam dictum leo non sapien gravida aliquam. Nullam
              eget accumsan urna. Morbi facilisis dictum dui vel maximus. Fusce
              enim orci, fermentum luctus quam in, tempor rhoncus augue.
            </div>
          </OakModal>
        </div>
      </div>
    </div>
  );
};

export default ManageSpace;
