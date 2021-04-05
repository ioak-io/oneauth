import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import OakAutoComplete from '../../oakui/OakAutoComplete';
import OakButton from '../../oakui/wc/OakButton';
import { updatePermittedSpace } from '../../actions/PermittedSpaceAction';
import MapSpaceItem from './MapSpaceItem';
import OakTypography from '../../oakui/wc/OakTypography';
import { Cancel, Close } from '@material-ui/icons';
import OakSelect from '../../oakui/wc/OakSelect';
import OakSpacing from '../../oakui/wc/OakSpacing';

interface Props {
  app: any;
  toggleVisibilityHandler: Function;
}

const MapSpace = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state) => state.authorization);
  const oaSpace = useSelector((state) => state.space);
  const permittedSpace = useSelector((state) => state.permittedSpace);
  const [items, setItems] = useState<undefined | any[]>([{}]);
  const [data, setData] = useState({
    autoCompleteDropdownData: [{}],
  });

  useEffect(() => {
    const spaceList: any[] = [];
    permittedSpace.data?.filter((item) =>
      item.appId === props.app._id ? spaceList.push({ id: item.spaceId }) : ''
    );

    const existingSpacelist: any[] = [];
    const availableSpaceList: any[] = [];
    oaSpace.spaces?.filter((val) => {
      return spaceList.some((item) => {
        return val.spaceId === item.id;
      })
        ? existingSpacelist.push(val)
        : availableSpaceList.push({ id: val.spaceId, value: val.name });
    });

    setItems(existingSpacelist);
    setData({ autoCompleteDropdownData: availableSpaceList });
  }, [permittedSpace.data, oaSpace.spaces]);

  const handleAutoCompleteChange = (detail: any) => {
    dispatch(
      updatePermittedSpace(authorization, {
        appId: props.app._id,
        spaceId: detail.value,
      })
    );
  };

  return (
    <>
      <div className="modal-body">
        <div className="autocomplete-space space-bottom-2">
          <OakSelect
            name="space name"
            value=""
            placeholder="Search by space name"
            handleChange={handleAutoCompleteChange}
            optionsAsKeyValue={data.autoCompleteDropdownData}
          />
        </div>
        <div
          className="oaapp-view space-top-2 space-bottom-4"
          key={oaSpace._id}
        >
          <OakSpacing marginHorizontal={10} paddingHorizontal={6}>
            <OakTypography variant="caption">Name</OakTypography>
            <OakTypography variant="caption">SpaceId</OakTypography>
          </OakSpacing>
          {items?.map((item) => (
            <MapSpaceItem
              appSpaceItem={item}
              appId={props.app._id}
              key={item._id}
            />
          ))}
        </div>
      </div>
      <div className="modal-footer">
        <OakButton
          handleClick={props.toggleVisibilityHandler}
          theme="default"
          variant="appear"
          align="left"
        >
          <Cancel fontSize="small" />
          Close
        </OakButton>
      </div>
    </>
  );
};

export default MapSpace;
