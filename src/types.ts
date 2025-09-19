export type NodeType = 'class' | 'family' | 'species';

export interface HierarchyNode {
    id: string;
    name: string;
    type: NodeType;
    children?: HierarchyNode[];
}

export interface MetricPoint {
    key:string;
    name:string;
    value:number;
}