import React from "react";
import styles from './index.module.scss';
import classNames from "classnames";

export interface DropzoneProps {
  onDrop: (files: FileList) => void;
  children?: React.ReactNode;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onDrop, children, className = "" }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onDrop(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={classNames(styles.dropzone , className)}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dropzone;