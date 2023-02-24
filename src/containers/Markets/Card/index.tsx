import * as React from 'react';
import style from './index.module.less';
import cls from 'classnames';
interface Props {
  title: React.ReactNode;
  secondTitle?: string;
  children: React.ReactNode;
}
const Card: React.FC<Props> = ({ title, secondTitle, children }) => {
  return (
    <div className={cls(style.container)}>
      <div className={cls(style['container-title'])}>{title}</div>
      {secondTitle && (
        <div className={cls(style['container-second-title'])}>
          {secondTitle}
        </div>
      )}
      <div className={cls(style['container-content'])}>{children}</div>
    </div>
  );
};

export default Card;
