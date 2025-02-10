interface SpinnerProps {
  message?: string;
}

export function Spinner({ message = 'Loading...' }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-4 space-y-4">
      <div className="w-7 h-7 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
      <span className="text-red-400 font-bold text-lg">{message}</span>
    </div>
  );
}
