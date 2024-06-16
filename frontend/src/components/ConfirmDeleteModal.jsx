// ConfirmDeleteModal.jsx
import React from 'react';
import Modal from 'react-modal';

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirm Delete"
            ariaHideApp={false}
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onRequestClose}>No</button>
        </Modal>
    );
};

export default ConfirmDeleteModal;
