import * as React from 'react';
import clsx from 'classnames';

interface Option {
  name: string;
  select: boolean;
}

interface TabProps {
  onChange: (arg: number) => void;
  options: Option[];
}

const Tab: React.FC<TabProps> = ({ onChange, options }) => {
  const handleChange = (index: number) => {
    onChange(index);
  };
  return (
    <div className="flex items-center p-8 color-#979797 font-700 text-5 leading-6">
      {options.map(({ name, select }, index) => {
        return (
          <div
            key={name}
            className={clsx('cursor-pointer', {
              'color-black': select,
              'ml-20': index > 0
            })}
            onClick={() => handleChange(index)}
          >
            {name}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
