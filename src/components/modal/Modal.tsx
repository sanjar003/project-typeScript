import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import { ReactNode } from 'react';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.modalClose} onClick={onClose}>
                    Закрыть
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};
export default Modal