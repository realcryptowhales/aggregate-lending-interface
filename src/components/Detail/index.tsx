import * as React from 'react';
import clsx from 'classnames';
import { useState, useEffect, useRef, useMemo } from 'react';
import { DialogTypeProps } from '@constant/index';
import { echarts } from '@utils/echart';
import Tab from './Tab';
import Button from '@mui/material/Button';
import moment from 'moment';
import { useOpenTradeDialog } from '@hooks/useOpenTradeDialog';

const Detail: React.FC<any> = (props) => {
  const openTrade = useOpenTradeDialog();
  const {
    isSupply,
    setIsSupply,
    nowToken,
    detailAmount,
    detailValue,
    todayDate,
    matchAmount,
    aaveAmount,
    compoundAmount,
    matchPercent,
    aavePercent,
    compoundPercent,
    matchAPR,
    aaveAPR,
    compoundAPR,
    currentMatchAPR,
    currentAaveAPR,
    currentCompoundAPR
  } = props;
  const summary = {
    title: isSupply ? '存款总数' : '借款总数',
    text: detailAmount,
    desc: `$ ${detailValue}`
  };
  const pieTextList = [
    { title: '内部撮合', data: matchPercent },
    { title: 'AAVE', data: aavePercent },
    { title: 'Compound', data: compoundPercent }
  ];
  const detail = {
    text1: `三平台${isSupply ? '存款' : '借款'}APR实时数据 ${todayDate}`,
    text2: (
      <>
        <span>平台 </span>
        <span className="color-#F98A6B">{currentMatchAPR}</span>
        <span>、AAVE </span>
        <span className="color-#F98A6B">{currentAaveAPR}</span>
        <span>、Compound </span>
        <span className="color-#F98A6B">{currentCompoundAPR}</span>
      </>
    ),
    desc: '这是desc内容'
  };
  const middleTitle = `${isSupply ? '存款' : '借款'}APR折线图`;
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
  const lineOption = {
    // 右上角图例
    legend: {
      orient: 'horizontal',
      right: 60,
      padding: [15, 10, 5, 10]
    },
    // 图的边距
    grid: {
      x: 60, //默认是80px
      y: 60, //默认是60px
      x2: 80, //默认80px
      y2: 60 //默认60px
    },
    xAxis: {
      type: 'time',
      splitLine: {
        show: false
      },
      axisLabel: {
        formatter: function (value: any) {
          return moment(Number(value)).format('MM-DD');
        }
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
        // data格式[时间戳，数据]
        data: matchAPR,
        type: 'line'
      },
      {
        name: 'AAVE',
        data: aaveAPR,
        type: 'line'
      },
      {
        name: 'compound',
        data: compoundAPR,
        type: 'line'
      }
    ],
    tooltip: {
      formatter: function (param: any) {
        const time = param.value[0];
        const value = param.value[1] + '%';
        return `APR: ${value}`;
      }
    }
  };
  const pieOption = {
    series: {
      type: 'pie',
      data: [
        {
          value: matchAmount,
          name: 'matchPercent'
        },
        {
          value: aaveAmount,
          name: 'aavePercent'
        },
        {
          value: compoundAmount,
          name: 'compoundPercent'
        }
      ],
      // 隐藏饼图的引导线
      label: {
        normal: {
          show: false
        }
      }
    }
  };
  // init echart
  useEffect(() => {
    const lineChart = echarts.init(lineChartNodeRef.current);
    const pieChart = echarts.init(pieChartNodeRef.current);
    return () => {
      lineChart.dispose();
      pieChart.dispose();
    };
  }, []);
  // auto set line chart
  useEffect(() => {
    const lineChart = echarts.getInstanceByDom(lineChartNodeRef.current);
    lineChart && lineChart.setOption(lineOption);
  }, [isSupply, lineOption]);

  // auto set pie chart
  useEffect(() => {
    const pieChart = echarts.getInstanceByDom(pieChartNodeRef.current);
    pieChart && pieChart.setOption(pieOption);
  }, [isSupply, pieOption]);

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
          setIsSupply(index === 0);
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
            <div className="bg-#f9f9f9 rd-1 ml-8 px-4 py-4.5 color-#000000 text-3.5 leading-5 w-118.75 flex">
              <div>
                {detail.text1}
                <br />
                {detail.text2}
              </div>
            </div>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                width: '86px',
                background: isSupply ? '#F98A6B' : '#51459D',
                color: 'white',
                '&:hover': {
                  background: isSupply ? '#ff9800' : '#9c27b0'
                }
              }}
              onClick={() => {
                openTrade({
                  type: isSupply
                    ? DialogTypeProps.deposit
                    : DialogTypeProps.borrow,
                  activeCurrency: nowToken.symbol
                });
              }}
            >
              {isSupply ? '存款' : '借款'}
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: '86px',
                marginLeft: '13px',
                color: '#000',
                borderColor: '#000'
              }}
              onClick={() => {
                openTrade({
                  type: isSupply
                    ? DialogTypeProps.withdraw
                    : DialogTypeProps.repay,
                  activeCurrency: nowToken.symbol
                });
              }}
            >
              {isSupply ? '取款' : '还款'}
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
                {isSupply ? '存款分布图' : '借款分布图'}
              </div>
              <div className="text-3.5 leading-5.5 color-#000000 font-400">
                <div className="flex justify-between mt-1">
                  <span>平台</span>
                  <span>{isSupply ? '存款占比' : '借款占比'}</span>
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
