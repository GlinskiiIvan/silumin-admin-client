import React from 'react';
import {Modal} from "react-bootstrap";

import styles from './QueryModal.module.scss';

interface ICreateBrandProps {
    show: boolean,
    onHide: any,
    message: string,
    type: 'success' | 'error'
}

const QueryModal: React.FC<ICreateBrandProps> = ({show, onHide, message, type}) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className={styles[type]}>
                {type === 'success' && <h1>Успех!</h1>}
                {type === 'error' && <h1>Ошибка...</h1>}
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
        </Modal>
    );
};

export default QueryModal;