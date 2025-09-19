export const Loading: React.FC<{ className?: string }> = ({ className = '' }) => (
<div className={`p-4 text-center ${className}`}>Cargando…</div>
);