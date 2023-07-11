import { useEffect, useRef, useState } from 'react';

type ModalType = {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
};

// atomFamilyを使えば、開閉stateを綺麗に管理できそう
// https://qiita.com/t-sugimoto/items/9c01477c8998a1072225
export const Modal = ({ isOpen, onClose, children }: ModalType) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any): void => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative" ref={modalRef}>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
