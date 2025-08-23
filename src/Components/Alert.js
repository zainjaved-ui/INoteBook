import React, { useEffect } from "react";

function Alert({ alert, onClose }) {
  useEffect(() => {
    if (alert) {
      // Auto close after 3s
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, onClose]);

  if (!alert) return null;

  const capitalize = (word) => {
    if (word === "danger") {
       word = " Error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
    >
      <div className="toast show" role="alert">
        <div className="toast-header">
          <strong className="me-auto">{capitalize(alert.type)}</strong>
          <button
            type="button"
            className="btn-close ms-2 mb-1"
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body">{alert.msg}</div>
      </div>
    </div>
  );
}

export default Alert;
