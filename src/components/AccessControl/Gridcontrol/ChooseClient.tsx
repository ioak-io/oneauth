/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ChooseClient.scss';
import OakCheckbox from '../../../oakui/wc/OakCheckbox';
import { mapGridcontrolByRealm } from './RealmService';
import { Button, ThemeType } from 'basicui';

interface Props {
  data: any[];
  clients: any[];
  realm: number;
  handleClose: any;
  handleUpdate: any;
}

const ChooseClient = (props: Props) => {
  const dispatch = useDispatch();
  const authorization = useSelector((state: any) => state.authorization);
  const [choosenRecords, setChoosenRecords] = useState<string[]>([]);

  const handleSelection = (detail: any) => {
    if (detail.value) {
      setChoosenRecords([...choosenRecords, detail.name]);
    } else {
      setChoosenRecords(choosenRecords.filter((item) => item !== detail.name));
    }
  };

  const handleSave = () => {
    mapGridcontrolByRealm(props.realm, choosenRecords).then(() => {
      props.handleUpdate();
    });
  };

  return (
    <div className="choose-client">
      <div className="choose-client__header">
        <div className="control-grid__action">
          {choosenRecords.length > 0 && (
            <>
              <Button
                onClick={handleSave}
                theme={ThemeType.primary}
              >
                Link choosen clients
              </Button>
              <Button
                onClick={() => setChoosenRecords([])}
                
              >
                Clear
              </Button>
            </>
          )}
          <Button
            onClick={props.handleClose}
            
          >
            Cancel
          </Button>
        </div>
      </div>
      <div className="choose-client__main">
        <table>
          <thead>
            <tr>
              <th> </th>
              <th>Client name</th>
              <th>Client description</th>
            </tr>
          </thead>
          <tbody>
            {props.clients?.map((item) => (
              <tr
                key={item._id}
                className={
                  choosenRecords.includes(item.client_id)
                    ? 'choose-client__main__record choose-client__main__record--active'
                    : 'choose-client__main__record'
                }
              >
                <td>
                  <div className="context-action">
                    <OakCheckbox
                      value={choosenRecords.includes(item.client_id)}
                      name={item.client_id}
                      onInput={handleSelection}
                    />
                  </div>
                </td>
                <td
                  onClick={() =>
                    handleSelection({
                      name: item.client_id,
                      value: !choosenRecords.includes(item.client_id),
                    })
                  }
                >
                  {item.name}
                </td>
                <td
                  onClick={() =>
                    handleSelection({
                      name: item.client_id,
                      value: !choosenRecords.includes(item.client_id),
                    })
                  }
                >
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ChooseClient;
