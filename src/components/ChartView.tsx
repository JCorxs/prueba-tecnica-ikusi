import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import type { MetricPoint } from '../types';
import type { LegendPayload } from 'recharts';

interface ChartViewProps {
  data: MetricPoint[];
  type?: 'bar' | 'line';
}

export const ChartView: React.FC<ChartViewProps> = ({ data, type = 'bar' }) => {
  const chartData = data.map(d => ({ name: d.name, value: d.value }));

  const colors = React.useMemo(
    () =>
      chartData.map(
        () =>
          `#${Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')}`
      ),
    [chartData]
  );

  const CustomLegend: React.FC<{ payload?: LegendPayload[] }> = ({ payload }) => {
    if (!payload) return null;
    return (
      <div className="flex justify-center mt-2">
        <ul className="flex gap-4">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex items-center gap-1">
              <span
                className="inline-block w-3 h-3 rounded"
                style={{ backgroundColor: entry.color || 'black' }}
              />
              <span className="text-sm">{entry.value}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  if (type === 'line') {
    return (
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend content={props => <CustomLegend payload={props.payload as LegendPayload[]} />} />
            <Line type="monotone" dataKey="value" name="Cantidad De Avistamientos" stroke="#00bc70" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend content={props => <CustomLegend payload={props.payload as LegendPayload[]} />} />
          <Bar dataKey="value" name="Cantidad De Avistamientos">
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
