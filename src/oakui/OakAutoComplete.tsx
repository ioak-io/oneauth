import React, { ReactNode, useState, useEffect } from 'react';
import './styles/oak-auto-complete.scss';
import OakText from './OakText';
import { newId } from '../events/MessageService';

interface Props {
  label?: string;
  placeholder?: string;
  objects: any;
  handleChange: Function;
}

const OakAutoComplete = (props: Props) => {
  const [id, setId] = useState(newId());
  const [searchOn, setSearchOn] = useState(false);
  const [criteria, setCriteria] = useState({
    [id]: '',
  });
  const [dropdownFiltered, setDropdownFiltered] = useState<
    [{ key: string; value: string }] | undefined
  >(undefined);

  useEffect(() => {
    updateSearchResults(criteria[id]);
  }, [props.objects]);

  const selected = key => {
    setSearchOn(false);
    props.handleChange(key);
  };

  const handleFocus = () => {
    setSearchOn(true);
  };

  const handleChange = event => {
    setCriteria({ [event.target.name]: event.target.value });
    updateSearchResults(event.target.value);
  };
  const updateSearchResults = searchCriteria => {
    setDropdownFiltered(
      props.objects.filter(item =>
        item.value?.toLowerCase().includes(searchCriteria.toLowerCase())
      )
    );
  };

  useEffect(() => {
    window.addEventListener('click', (e: any) => {
      if (!document.getElementById(id)?.contains(e.target)) {
        setSearchOn(false);
      }
    });
  }, []);

  return (
    <div className="oak-auto-complete" id={id}>
      <div className="search-bar">
        <OakText
          id={id}
          data={criteria}
          label={props.label}
          handleFocus={handleFocus}
          handleChange={handleChange}
          placeholder={props.placeholder}
        />
      </div>
      {searchOn && dropdownFiltered && dropdownFiltered.length > 0 && (
        <div className="results">
          {dropdownFiltered?.map(item => (
            <div
              className="element"
              key={item.key}
              onClick={() => selected(item.key)}
            >
              {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OakAutoComplete;
