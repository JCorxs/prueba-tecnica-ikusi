import React, { useState } from 'react';
import type { HierarchyNode } from '../types';
interface Props {
    nodes: HierarchyNode[];
    onSelect: (path: string[]) => void;
}
export const HierarchyTree: React.FC<Props> = ({ nodes, onSelect }) => {
    return (
        <div className="space-y-2 p-2">
            {nodes.map((n) => (
                <TreeNode key={n.id} node={n} onSelect={onSelect} parentPath={[]} />
            ))}
        </div>
    );
};
const TreeNode: React.FC<{
    node: HierarchyNode; onSelect: (p: string[]) =>  void; parentPath: string[]}> = ({ node, onSelect, parentPath }) => {
    const [open, setOpen] = useState(false);
    const path = [...parentPath, node.id];
    return (
        <div>
            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-100 cursor-pointer" onClick={() => setOpen((s) => !s)}>
                <div className="flex items-center gap-2">
                    {node.children && node.children.length > 0 ? (
                        <span className="text-sm">{open ? '▾' : '▸'}</span>
                    ) : (
                        <span className="text-sm">•</span>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(path);
                        }}
                        className="text-left"
                    >
                        <span className="font-medium">{node.name}</span>
                        <span className="ml-2 text-xs text-gray-500">({node.type})</span>
                    </button>
                </div>
            </div>
            {open && node.children && node.children.length > 0 && (
                <div className="pl-4 border-l ml-2">
                    {node.children.map((c) => (
                        <TreeNode key={c.id} node={c} onSelect={onSelect}
                            parentPath={path} />
                    ))}
                </div>
            )}
        </div>
    );
};