import type { HierarchyNode, MetricPoint } from '../types';

// Data estática de ejemplo (Country > City > Office)
const MOCK_HIERARCHY: HierarchyNode[] = [
    {
        id: 'mam',
        name: 'Mamíferos',
        type: 'class',
        children: [
            {
                id: 'fel',
                name: 'Felinos',
                type: 'family',
                children: [
                    { id: 'tig', name: 'Tigre', type: 'species' },
                    { id: 'leo', name: 'León', type: 'species' },
                ],
            },
            {
                id: 'can',
                name: 'Caninos',
                type: 'family',
                children: [
                    { id: 'lob', name: 'Lobo', type: 'species' },
                    { id: 'per', name: 'Perro', type: 'species' },
                ],
            },
        ],
    },
    {
        id: 'ave',
        name: 'Aves',
        type: 'class',
        children: [
            {
                id: 'rap',
                name: 'Rapaces',
                type: 'family',
                children: [
                    { id: 'agu', name: 'Águila', type: 'species' },
                    { id: 'hal', name: 'Halcón', type: 'species' },
                ],
            },
        ],
    },
];

// Simula latencia y posibilidad de error
function simulate<T>(data: T, delay = 700, failRate = 0.05): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < failRate) return reject(new Error('Simulated API error'));
            resolve(data);
        }, delay);
    });
}

export async function fetchHierarchy() {
    return simulate(MOCK_HIERARCHY, 800);
}

export async function fetchMetrics(selectedIds: string[] = []) {
    type SpecieInfo = { id: string; name: string; path: string };

    const allSpecies: SpecieInfo[] = [];

    // Recorrido recursivo para recolectar oficinas + path jerárquico
    function walk(nodes: HierarchyNode[], path: string[] = []) {
        for (const n of nodes) {
            const currentPath = [...path, n.id];
            if (n.type === 'species') {
                allSpecies.push({
                    id: n.id,
                    name: n.name,
                    path: currentPath.join('/'),
                });
            }
            if (n.children) walk(n.children, currentPath);
        }
    }

    walk(MOCK_HIERARCHY);

    // Generar métricas aleatorias
    const metrics: MetricPoint[] = allSpecies.map((sp) => ({
        key: sp.id,
        name: sp.name,
        value: Math.floor(Math.random() * 100),
    }));

    const filtered = metrics.filter((m) => {
        if (selectedIds.length === 0) return true;
        const specie = allSpecies.find((o) => o.id === m.key);
        if (!specie) return false;
        
        const speciePathArr = specie.path.split('/');
        return selectedIds.every((id, idx) => speciePathArr[idx] === id);
      });
      

    console.log('Selected IDs:', selectedIds);
    console.log('Generated species:', allSpecies);
    console.log('Metrics:', filtered);

    return simulate(filtered, 700);
}
