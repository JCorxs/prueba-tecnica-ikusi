import React, { useEffect, useState } from 'react';
import { fetchHierarchy, fetchMetrics } from '../services/mockApi';
import type { HierarchyNode, MetricPoint } from '../types';
import { useAsync } from '../hooks/useAsync';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import { HierarchyTree } from '../components/HierarchyTree';
import { ChartView } from '../components/ChartView';
import { useAuth } from '../contexts/AuthContext';
export const DashboardPage: React.FC = () => {
    const { data: hierarchy, loading, error } = useAsync<HierarchyNode[]>(() =>
        fetchHierarchy(), []);
    const [selectedPath, setSelectedPath] = useState<string[]>([]);
    const [metrics, setMetrics] = useState<MetricPoint[]>([]);
    const [metricsLoading, setMetricsLoading] = useState(false);
    const { logout } = useAuth();
    //Típo de grafico
    const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
    useEffect(() => {
        setMetricsLoading(true);
        fetchMetrics(selectedPath)
            .then((m) => setMetrics(m))
            .catch(() => setMetrics([]))
            .finally(() => setMetricsLoading(false));
    }, [selectedPath]);
    if (loading) return <Loading />;
    if (error) return <ErrorMessage error={error} />;
    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Reporte taxonómico</h1>
                <div>
                    <button onClick={() => setSelectedPath([])} className="mr-2 px-3 py-1 border rounded">Limpiar filtros</button>
                    <button onClick={() => logout()} className="px-3 py-1 bg-principal hover:brightness-90 transition-all text-white rounded">Salir</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <aside className="md:col-span-1 bg-white p-3 rounded shadow">
                    <h3 className="font-semibold mb-2">Jerarquía</h3>
                    {hierarchy && <HierarchyTree nodes={hierarchy} onSelect={(p) =>
                        setSelectedPath(p)} />}
                </aside>
                <main className="md:col-span-3 bg-white p-3 rounded shadow">
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <strong>Filtros:</strong>
                            <span className="ml-2 text-sm text-gray-600">{selectedPath.join('> ') || 'Todos'}</span>
                        </div>
                        <div className="text-sm text-gray-500">Especies avistadas</div>
                    </div>

                    <div className="mb-3 flex gap-2">
                        <button
                            className="px-3 py-1 bg-principal text-white rounded hover:brightness-90 transition-all"
                            onClick={() => setChartType('bar')}>Barras
                        </button>
                        <button
                            className="px-3 py-1 bg-principal text-white rounded hover:brightness-90 transition-all"
                            onClick={() => setChartType('line')}>Línea
                        </button>
                    </div>

                    <div>
                        {metricsLoading ? (<Loading />) : metrics.length === 0 ? (
                            <div className="p-4 text-gray-500">No hay datos para la
                                selección.</div>
                        ) : (
                            <ChartView data={metrics} type={chartType}/>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};