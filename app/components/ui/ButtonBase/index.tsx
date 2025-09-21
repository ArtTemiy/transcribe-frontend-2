import classNames from 'classnames';

import styles from './style.module.scss';

const ButtonBase = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return <button className={classNames(styles.button, className)} {...props} />;
};

export default ButtonBase;
