import type { HierarchyNode, MetricPoint } from '../types';

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
    {
        id: 'pec',
        name: 'Peces',
        type: 'class',
        children: [
          {
            id: 'sal',
            name: 'Salmonidae',
            type: 'family',
            children: [
              { id: 'salmo', name: 'Salmón', type: 'species' },
              { id: 'truta', name: 'Trucha', type: 'species' },
            ],
          },
          {
            id: 'car',
            name: 'Carpidae',
            type: 'family',
            children: [
              { id: 'carpa', name: 'Carpa', type: 'species' },
              { id: 'goldfish', name: 'Pez dorado', type: 'species' },
            ],
          },
        ],
      },
      {
        id: 'rep',
        name: 'Reptiles',
        type: 'class',
        children: [
          {
            id: 'saur',
            name: 'Saurios',
            type: 'family',
            children: [
              { id: 'iguana', name: 'Iguana', type: 'species' },
              { id: 'gecko', name: 'Gecko', type: 'species' },
            ],
          },
          {
            id: 'serp',
            name: 'Serpientes',
            type: 'family',
            children: [
              { id: 'cobra', name: 'Cobra', type: 'species' },
              { id: 'boa', name: 'Boa', type: 'species' },
            ],
          },
        ],
      },
      {
        id: 'ins',
        name: 'Insectos',
        type: 'class',
        children: [
          {
            id: 'lep',
            name: 'Lepidópteros',
            type: 'family',
            children: [
              { id: 'mariposa-monarca', name: 'Mariposa monarca', type: 'species' },
              { id: 'polilla', name: 'Polilla', type: 'species' },
            ],
          },
          {
            id: 'col',
            name: 'Coleópteros',
            type: 'family',
            children: [
              { id: 'escarabajo', name: 'Escarabajo', type: 'species' },
              { id: 'mariquita', name: 'Mariquita', type: 'species' },
            ],
          },
        ],
      },
      {
        id: 'mol',
        name: 'Moluscos',
        type: 'class',
        children: [
          {
            id: 'ceph',
            name: 'Cefalópodos',
            type: 'family',
            children: [
              { id: 'pulpo', name: 'Pulpo', type: 'species' },
              { id: 'calamar', name: 'Calamar', type: 'species' },
            ],
          },
          {
            id: 'gast',
            name: 'Gasterópodos',
            type: 'family',
            children: [
              { id: 'caracol', name: 'Caracol', type: 'species' },
              { id: 'babosa', name: 'Babosa', type: 'species' },
            ],
          },
        ],
      },
];

// Latencia y errores simulados
function simulate<T>(data: T, delay = 700, failRate = 0.05): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < failRate) return reject(new Error('Simulated API error'));
            resolve(data);
        }, delay);
    });
}
// Simula fetch de jerarquía
export async function fetchHierarchy() {
    return simulate(MOCK_HIERARCHY, 800);
}
// Simula fetch de métricas, con filtrado por path jerárquico
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
    // Iniciar recorrido
    walk(MOCK_HIERARCHY);

    // Generar métricas aleatorias
    const metrics: MetricPoint[] = allSpecies.map((sp) => ({
        key: sp.id,
        name: sp.name,
        value: Math.floor(Math.random() * 100),
    }));
    // Filtrado según path jerárquico
    const filtered = metrics.filter((m) => {
        if (selectedIds.length === 0) return true;
        const specie = allSpecies.find((o) => o.id === m.key);
        if (!specie) return false;
        
        const speciePathArr = specie.path.split('/');
        return selectedIds.every((id, idx) => speciePathArr[idx] === id);
      });
      
    //Logs para revisar selección de categorías
    console.log('Selected IDs:', selectedIds);
    console.log('Generated species:', allSpecies);
    console.log('Metrics:', filtered);

    return simulate(filtered, 700);
}
