import React, { useRef, useEffect } from 'react';
import styles from './App.module.css';

const InputWithLabel = ({
  id,
  type = 'text',
  value,
  onInputChange,
  isFocused,
  children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {children}:{' '}
      </label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
        className={styles.input}
      />
    </div>
  );
};

export default InputWithLabel;
