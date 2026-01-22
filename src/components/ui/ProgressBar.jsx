export function ProgressBar({ current, total, className = '' }) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-foreground-muted">
          Section {current + 1} of {total}
        </span>
        <span className="text-sm font-medium text-coral-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-coral-400 to-coral-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export function ProgressDots({ current, total, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`
            transition-all duration-300 rounded-full
            ${index === current
              ? 'w-8 h-2 bg-coral-400'
              : index < current
                ? 'w-2 h-2 bg-coral-400'
                : 'w-2 h-2 bg-muted'
            }
          `}
        />
      ))}
    </div>
  )
}
