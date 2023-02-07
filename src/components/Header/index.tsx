import * as React from 'react';
import { useState } from 'react';
import clsx from 'classnames';
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
    { path: '/markets', name: 'Markets' },
    { path: '/porfolio', name: 'Porfolio' }
  ];
  return (
    <div
      className={clsx(
        'bg-#1b1c30 w-full flex justify-between box-border py-4.5 px-27'
      )}
    >
      <div className="flex items-center">
        {pathList.map(({ path, name }, index) => {
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                'color-#ffffff text-3.5 font-400 leading-4 decoration-none',
                {
                  'font-700 pb-1 mb-[-4px] border-b-2 border-b-#ffffff border-b-solid':
                    pathname.includes(path)
                },
                {
                  'ml-8': index > 0
                }
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
          sx={{
            height: '26px',
            backgroundColor: 'white'
          }}
          onClick={() => setOpen(true)}
        >
          挖矿奖励
        </Button>
        <Button
          sx={{
            height: '26px',
            color: 'white'
          }}
        >
          钱包
        </Button>
        <Button
          sx={{
            height: '26px',
            color: 'white'
          }}
        >
          英语
        </Button>
        <SmallModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Header;
