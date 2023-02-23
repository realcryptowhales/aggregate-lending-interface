import { Tooltip } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import styles from './index.module.less';

function Tips() {
  return (
    <div className={styles.tips}>
      <div className={styles.text}>存款可以获取 COMP 奖励</div>
      <Tooltip
        title="底层协议因借贷行为产生的矿币奖励 COMP Token 积累在本平台，并把奖励按比例分配给用户。"
        arrow
        placement="top"
      >
        <ErrorOutlineRoundedIcon
          sx={{
            fontSize: 19,
            color: '#000000'
          }}
        />
      </Tooltip>
    </div>
  );
}

export default Tips;
