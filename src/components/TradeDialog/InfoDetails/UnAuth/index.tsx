import styles from './index.module.less';
import { DialogTypeProps } from '@/constant/type';

interface UnAuth {
  type: DialogTypeProps;
}

function UnAuth({ type }: UnAuth) {
  if ([DialogTypeProps.deposit, DialogTypeProps.repay].includes(type)) {
    return (
      <div className={styles.auth}>
        <div className={styles.top}>当前资产未授权</div>
        <div className={styles.bottom}>
          首次操作该资产，请点击下边授权按钮后在钱包完成授权
        </div>
      </div>
    );
  }
  return null;
}

export default UnAuth;
