import * as React from 'react';
import useSWR from 'swr';
import { fetcher } from '@api/index';
import style from './index.module.less';
import cls from 'classnames';
import AssetInfo from './AssetInfo';
// interface Props {
// title: React.ReactNode;
// secondTitle?: string;
// children: React.ReactNode;
// }
// eslint-disable-next-line no-empty-pattern
const Porfolio: React.FC = ({}) => {
  return (
    <div className={cls(style.container)}>
      <head className={cls(style.containerHead)}>
        <div>我的资产</div>
        <div>资产清算记录</div>
      </head>
      <main>
        <AssetInfo />
      </main>
    </div>
  );
};

export default Porfolio;
