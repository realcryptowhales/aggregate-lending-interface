import styles from './index.module.less';

function UnAuth() {
  return (
    <div className={styles.auth}>
      <div className={styles.top}>当前资产未授权</div>
      <div className={styles.bottom}>
        首次操作该资产，请点击下边授权按钮后在钱包完成授权
      </div>
    </div>
  );
}

export default UnAuth;
