import { useState } from 'react';

import Modal, { type ModalProps } from './Modal';

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    return {
        Component: (props: Omit<ModalProps, 'isOpen' | 'onClose'>) => {
            return <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} {...props} />;
        },
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
        isOpen: isOpen,
    };
};
