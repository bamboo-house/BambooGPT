type ModalType = {
  isOpen: boolean;
  onClose: any;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalType) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
};
