import React from "react";
import styles from "./index.module.scss";
import Button from "../Button";

// Icons
// import second from '@/../src/icons/download.svg'
// import second from '@/../src/icons/secure.svg'
// import second from '@/../src/icons/'

export type FilesState = "loading" | "uploaded" | "error" | "password" | "download";
export type FilesResolution = "desktop" | "mobile";

export interface FileInfo {
  name: string;
  size: number;
  pages?: number;
  type?: string;
}

interface FilesProps {
  state: FilesState;
  resolution?: FilesResolution;
  file: FileInfo;
  onRemove?: () => void;
  onDownload?: () => void;
  onPassword?: () => void;
  loading?: boolean;
  className?: string;
}

function formatSize(size: number) {
  if (size > 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + " MB";
  if (size > 1024) return (size / 1024).toFixed(1) + " KB";
  return size + " B";
}

const Files: React.FC<FilesProps> = ({
  state,
  resolution = "desktop",
  file,
  onRemove,
  onDownload,
  onPassword,
  loading,
  className = "",
}) => {
  const isMobile = resolution === "mobile";
  const fileInfo = (
    <div className={styles.info}>
      <div className={styles.name}>{file.name}</div>
      <div className={styles.meta}>
        {formatSize(file.size)}
        {file.pages ? `, ${file.pages} pages` : ""}
      </div>
    </div>
  );

  const removeBtn = onRemove && (
    <button className={styles.remove} onClick={onRemove} aria-label="Удалить">
      {/* <Icon src="/icons/cross.svg" alt="Удалить" size={20} /> */}
    </button>
  );

  // Иконка по состоянию
  let iconSrc = "/icons/file-check.svg";
  if (state === "error") iconSrc = "/icons/file-check.svg";
  if (state === "password") iconSrc = "/icons/file-locked.svg";
  if (state === "loading") iconSrc = "/icons/loading.svg";
  if (state === "download") iconSrc = "/icons/file-check.svg";

  // Цвет фона и иконки по состоянию
  let fileIconClass = styles.icon;
  if (state === "error") fileIconClass += " " + styles.error;
  if (state === "download") fileIconClass += " " + styles.success;
  if (state === "password") fileIconClass += " " + styles.locked;

  return (
    <div className={`${styles.files} ${styles[state]} ${isMobile ? styles.mobile : styles.desktop} ${className}`}>
      <div className={fileIconClass}>
        {/* <Icon src={iconSrc} alt={state} size={26} /> */}
      </div>
      {fileInfo}
      <div className={styles.actions}>
        {state === "uploaded" && (
          <Button
            buttonLabel="Download"
            onClick={onDownload}
            iconRight={true}
            // rightIconType={<Icon src="/icons/download.svg" size={20} />}
          />
        )}
        {state === "password" && (
          <Button
            buttonLabel="Submit password"
            onClick={onPassword}
            iconRight={true}
            // rightIconType={<Icon src="/icons/secure.svg" size={20} />}
          />
        )}
        {state === "download" && (
          <Button
            buttonLabel="Convert to Excel"
            onClick={onDownload}
            iconRight={true}
            // rightIconType={<Icon src="/icons/excel.svg" size={20} />}
            disabled={loading}
          />
        )}
        {removeBtn}
      </div>
    </div>
  );
};

export default Files;