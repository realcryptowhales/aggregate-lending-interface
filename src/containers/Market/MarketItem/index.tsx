import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Line } from '@antv/g2plot';

function capitalizeString(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function MarketItem() {
  const { id } = useParams<'id'>();
  const chartNodeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  useEffect(() => {
    console.log(chartNodeRef.current, chartRef, 'what is');
    if (!chartNodeRef.current) {
      return;
    }
    if (chartRef.current) return;
    const data = [
      {
        Date: '2010-01',
        scales: 1998
      },
      {
        Date: '2010-02',
        scales: 1850
      },
      {
        Date: '2010-03',
        scales: 1720
      },
      {
        Date: '2010-04',
        scales: 1818
      },
      {
        Date: '2010-05',
        scales: 1920
      },
      {
        Date: '2010-06',
        scales: 1802
      },
      {
        Date: '2010-07',
        scales: 1945
      },
      {
        Date: '2010-08',
        scales: 1856
      },
      {
        Date: '2010-09',
        scales: 2107
      },
      {
        Date: '2010-10',
        scales: 2140
      }
    ];
    const line = new Line(chartNodeRef.current, {
      data,
      xField: 'Date',
      yField: 'scales'
    });

    line.render();
    chartRef.current = line;
    console.log('do first');

    return () => {
      if (chartRef.current) {
        // chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <h1>This is item page for market</h1>
      <h2>
        Welcome to the {id!.split('-').map(capitalizeString).join(' ')} course!
      </h2>
      <div ref={chartNodeRef}></div>
      <Link to="/markets">back to markets</Link>
    </div>
  );
}

export default MarketItem;
