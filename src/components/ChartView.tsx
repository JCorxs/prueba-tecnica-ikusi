import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts';
import type { MetricPoint } from '../types';
export const ChartView: React.FC<{ data: MetricPoint[] }> = ({ data }) => {
    const chartData = data.map((d) => ({ name: d.name, value: d.value }));
    //Colores aleatorios
    const getRandomColor = () => {
       return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }
    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getRandomColor()} />
                        ))}
                        </Bar> 
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};