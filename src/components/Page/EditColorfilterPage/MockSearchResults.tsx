import React, { useEffect, useRef, useState } from 'react';
import './MockSearchResults.scss';
import NoteModel from '../../../model/NoteModel';

interface Props {
  mockResults: NoteModel[];
}

const MockSearchResults = (props: Props) => {

  return (
    <>
      <div className="mock-search-results-warning">
        Results shown below are just indicative and based on the current set of data in the system. As the note data changes, results will change accordingly. The final selection of notes by this filter, also depends on the precedence of other filters.
      </div>
      <div className="mock-search-results">
        <div className="mock-search-results__info">Showing {props.mockResults.length} matching results</div>
        {props.mockResults.map(item =>
          <div className="mock-search-results__item" key={item._id}>
            <div className="mock-search-results__item__title">
              {item.name}
            </div>
            <div className="mock-search-results__item__summary">
              {item.summary}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MockSearchResults;
