import { AvailabilityBadge } from './AvailabilityBadge'

export function RadioOption({
  name,
  value,
  label,
  checked,
  onChange,
  availability,
  className = '',
}) {
  const isUnavailable = availability === 'unavailable'

  return (
    <label
      className={`
        option-card
        ${checked ? 'option-card-selected' : ''}
        ${isUnavailable ? 'opacity-60' : ''}
        ${className}
      `}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
          transition-all duration-200
          ${checked
            ? 'border-coral-400 bg-coral-400'
            : 'border-strong bg-surface'
          }
        `}
      >
        {checked && (
          <div className="w-2 h-2 bg-white rounded-full" />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-base ${checked ? 'text-foreground font-medium' : 'text-foreground-secondary'}`}>
            {label}
          </span>
          {availability && <AvailabilityBadge availability={availability} />}
        </div>
      </div>
    </label>
  )
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  className = '',
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <RadioOption
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          availability={option.availability}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
        />
      ))}
    </div>
  )
}
