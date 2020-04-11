import React, { ReactNode, useState, useEffect } from 'react';
import './styles/oak-auto-complete.scss';
import OakText from './OakText';

interface Props {
  id: string;
  data: any;
  label: string;
  objects: any;
  handleChange: Function;
}

const OakAutoComplete = (props: Props) => {
  const [searchOn, setSearchOn] = useState(false);
  const [criteria, setCriteria] = useState('');
  const [dropdownFiltered, setDropdownFiltered] = useState<
    [{ key: string; value: string }] | undefined
  >(undefined);

  useEffect(() => {
    updateSearchResults(criteria);
  }, [props.objects]);

  const selected = key => {
    setSearchOn(false);
    props.handleChange(key);
  };

  const handleFocus = () => {
    setSearchOn(true);
  };

  const handleChange = event => {
    setCriteria(event.target.value);
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
      if (!document.getElementById(props.id)?.contains(e.target)) {
        setSearchOn(false);
      }
    });
  }, []);

  return (
    <div className="oak-auto-complete" id={props.id}>
      <div className="search-bar">
        <OakText
          id={props.id}
          data={props.data}
          label={props.label}
          handleFocus={handleFocus}
          handleChange={handleChange}
        />
      </div>
      {searchOn && (
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
