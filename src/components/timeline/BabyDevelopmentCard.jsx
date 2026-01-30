import { Card, CardContent } from '../ui/Card'
import milestoneData from '../../data/pregnancyMilestones.json'

// Map source names to their URLs from the sources object
function getSourceUrl(sourceName) {
  const sourceMap = {
    'ACOG': milestoneData.sources.fetalDevelopment.url,
    'Mayo Clinic': milestoneData.sources.mayoClinic.url,
    'Cleveland Clinic': milestoneData.sources.clevelandClinic.url,
  }
  return sourceMap[sourceName] || null
}

export function BabyDevelopmentCard({ week }) {
  const development = milestoneData.babyDevelopment.find(d => d.week === week)

  if (!development) {
    const closest = milestoneData.babyDevelopment.reduce((prev, curr) => {
      return Math.abs(curr.week - week) < Math.abs(prev.week - week) ? curr : prev
    })
    return (
      <Card color="coral">
        <CardContent className="pt-5">
          <div className="flex items-center gap-4">
            <div className="text-5xl">{closest.icon || '👶'}</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Baby is the size of a {closest.size.toLowerCase()}</h3>
              <p className="text-sm text-foreground-secondary">{closest.highlight}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const sourceUrl = development.source ? getSourceUrl(development.source) : null

  return (
    <Card color="coral">
      <CardContent className="pt-5">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{development.icon || '👶'}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">Baby is the size of a {development.size.toLowerCase()}</h3>
            {development.length && (
              <p className="text-xs text-foreground-muted mb-1">~{development.length} long</p>
            )}
            <p className="text-sm text-foreground-secondary">{development.highlight}</p>
            <div className="mt-2 space-y-1">
              {development.length && (
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <span className="italic">Size data: INTERGROWTH-21st</span>
                  <a
                    href={milestoneData.sources.fetalGrowth.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-coral-600 hover:text-coral-700 underline decoration-coral-300 hover:decoration-coral-500"
                  >
                    View study
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
              {development.source && (
                <div className="flex items-center gap-2 text-xs text-foreground-muted">
                  <span className="italic">Development: {development.source}</span>
                  {sourceUrl && (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-coral-600 hover:text-coral-700 underline decoration-coral-300 hover:decoration-coral-500"
                    >
                      Learn more
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
