import React from 'react';
import styles from './Modal.module.css';

function Modal({ removeModal, children }) { 
  return (
    <>
      <div
        id={styles.modal_layer}
        onClick={()=> removeModal()}
      >
        
      </div>
      {children}
    </>
  );
}

export default Modal;