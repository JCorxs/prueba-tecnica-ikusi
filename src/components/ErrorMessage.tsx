export const ErrorMessage: React.FC<{ error?: Error | string }> = ({ error }) => (
    <div className="p-4 text-red-600 bg-red-50 rounded">{error?.toString() ||
        'Error'}</div>
);