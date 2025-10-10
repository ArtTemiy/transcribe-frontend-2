import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

export interface SpacerProps {
    className?: string;
    grow?: number;
    shrink?: number;
    basis?: string | number;
    style?: React.CSSProperties;
    as?: keyof JSX.IntrinsicElements;
}

export const Spacer: React.FC<SpacerProps> = ({
    className,
    grow = 1,
    shrink = 1,
    basis = 'auto',
    style,
    as: Component = 'div',
    ...props
}) => {
    const spacerStyle: React.CSSProperties = {
        ...style,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
    };

    return (
        <Component 
            className={classNames(styles.spacer, className)} 
            style={spacerStyle}
            {...props}
        />
    );
};

export default Spacer;