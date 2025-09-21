import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export type Style =
    | 'display'
    | 'header'
    | 'title'
    | 'caption'
    | 'body-s'
    | 'body-m'
    | 'body-l'
    | 'small'
    | 'numbers';
export type Color = 'standard' | 'light' | 'alarm' | 'accent';

export type Typography = {
    variant?: Style;
    typColor?: Color;
};

type Props = React.HTMLAttributes<HTMLSpanElement> & Typography;

const STYLE_CLASSES_MAPPING: Record<Style, string> = {
    display: styles.display,
    header: styles.header,
    title: styles.title,
    caption: styles.caption,
    'body-s': styles.bodyS,
    'body-m': styles.bodyM,
    'body-l': styles.bodyL,
    small: styles.small,
    numbers: styles.numbers,
};

const COLOR_CLASSES_MAPPING: Record<Color, string> = {
    standard: styles.color_standard,
    light: styles.color_light,
    alarm: styles.color_alarm,
    accent: styles.color_accent,
};

export const getStyleClassName = (variant?: Style): string =>
    STYLE_CLASSES_MAPPING[variant || 'body-m'];
export const getColorClassName = (color?: Color): string =>
    COLOR_CLASSES_MAPPING[color || 'standard'];
export const getTypoClassName = ({ variant, typColor }: Typography): string =>
    classNames(getStyleClassName(variant), getColorClassName(typColor));

export const Text = ({ variant = 'body-m', typColor = 'standard', ...props }: Props) => {
    return (
        <span
            {...props}
            className={classNames(getTypoClassName({ variant, typColor }), props.className)}
        />
    );
};
