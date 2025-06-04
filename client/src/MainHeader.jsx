import React from 'react';
import styles from './MainHeader.module.css';

function MainHeader({ groupName, total }) { 
  return (
    <header>
      <dl>
        <dt>{ groupName }</dt>
        <dd>{ total }</dd>
      </dl>
    </header>
  );
}

export default MainHeader;