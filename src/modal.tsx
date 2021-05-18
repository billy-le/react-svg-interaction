import ReactDOM from 'react-dom';
import React, { useRef, useEffect } from 'react';

export function Modal({
  children,
  handleClose,
}: React.PropsWithChildren<{
  handleClose: React.Dispatch<boolean>;
}>) {
  const modalRoot = useRef<HTMLDivElement>(document.getElementById('modal-root') as HTMLDivElement);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      if (!modalRoot.current.contains(target)) {
        handleClose(false);
      }
    }

    if (modalRoot.current) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleClose]);

  return ReactDOM.createPortal(children, modalRoot.current);
}
