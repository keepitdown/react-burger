import React, {useMemo, useState} from 'react';
import styles from './value-item.module.css';

function ValueItem({ children, value }) {
  
  return (
    <div className={styles['container']}>
      <h4 className="text text_type_main-default text_color_inactive">{children}</h4>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </div>
  )
}

export default ValueItem;