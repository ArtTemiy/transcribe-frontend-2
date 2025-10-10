import classNames from 'classnames';
import type { PropsWithChildren } from 'react';

import type { PropsWithClassName } from '@/types/helpers/PropsWithClassName';

import { getStyleClassName, type Style } from '../Text';

import styles from './styles.module.scss';

type Props = PropsWithChildren &
    PropsWithClassName & {
        variant?: Style;
    };

const RoundLabel = ({ children, variant, className }: Props) => {
    const styleCalssName = getStyleClassName(variant);
    return <div className={classNames(className, styleCalssName, styles.label)}>{children}</div>;
};

export default RoundLabel;
