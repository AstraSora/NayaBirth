import { Card, CardContent } from '../ui/Card'
import {
  getTrimesterLabel,
  getTrimesterWeekRange,
  getTrimesterFromWeek,
  FULL_TERM_WEEKS
} from '../../constants/pregnancy'
import { getProgressPercentage, getWeeksRemaining } from '../../lib/dateUtils'

export function TrimesterProgress({ selectedWeek }) {
  const trimester = getTrimesterFromWeek(selectedWeek)
  const progressPercent = getProgressPercentage(selectedWeek)
  const weeksRemaining = getWeeksRemaining(selectedWeek)

  return (
    <Card className="mb-8">
      <CardContent className="pt-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted">You're in your</p>
            <p className="font-semibold text-foreground text-lg">
              {getTrimesterLabel(selectedWeek)} Trimester
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground-muted">
              {getTrimesterWeekRange(trimester)}
            </p>
            <p className="text-xs text-foreground-muted">
              {weeksRemaining} weeks to go
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-coral-400 to-coral-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (selectedWeek / FULL_TERM_WEEKS) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-foreground-muted mt-1 text-center">
            {progressPercent}% of pregnancy complete
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
