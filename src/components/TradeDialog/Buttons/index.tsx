import Button from '@mui/material/Button';
import clsx from 'classnames';
import styles from './index.module.less';

function UnAuth() {
  return (
    <div className={styles.buttons}>
      <Button
        color="warning"
        variant="contained"
        className={clsx(styles.button, styles.first)}
        sx={{ marginRight: '16px' }}
      >
        授权 BTC
      </Button>
      <Button variant="contained" className={styles.button}>
        存款
      </Button>
    </div>
  );
}

export default UnAuth;
