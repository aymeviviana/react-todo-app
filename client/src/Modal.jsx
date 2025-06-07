import React from 'react';
import styles from './Modal.module.css';

function Modal({ removeModal, children }) { 
  return (
    <>
      <div
        className={styles.modalLayer}
        onClick={()=> removeModal()}
      >
      </div>
      {children}
    </>
  );
}

export default Modal;