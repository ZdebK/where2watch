interface StreamingSitesPickerProps {
  platforms: string[]
  selectedSites: string[]
  onToggle: (name: string) => void
  isLoading?: boolean
  error?: string
}

export function StreamingSitesPicker({
  platforms,
  selectedSites,
  onToggle,
  isLoading,
  error,
}: StreamingSitesPickerProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <span className="text-soft-gray text-sm">Loading platforms...</span>
        ) : (
          platforms.map((name) => {
            const isActive = selectedSites.includes(name)
            return (
              <button
                key={name}
                type="button"
                onClick={() => onToggle(name)}
                className={`px-3 py-1 rounded-lg text-sm transition-all ${
                  isActive ? 'chip-active' : 'chip'
                }`}
              >
                {name}
              </button>
            )
          })
        )}
      </div>
      {error && (
        <p className="text-sm mt-1" style={{ color: 'var(--w2w-error)' }}>
          {error}
        </p>
      )}
    </div>
  )
}
