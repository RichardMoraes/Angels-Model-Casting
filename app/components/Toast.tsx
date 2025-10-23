"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  readonly id: string;
  readonly type: ToastType;
  readonly title: string;
  readonly message?: string;
  readonly duration?: number;
  readonly onClose: (id: string) => void;
}

const Toast = memo(function Toast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300); // Wait for exit animation
  }, [onClose, id]);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close timer
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, handleClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconColors = {
    success: "text-emerald-500",
    error: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  };

  const Icon = icons[type];

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div
        className={`
          ${colors[type]}
          border rounded-lg shadow-lg p-4
          backdrop-blur-sm bg-white/95
        `}
      >
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 mt-0.5 ${iconColors[type]} flex-shrink-0`} />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm">{title}</h4>
            {message && (
              <p className="text-sm mt-1 opacity-90">{message}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

export default Toast;
