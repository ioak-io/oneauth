import React, { useEffect, useState } from 'react';
import './styles/oak-infinite-scroll.scss';
import { sendMessage } from '../events/MessageService';

interface Props {
  selector?: string;
  children?: any;
  handleChange: any;
}

const OakInfiniteScroll = (props: Props) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    document
      .querySelector(props.selector || '.oak-infinite-scroll')
      ?.addEventListener('scroll', handleScroll);
    return () =>
      document
        .querySelector(props.selector || '.oak-infinite-scroll')
        ?.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  function fetchMoreListItems() {
    props.handleChange();
    setIsFetching(false);
  }

  function handleScroll() {
    if (
      (document.querySelector(props.selector || '.oak-infinite-scroll')
        ?.clientHeight || 0) +
        (document.querySelector(props.selector || '.oak-infinite-scroll')
          ?.scrollTop || 0) >=
      (document.querySelector(props.selector || '.oak-infinite-scroll')
        ?.scrollHeight || 0)
    ) {
      // console.log('Fetch more list items!');
      setIsFetching(true);
      // props.handleChange();
    }
  }

  return (
    <div
      className={
        props.selector
          ? 'oak-infinite-scroll'
          : 'oak-infinite-scroll native-scroll'
      }
    >
      {props.children}
    </div>
  );
};

export default OakInfiniteScroll;
