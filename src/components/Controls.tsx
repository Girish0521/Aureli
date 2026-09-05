'use client';

interface ControlsProps {
  isAnimating: boolean;
  onToggleAnimation: () => void;
}

export default function Controls({ isAnimating, onToggleAnimation }: ControlsProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800">
      <span className="text-sm text-zinc-400">Animation:</span>
      <button
        onClick={onToggleAnimation}
        className={`px-4 py-2 rounded transition-colors ${
          isAnimating
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
        }`}
      >
        {isAnimating ? 'Playing' : 'Paused'}
      </button>
      <span className="text-xs text-zinc-500 ml-auto">
        Drag to rotate • Scroll to zoom
      </span>
    </div>
  );
}
