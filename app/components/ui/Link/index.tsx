import React from 'react';
import { getTypoClassName, type Typography } from '../Text';
import styles from './index.module.scss';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & Typography & {
    href: string;
}

export const Link = ({href,  variant, typColor, className, ...props }: Props) => {
    return <RouterLink to={href} {...props} className={classNames(styles.link, getTypoClassName({variant, typColor}), className)} />;
};

export default Link;