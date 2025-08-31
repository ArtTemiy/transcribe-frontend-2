import React from "react";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import styles from "./index.module.scss";

export interface FeedbackCardProps {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  name,
  role,
  avatar,
  text,
}) => (
  <Card className={styles.card}>
    <div className={styles.content}>
      <div className={styles.header}>
        <div
          className={styles.avatar}
          style={{ backgroundImage: `url('${avatar}')` }}
        />
        <div className={styles.userInfo}>
          <Text variant="title">{name}</Text>
          <Text variant="caption">{role}</Text>
        </div>
      </div>
      
      <div className={styles.textContent}>
        <Text variant="body-m">{text}</Text>
      </div>
    </div>
  </Card>
);

export default FeedbackCard;