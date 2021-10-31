import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';

const OrderOptionText = ({ name, setOptionValue, currentValue }) => (
  <div className={styles.component}>
    <input
      className={styles.input}
      type="text"
      placeholder={name}
      onChange={event => setOptionValue(event.currentTarget.value)}
      value={currentValue}
    />
  </div>
);
OrderOptionText.propTypes = {
  name: PropTypes.string,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.node,
};

export default OrderOptionText;
