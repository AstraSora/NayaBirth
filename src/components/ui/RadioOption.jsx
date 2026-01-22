export function RadioOption({
  name,
  value,
  label,
  checked,
  onChange,
  className = '',
}) {
  return (
    <label
      className={`
        option-card
        ${checked ? 'option-card-selected' : ''}
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
      <span className={`text-base ${checked ? 'text-foreground font-medium' : 'text-foreground-secondary'}`}>
        {label}
      </span>
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
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
        />
      ))}
    </div>
  )
}
