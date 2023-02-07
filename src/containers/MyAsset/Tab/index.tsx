/* eslint-disable react/prop-types */
import style from './index.module.less';
import cls from 'classnames';
export enum Tabs {
  DEPOSIT,
  BORROW
}
interface Props {
  curValue: Tabs;
  //   current: Tab;
  option: { value: Tabs; label: string }[];
  onChange: (selected: Tabs) => void;
}
const Tab: React.FC<Props> = ({ curValue, option, onChange }) => {
  return (
    <div className={cls('flex', style.container)}>
      {option.map(({ value, label }) => {
        return (
          <div
            className={cls(style.font, value === curValue ? style.cur : '')}
            key={value}
            onClick={() => {
              onChange(value);
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
