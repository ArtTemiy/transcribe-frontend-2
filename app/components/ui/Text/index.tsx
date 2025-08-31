import React from 'react';
import styles from './styles.module.scss'
import classNames from 'classnames';

export type Style = 'title' | 'caption' | 'body-s' | 'body-m' | 'body-l' | 'small' | 'numbers';
export type Color = 'standard' | 'light';
export type Typography = {
    variant?: Style;
    typColor?: Color;
}

type Props = React.HTMLAttributes<HTMLSpanElement> & Typography;

const STYLE_CLASSES_MAPPING: Record<Style, string> = {
    title: styles.title,
    caption: styles.caption,
    'body-s': styles.bodyS,
    'body-m': styles.bodyM,
    'body-l': styles.bodyL,
    small: styles.small,
    numbers: styles.numbers,
}

const COLOR_CLASSES_MAPPING: Record<Color, string> = {
    standard: styles.color_standard,
    light: styles.color_light
}

export const getStyleClassName = (variant?: Style): string => STYLE_CLASSES_MAPPING[variant || 'body-m'];
export const getColorClassName = (color?: Color): string => COLOR_CLASSES_MAPPING[color || 'standard'];
export const getTypoClassName = ({variant, typColor}: Typography): string => classNames(
    getStyleClassName(variant),
    getColorClassName(typColor)
);

export const Text = ({ variant = 'body-m', typColor = 'standard', ...props }: Props) => {
    return <span {...props} className={classNames(getTypoClassName({ variant, typColor }), props.className)}></span>;
};
