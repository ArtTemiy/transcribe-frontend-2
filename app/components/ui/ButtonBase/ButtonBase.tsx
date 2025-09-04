import classNames from 'classnames';
import styles from './style.module.scss';

const ButtonBase = ({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => { 
  return <button className={classNames(className, styles.button)} {...props} />;
};

export default ButtonBase;
