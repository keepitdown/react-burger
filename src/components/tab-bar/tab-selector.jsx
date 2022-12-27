import React, {useState, useEffect} from 'react';
import styles from './tab-selector.module.css';

function TabSelector({ children, defaultSelection }) {

  const [current, setCurrent] = useState(defaultSelection);

  const withClickHandler = Component => props => {
    return (<Component {...props} active={current === props.value} onClick={setCurrent} whatever="test"/>)
  }

  return (
    <ul className={styles['tab-selector']}>
      {
        children.map?.((item, index) => (
          <li key={index} >
            {item}
          </li>
          ))
        ?? (<li>{children}</li>)
      }
    </ul>
  )
}

export default TabSelector;