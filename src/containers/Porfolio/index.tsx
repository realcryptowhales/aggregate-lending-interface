import * as React from 'react';
import { Link } from 'react-router-dom';

function Porfolio() {
  return (
    <div className="w-full">
      <h1>This is porfolio page</h1>
      <Link to="liquidation">go to asset liquidation</Link>
      <br />
      <Link to="/porfolio/my-asset">go to my asset</Link>

      <ul>
        <li>
          <Link to="BTC">go BTC</Link>
        </li>
        <li>
          <Link to="ETH">go ETH</Link>
        </li>
        <li>
          <Link to="OKB">go OKB</Link>
        </li>
      </ul>
    </div>
  );
}
// import useSWR from 'swr';
// import { fetcher } from '@api/index';
// import style from './index.module.less';
// import cls from 'classnames';
// import AssetInfo from './AssetInfo';
// // interface Props {
// // title: React.ReactNode;
// // secondTitle?: string;
// // children: React.ReactNode;
// // }
// // eslint-disable-next-line no-empty-pattern
// const Porfolio: React.FC = ({}) => {
//   return (
//     <div className={cls(style.container)}>
//       <head className={cls(style.containerHead)}>
//         <div>我的资产</div>
//         <div>资产清算记录</div>
//       </head>
//       <main>
//         <AssetInfo />
//       </main>
//     </div>
//   );
// };

export default Porfolio;
