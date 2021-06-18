import React, { useState } from 'react';
import _ from 'lodash';
import styles from './App.module.css';
import { ReactComponent as Check } from './check.svg';

export const Item = ({ item, onRemoveItem }) => {
  return (
    <div className={styles.item}>
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      {/* <span style={{ width: '10%' }}>{item.points}</span> */}
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
        <button
          type="button"
          onClick={() => onRemoveItem(item)}
          className={`${styles.button} ${styles.buttonSmall}`}
        >
          <Check width="18px" height="18px" />
        </button>
      </span>
    </div>
  );
};

const SORTS = {
  NONE: (list) => list,
  TITLE: (list) => _.sortBy(list, 'title'),
  AUTHOR: (list) => _.sortBy(list, 'author'),
  COMMENTS: (list) => _.sortBy(list, 'num_comments').reverse(),
  POINTS: (list) => _.sortBy(list, 'points').reverse(),
};

const List = ({ stories, onRemoveItem }) => {
  const [sort, setSort] = useState('NONE');
  const [active, setActive] = useState('');

  const handleSort = (sortKey) => {
    setSort(sortKey);
  };

  const sortFunction = SORTS[sort];
  const sortListed = sortFunction(stories);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span style={{ width: '30%' }}>
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span style={{ width: '10%' }}>
          <button type="button" onClick={() => handleSort('COMMENTS')}>
            Comments
          </button>
        </span>
        <span style={{ width: '10%' }}>
          <button type="button" onClick={() => handleSort('POINTS')}>
            Points
          </button>
        </span>
        <span style={{ width: '10%' }}>Actions</span>
      </div>
      {sortListed.map((item) => (
        <Item key={item.objectID} onRemoveItem={onRemoveItem} item={item} />
      ))}
    </div>
  );
};

export default List;
