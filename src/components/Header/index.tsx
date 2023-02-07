import * as React from 'react';
import { useState } from 'react';
import clsx from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import SmallDialog from '@/components/SmallDialog';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';

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
            backgroundColor: 'white',
            marginRight: '20px'
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
          连接钱包
        </Button>
        {/* <Button
          sx={{
            height: '26px',
            color: 'white'
          }}
        >
          英语
        </Button> */}
        <SmallDialog
          open={open}
          handleClose={handleClose}
          title="挖矿奖励"
          button={
            <Button
              sx={{
                background: '#000000',
                color: '#ffffff',
                '&:hover': { background: 'gray' }
              }}
              onClick={handleClose}
            >
              Claim
            </Button>
          }
          content={
            <div className="flex flex-col items-center justify-center min-w-85.75 min-h-47 text-3.5 leading-4">
              <div className="flex items-center mb-1">
                <span className="mr-1.5">
                  在平台中存款、借款会得到 COMP 奖励
                </span>
                <Tooltip title="hover的内容">
                  <ErrorOutlineOutlinedIcon
                    sx={{ width: '16px', height: '16px' }}
                  />
                </Tooltip>
              </div>
              <div className="mb-1">已领取 0.1234</div>
              <div className="mb-1">待领取 0.1234</div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default Header;
