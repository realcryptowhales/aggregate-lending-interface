import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout, UniversalTransition } from 'echarts/features';

import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function PorfolioItem() {
  const { id } = useParams<'id'>();
  const chartNodeRef = useRef<any>(null);
  useEffect(() => {
    console.log('do echart');
    const myChart = echarts.init(chartNodeRef.current);
    const option = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [23, 24, 18, 25, 27, 28, 25]
        }
      ]
    };
    myChart.setOption(option);
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full">
      <h1>This is item page for porfolio</h1>
      <h2>
        Welcome to the {id!.split('-').map(capitalizeString).join(' ')} course!
      </h2>
      <Link to="/porfolio">back to porfolio</Link>
      <div
        id="echart-profolio"
        ref={chartNodeRef}
        style={{ width: '500px', height: '500px' }}
      ></div>
    </div>
  );
}

export default PorfolioItem;
