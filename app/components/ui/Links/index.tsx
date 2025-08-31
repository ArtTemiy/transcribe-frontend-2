import React from "react";
import styles from "./index.module.scss";

export interface LinksProps {
  state?: "default" | "hover";
  children?: React.ReactNode;
}

const Links: React.FC<LinksProps> = ({ state = "default", children }) => {
  return (
    <div className={state === "hover" ? styles.links + " " + styles.hover : styles.links}>
      <span className={styles.text}>{children ?? "Links"}</span>
      {state === "hover" && <span className={styles.underline} />}
    </div>
  );
};

export default Links;