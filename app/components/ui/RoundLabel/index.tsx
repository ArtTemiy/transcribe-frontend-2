import type { PropsWithChildren } from "react"
import styles from './styles.module.scss';
import type { PropsWithClassName } from "~/types/helpers/PropsWithClassName";
import { getStyleClassName, type Style } from "../Text";
import classNames from 'classnames';

type Props = PropsWithChildren & PropsWithClassName & {
    variant?: Style
}

const RoundLabel = ({ children, variant, className }: Props) => {
    const styleCalssName = getStyleClassName(variant)
    return <div className={classNames(styleCalssName, styles.label)}>
        {children}
    </div>;
}

export default RoundLabel;