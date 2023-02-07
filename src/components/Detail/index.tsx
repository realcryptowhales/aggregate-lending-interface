import * as React from 'react';
import clsx from 'classnames';
import { useState, useEffect, useRef } from 'react';
import { echarts } from '@utils/echart';
import Tab from './Tab';
import Button from '@mui/material/Button';

interface DetailProps {
  test?: any;
}

const Detail: React.FC<DetailProps> = () => {
  const summary = {
    title: '存款总数',
    text: 290.45612378,
    desc: '$ 19,290.49'
  };
  const pieTextList = [
    { title: '内部撮合', data: '65%' },
    { title: 'AAVE', data: '35%' }
  ];
  const detail = {
    text1: '三平台存款APR实时数据 {YY MM DD}',
    text2: (
      <>
        <span>平台 </span>
        <span className="color-#F98A6B">6%</span>
        <span>（20%撮合+80%AAVE）、AAVE </span>
        <span className="color-#F98A6B">5%</span>
        <span>、Compound </span>
        <span className="color-#F98A6B">4%</span>
      </>
    ),
    desc: '这是desc内容'
  };
  const middleTitle = '存款APR折线图';
  const [options, setOptions] = useState([
    {
      name: '存款市场',
      select: true
    },
    {
      name: '借款市场',
      select: false
    }
  ]);
  const lineChartNodeRef = useRef<any>(null);
  const pieChartNodeRef = useRef<any>(null);

  useEffect(() => {
    const lineOption = {
      // 右上角图例
      legend: {
        orient: 'horizontal',
        right: 60,
        padding: [15, 10, 5, 10]
      },
      // 图的边距
      grid: {
        x: 40, //默认是80px
        y: 60, //默认是60px
        x2: 80, //默认80px
        y2: 60 //默认60px
      },
      xAxis: {
        type: 'time',
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: 'APR',
        axisLabel: {
          formatter: '{value}%'
        },
        nameTextStyle: {
          fontWeight: 400,
          fontSize: 14,
          lineHeight: 25,
          align: 'right',
          padding: [0, 7, 5, 0] // 上右下左
        }
      },
      series: [
        {
          name: '平台',
          data: [
            // data格式[时间戳，数据]
            [1675392178742, 5],
            [1675393178742, 10],
            [1675394178742, 30]
          ],
          type: 'line'
        },
        {
          name: 'AAVE',
          data: [
            [1675392178742, 7],
            [1675393178742, 15],
            [1675394178742, 10]
          ],
          type: 'line'
        },
        {
          name: 'compound',
          data: [
            [1675392178742, 3],
            [1675393178742, 5],
            [1675394178742, 15]
          ],
          type: 'line'
        }
      ],
      // tooltip: {
      //   formatter: function (param) {
      //     const time = param.value[0];
      //     const value = param.value[1] + '%';
      //     return value;
      //   }
      // },
      // default ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
      color: [
        '#000000',
        '#7B7B7B',
        '#CECECE',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc'
      ]
    };
    const lineChart = echarts.init(lineChartNodeRef.current);
    lineChart.setOption(lineOption);

    const pieOption = {
      series: {
        type: 'pie',
        data: [
          {
            value: 335,
            name: 'a'
          },
          {
            value: 234,
            name: 'b'
          },
          {
            value: 1548,
            name: 'c'
          }
        ],
        // 隐藏饼图的引导线
        label: {
          normal: {
            show: false
          }
        }
      },
      color: [
        '#000000',
        '#7B7B7B',
        '#CECECE',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc'
      ]
    };
    const pieChart = echarts.init(pieChartNodeRef.current);
    pieChart.setOption(pieOption);
    return () => {
      lineChart.dispose();
      pieChart.dispose();
    };
  }, []);
  return (
    <div
      className={clsx(
        'bg-#ffffff mt-6 rd-4 shadow-[0_4px_12px_rgb(137,137,137,0.25)] )'
      )}
    >
      <Tab
        options={options}
        onChange={(index) => {
          setOptions(
            options.map((option, i) => {
              option.select = index === i;
              return option;
            })
          );
          console.log(`switch to ${options[index].name}`);
        }}
      />
      <div className=" pl-8 pr-25">
        <div className="flex justify-between items-center mb-12">
          <div className="flex font-400 color-#929292">
            <div>
              <div className="text-3.5 leading-5.5">{summary.title}</div>
              <div className="color-#000000 font-500 text-5 leading-6 mt-1.5">
                {summary.text}
              </div>
              <div className=" text-3.5 leading-4 mt-1.5">{summary.desc}</div>
            </div>
            <div className="bg-#f9f9f9 rd-1 ml-8 px-4 py-4.5 color-#000000 text-3.5 leading-4 w-118.75">
              {detail.text1}
              <br />
              {detail.text2}
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                width: '86px',
                background: '#F98A6B',
                color: 'white',
                '&:hover': { background: '#ff9800' }
              }}
            >
              存款
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: '86px',
                marginLeft: '13px',
                color: '#000',
                borderColor: '#000'
              }}
            >
              取款
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <div className="color-#000000 text-4 leading-6.25">
              {middleTitle}
            </div>
            <div
              ref={lineChartNodeRef}
              style={{ width: '800px', height: '350px' }}
            ></div>
          </div>
          <div className="min-w-46.25">
            <div>
              <div className="text-4 leading-6.25 mb-5.25 font-400 color-#000000">
                存款分布图
              </div>
              <div className="text-3.5 leading-5.5 color-#000000 font-400">
                <div className="flex justify-between mt-1">
                  <span>平台</span>
                  <span>存款占比</span>
                </div>
                {pieTextList.map(({ title, data }) => {
                  return (
                    <div className="flex justify-between mt-1" key={title}>
                      <span className="color-#929292">{title}</span>
                      <span className="font-500">{data}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              ref={pieChartNodeRef}
              style={{ width: '170px', height: '170px' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
