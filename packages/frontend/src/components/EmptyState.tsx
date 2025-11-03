interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-3xl bg-white/80 px-6 py-10 text-secondary">
    <span className="text-3xl">🧭</span>
    <p className="text-sm font-medium">{message}</p>
  </div>
);

export default EmptyState;
