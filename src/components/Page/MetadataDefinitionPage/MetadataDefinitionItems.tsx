/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button, IconButton, Select, SelectPropsConverter, ButtonVariantType, Checkbox } from 'basicui';

import './MetadataDefinitionItems.scss';
import MetadataDefinitionModel from '../../../model/MetadataDefinitionModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  data: MetadataDefinitionModel[];
  handleChange: any;
  handleDelete: any;
  handleAddMetadataDefinition: any;
  formId: string;
}

const MetadataDefinitionItems = (props: Props) => {
  const handleCheckboxChange = (event: any, record: any, index: number) => {
    const _event = {
      currentTarget: {
        ...event.currentTarget,
        name: event.currentTarget.name,
        value: event.currentTarget.checked
      }
    }
    props.handleChange(_event, record, index);
  };

  return (
    <div className="budget-items">
      <div className="budget-items__main">
        <table className="basicui-table">
          <thead>
            <tr>
              <th>Group name</th>
              <th>Attribute name</th>
              <th>Type</th>
              <th>Linkable</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((record: any, index: number) => (
              <tr key={record._id}>
                <td>
                  <Input name="group" value={record.group} onInput={(event: any) => props.handleChange(event, record, index)} />
                </td>
                <td>
                  <Input name="name" value={record.name} onInput={(event: any) => props.handleChange(event, record, index)} />
                </td>
                <td>
                  <Select name="type" options={SelectPropsConverter.optionsFromSimpleList(['short-text', 'long-text'])} value={[record.type]} onInput={(event: any) => props.handleChange(event, record, index)} />
                </td>
                <td>
                  {record.type === 'short-text' && <Checkbox name="linkable" defaultChecked={record.linkable} onInput={(event: any) => handleCheckboxChange(event, record, index)} />}
                </td>
                <td>
                  <div className="table-actions">
                    <IconButton variant={ButtonVariantType.outline} onClick={() => props.handleDelete(record)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MetadataDefinitionItems;
