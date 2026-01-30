/**
 * Availability Badge for UCI Hospital options
 * Shows whether an option is available, unavailable, or needs verification
 */

const AVAILABILITY_CONFIG = {
  available: {
    label: 'Available at UCI',
    shortLabel: 'UCI',
    className: 'bg-teal-100 text-teal-700 border-teal-200',
    icon: '✓'
  },
  unavailable: {
    label: 'Not available at UCI',
    shortLabel: 'Not at UCI',
    className: 'bg-red-100 text-red-700 border-red-200',
    icon: '✗'
  },
  ask: {
    label: 'Ask your provider',
    shortLabel: 'Ask provider',
    className: 'bg-amber-100 text-amber-700 border-amber-200',
    icon: '?'
  },
  limited: {
    label: 'Limited availability',
    shortLabel: 'Limited',
    className: 'bg-sky-100 text-sky-700 border-sky-200',
    icon: '~'
  }
}

export function AvailabilityBadge({ availability, showFull = false }) {
  if (!availability || !AVAILABILITY_CONFIG[availability]) {
    return null
  }

  const config = AVAILABILITY_CONFIG[availability]

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border
        ${config.className}
      `}
      title={config.label}
    >
      <span aria-hidden="true">{config.icon}</span>
      <span>{showFull ? config.label : config.shortLabel}</span>
    </span>
  )
}

export function AvailabilityNote({ availability }) {
  if (!availability || !AVAILABILITY_CONFIG[availability]) {
    return null
  }

  const config = AVAILABILITY_CONFIG[availability]

  if (availability === 'unavailable') {
    return (
      <p className="text-xs text-red-600 mt-1">
        This option is not currently available at UCI Health.
      </p>
    )
  }

  if (availability === 'ask') {
    return (
      <p className="text-xs text-amber-600 mt-1">
        Check with your UCI care team about availability.
      </p>
    )
  }

  return null
}
