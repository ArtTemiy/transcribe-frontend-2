import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Text } from "~/components/ui/Text";
import { Link } from "~/components/ui/Link";
import styles from "./index.module.scss";
import classNames from "classnames";

import LogoWgiteIcon from "@/../src/icons/logo_white.svg";

export interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => (
  <footer className={classNames(styles.footer, className)}>
    <Container fluid className="h-100">
      {/* Логотип секция */}
      <Row className="mb-4 mb-md-5">
        <Col xs={12}>
          <div className={styles.logoSection}>
            <LogoWgiteIcon />
            <Text variant="caption" className={styles.logoText}>
              AI Bank Statement Converter
            </Text>
          </div>
        </Col>
      </Row>

      {/* Нижняя секция */}
      <Row className="align-items-center">
        {/* Копирайт */}
        <Col xs={12} md={6} className="mb-3 mb-md-0">
          <Text variant="caption" className={styles.copyright}>
            Copyright © 2025 Bank Statement Converter Ltd.
          </Text>
        </Col>

        {/* Ссылки */}
        <Col xs={12} md={6}>
          <div className={classNames(styles.links, "d-flex justify-content-start justify-content-md-end")}>
            <Link variant="caption" className={styles.link} href="/api-docs">API Docs</Link>
            <Link variant="caption" className={styles.link} href="/terms">Terms</Link>
            <Link variant="caption" className={styles.link} href="/privacy">Privacy</Link>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;