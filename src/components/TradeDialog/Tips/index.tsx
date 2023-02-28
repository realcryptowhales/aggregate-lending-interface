import { Tooltip } from '@mui/material';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { DialogTypeProps } from '../hooks/useTradeDialog';
import styles from './index.module.less';

interface TipsProps {
  type: DialogTypeProps;
}

function Tips({ type }: TipsProps) {
  if ([DialogTypeProps.deposit, DialogTypeProps.borrow].includes(type)) {
    return (
      <div className={styles.tips}>
        <div className={styles.text}>
          {type === DialogTypeProps.borrow
            ? '借款款可以获取 COMP 奖励'
            : '存款可以获取 COMP 奖励'}
        </div>
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
  return null;
}

export default Tips;
