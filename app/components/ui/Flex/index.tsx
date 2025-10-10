import classNames from 'classnames';
import React from 'react';

import styles from './index.module.scss';

export interface FlexProps {
    children: React.ReactNode;
    className?: string;
    
    // Flex Direction
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    
    // Justify Content (main axis)
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    
    // Align Items (cross axis)
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    
    // Align Content (for multi-line flex containers)
    alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | 'stretch';
    
    // Flex Wrap
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    
    // Gap
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    gapX?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    gapY?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
    
    // Flex properties for the container itself
    flex?: string | number;
    grow?: number;
    shrink?: number;
    basis?: string | number;
    
    // Display
    inline?: boolean;
    
    // Width and Height
    fullWidth?: boolean;
    fullHeight?: boolean;
    
    // HTML attributes
    as?: keyof JSX.IntrinsicElements;
    style?: React.CSSProperties;
}

const DIRECTION_CLASSES = {
    'row': styles.directionRow,
    'row-reverse': styles.directionRowReverse,
    'column': styles.directionColumn,
    'column-reverse': styles.directionColumnReverse,
};

const JUSTIFY_CLASSES = {
    'start': styles.justifyStart,
    'end': styles.justifyEnd,
    'center': styles.justifyCenter,
    'between': styles.justifyBetween,
    'around': styles.justifyAround,
    'evenly': styles.justifyEvenly,
};

const ALIGN_CLASSES = {
    'start': styles.alignStart,
    'end': styles.alignEnd,
    'center': styles.alignCenter,
    'baseline': styles.alignBaseline,
    'stretch': styles.alignStretch,
};

const ALIGN_CONTENT_CLASSES = {
    'start': styles.alignContentStart,
    'end': styles.alignContentEnd,
    'center': styles.alignContentCenter,
    'between': styles.alignContentBetween,
    'around': styles.alignContentAround,
    'evenly': styles.alignContentEvenly,
    'stretch': styles.alignContentStretch,
};

const WRAP_CLASSES = {
    'nowrap': styles.wrapNowrap,
    'wrap': styles.wrapWrap,
    'wrap-reverse': styles.wrapWrapReverse,
};

const GAP_CLASSES = {
    'none': styles.gapNone,
    'xs': styles.gapXs,
    'sm': styles.gapSm,
    'md': styles.gapMd,
    'lg': styles.gapLg,
    'xl': styles.gapXl,
};

const GAP_X_CLASSES = {
    'none': styles.gapXNone,
    'xs': styles.gapXXs,
    'sm': styles.gapXSm,
    'md': styles.gapXMd,
    'lg': styles.gapXLg,
    'xl': styles.gapXXl,
};

const GAP_Y_CLASSES = {
    'none': styles.gapYNone,
    'xs': styles.gapYXs,
    'sm': styles.gapYSm,
    'md': styles.gapYMd,
    'lg': styles.gapYLg,
    'xl': styles.gapYXl,
};

export const Flex: React.FC<FlexProps> = ({
    children,
    className,
    direction = 'row',
    justify,
    align,
    alignContent,
    wrap = 'nowrap',
    gap,
    gapX,
    gapY,
    flex,
    grow,
    shrink,
    basis,
    inline = false,
    fullWidth = false,
    fullHeight = false,
    as: Component = 'div',
    style,
    ...props
}) => {
    const flexClass = classNames(
        className,
        inline ? styles.inlineFlex : styles.flex,
        DIRECTION_CLASSES[direction],
        justify && JUSTIFY_CLASSES[justify],
        align && ALIGN_CLASSES[align],
        alignContent && ALIGN_CONTENT_CLASSES[alignContent],
        WRAP_CLASSES[wrap],
        gap && (typeof gap === 'string' ? GAP_CLASSES[gap] : undefined),
        gapX && (typeof gapX === 'string' ? GAP_X_CLASSES[gapX] : undefined),
        gapY && (typeof gapY === 'string' ? GAP_Y_CLASSES[gapY] : undefined),
        {
            [styles.fullWidth]: fullWidth,
            [styles.fullHeight]: fullHeight,
        }
    );

    const customStyle: React.CSSProperties = {
        ...style,
        ...(typeof gap === 'number' && { gap: `${gap}px` }),
        ...(typeof gapX === 'number' && { columnGap: `${gapX}px` }),
        ...(typeof gapY === 'number' && { rowGap: `${gapY}px` }),
        ...(flex && { flex }),
        ...(grow !== undefined && { flexGrow: grow }),
        ...(shrink !== undefined && { flexShrink: shrink }),
        ...(basis && { flexBasis: basis }),
    };

    return (
        <Component className={flexClass} style={customStyle} {...props}>
            {children}
        </Component>
    );
};

export default Flex;