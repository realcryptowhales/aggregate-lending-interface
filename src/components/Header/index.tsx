import * as React from 'react';
import { useState } from 'react';
import clsx from 'classnames';
import styles from './index.module.less';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import SmallModal from '@components/SmallModal';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { pathname } = useLocation();
  const pathList = [
    { path: '/markets', name: 'markets' },
    { path: '/porfolio', name: 'porfolio' }
  ];
  return (
    <div
      className={clsx(styles.header, 'w-full flex justify-between box-border')}
    >
      <div className="flex items-center">
        {pathList.map(({ path, name }) => {
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                styles.tab,
                {
                  [styles.active]: pathname.includes(path)
                },
                'decoration-none'
              )}
            >
              {name}
            </Link>
          );
        })}
      </div>
      <div>
        <Button
          variant="contained"
          className={clsx(styles.button, styles.contained)}
          onClick={() => setOpen(true)}
        >
          挖矿奖励
        </Button>
        <Button className={clsx(styles.button, styles.white)}>钱包</Button>
        <Button className={clsx(styles.button, styles.white)}>英语</Button>
        <SmallModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Header;
