# PRD: First-Time User Onboarding

## Introduction

NayaBirth currently launches users directly into the Hub page with no introduction, explanation, or personalization. Users must discover features on their own, and the app cannot tailor recommendations based on pregnancy stage.

This PRD defines a first-time user onboarding experience that:
1. Welcomes new users and explains what NayaBirth offers
2. Collects pregnancy stage (due date/trimester) to personalize the experience
3. Recommends relevant tools based on where the user is in their pregnancy journey
4. Provides a brief orientation to key features
5. Creates a foundation for ongoing personalized experiences

This feature is critical for user retention—maternal health apps see significantly higher engagement when users feel the app "knows" their stage and needs.

---

## Goals

- **Increase first-session engagement**: Guide users to their most relevant tool within 60 seconds of opening the app
- **Collect pregnancy stage data**: Capture due date or trimester to enable personalized tool/content recommendations
- **Reduce cognitive load**: Help users understand what the app offers without overwhelming them
- **Support returning users**: Allow quick bypass for users who have already onboarded or have saved data
- **Establish trust**: Present UCI Health partnership and app purpose clearly upfront
- **Enable future personalization**: Create data foundation for stage-appropriate notifications, content, and tool surfacing

---

## User Stories

### US-001: Detect first-time vs returning users
**Description:** As a developer, I need to detect whether a user has completed onboarding so returning users aren't shown the flow repeatedly.

**Acceptance Criteria:**
- [ ] Check localStorage for `nayabirth_onboarding_complete` flag on app load
- [ ] If flag exists and is `true`, route directly to Hub
- [ ] If flag is missing or `false`, route to onboarding flow
- [ ] Also check for existing data (birth plan draft, due date) as secondary signal of returning user
- [ ] Typecheck passes

---

### US-002: Create OnboardingContext for state management
**Description:** As a developer, I need a React Context to manage onboarding state and user profile data collected during onboarding.

**Acceptance Criteria:**
- [ ] Create `OnboardingContext.jsx` in `/src/context/`
- [ ] State includes: `{ hasCompletedOnboarding, dueDate, trimester, isFirstPregnancy, onboardingStep }`
- [ ] Persist `dueDate` and profile data to localStorage under `nayabirth_user_profile`
- [ ] Provide `completeOnboarding()` action that sets flag and navigates to Hub
- [ ] Provide `skipOnboarding()` action for users who want to skip
- [ ] Typecheck passes

---

### US-003: Welcome screen (Step 1)
**Description:** As a first-time user, I want to see a welcoming introduction that explains what the app offers so I understand its value immediately.

**Acceptance Criteria:**
- [ ] Display UCI Health partnership badge prominently
- [ ] Show app name "NayaBirth" with tagline
- [ ] Brief value proposition (3-4 bullet points): Birth Plan Builder, Pregnancy Timeline, Health Assessments, Resources
- [ ] "Get Started" primary button to advance
- [ ] "I've used this app before" text link to skip to Hub
- [ ] "Already have a saved birth plan?" link to PIN retrieval flow
- [ ] Responsive design matching existing app aesthetics
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-004: Pregnancy stage collection (Step 2)
**Description:** As a first-time user, I want to enter my pregnancy stage so the app can show me relevant tools and information.

**Acceptance Criteria:**
- [ ] Ask "Where are you in your pregnancy journey?"
- [ ] Option A: Enter due date (date picker, saves exact date)
- [ ] Option B: Select trimester (First: weeks 1-12, Second: weeks 13-26, Third: weeks 27-40)
- [ ] Option C: "I'm postpartum" (recently delivered)
- [ ] Option D: "I'm planning a pregnancy" (pre-conception)
- [ ] Option E: "Skip this step" subtle link
- [ ] Calculate and display current week if due date entered
- [ ] Store selection in OnboardingContext and localStorage
- [ ] "Continue" button advances to next step
- [ ] Back button returns to Welcome screen
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Personalized tool recommendations (Step 3)
**Description:** As a first-time user, I want to see which tools are most relevant to my pregnancy stage so I know where to start.

**Acceptance Criteria:**
- [ ] Display "Recommended for you" heading with stage context (e.g., "At 28 weeks...")
- [ ] Show 2-3 recommended tools based on stage:
  - **First trimester**: Pregnancy Timeline, Resources (early pregnancy)
  - **Second trimester**: Birth Plan Builder, Pregnancy Timeline
  - **Third trimester**: Birth Plan Builder, Hospital Checklist, Contraction Timer
  - **Postpartum**: Postpartum Assessment, Resources (postpartum, feeding)
  - **Pre-conception**: Resources (pregnancy planning)
- [ ] Each recommendation shows tool icon, name, and 1-line explanation of why it's relevant now
- [ ] "Explore [Tool Name]" button on primary recommendation
- [ ] "See all tools" secondary link to complete Hub
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: Quick feature tour (Step 4 - Optional)
**Description:** As a first-time user, I want a brief overview of key features so I understand how to navigate the app.

**Acceptance Criteria:**
- [ ] Show 3 swipeable/tappable cards highlighting key features:
  1. "Build Your Birth Plan" - Create and share preferences with your care team
  2. "Track Your Journey" - Week-by-week timeline with milestones
  3. "Access Resources" - Evidence-based information from UCI Health
- [ ] Dot indicators showing current position (1/3, 2/3, 3/3)
- [ ] "Skip tour" link always visible
- [ ] "Finish" button on last card completes onboarding
- [ ] Swipe gestures work on mobile
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Complete onboarding and transition to Hub
**Description:** As a user completing onboarding, I want a smooth transition to the main app with my personalized experience ready.

**Acceptance Criteria:**
- [ ] Set `nayabirth_onboarding_complete` to `true` in localStorage
- [ ] If due date was entered, also set `nayabirth-timeline` localStorage (reuse existing key)
- [ ] Navigate to Hub page
- [ ] Hub should reflect personalization (due date shows in Timeline if set)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: Update Hub to show personalized welcome
**Description:** As a returning user who completed onboarding, I want the Hub to acknowledge my pregnancy stage so the app feels personalized.

**Acceptance Criteria:**
- [ ] If due date is known, show "Welcome back! You're in week X" instead of generic welcome
- [ ] If trimester only, show "Welcome back! [First/Second/Third] trimester"
- [ ] If postpartum, show "Welcome back! How are you feeling today?"
- [ ] Highlight recommended tools section based on stage (same logic as US-005)
- [ ] Keep existing Hub layout and functionality intact
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Add "Reset onboarding" option in Settings
**Description:** As a user, I want to be able to redo the onboarding flow if my situation changes (e.g., new pregnancy) or I want to update my due date.

**Acceptance Criteria:**
- [ ] Add "Restart Setup" or "Update Pregnancy Info" option in Settings page
- [ ] Tapping clears `nayabirth_onboarding_complete` and `nayabirth_user_profile` from localStorage
- [ ] Navigates user back to onboarding flow
- [ ] Confirmation dialog before clearing: "This will restart the welcome setup. Your saved birth plans will not be affected."
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-010: Create onboarding route structure
**Description:** As a developer, I need routes configured for the onboarding flow.

**Acceptance Criteria:**
- [ ] Add `/onboarding` route that renders OnboardingFlow component
- [ ] OnboardingFlow manages steps internally (not separate routes per step)
- [ ] Update App.jsx to check onboarding status and redirect appropriately on initial load
- [ ] Preserve existing routes and functionality
- [ ] Typecheck passes

---

## Functional Requirements

- **FR-1:** The app MUST detect first-time users by checking for `nayabirth_onboarding_complete` localStorage flag
- **FR-2:** First-time users MUST be routed to `/onboarding` before accessing the main Hub
- **FR-3:** The onboarding flow MUST collect pregnancy stage (due date, trimester, postpartum, or pre-conception)
- **FR-4:** The onboarding flow MUST allow users to skip any step
- **FR-5:** Tool recommendations MUST be dynamically generated based on collected pregnancy stage
- **FR-6:** Completing onboarding MUST set the localStorage flag and redirect to Hub
- **FR-7:** The Hub MUST display personalized welcome messaging when pregnancy stage is known
- **FR-8:** Users MUST be able to reset onboarding from Settings to update their information
- **FR-9:** Existing app functionality MUST NOT be affected by onboarding changes
- **FR-10:** If a user has existing data (birth plan draft, timeline due date), they SHOULD be treated as returning users

---

## Non-Goals (Out of Scope)

- **Account creation / authentication**: No user accounts; continue using localStorage + Firebase PIN system
- **Push notification setup**: Will be addressed in a separate PWA notifications PRD
- **Partner/family member onboarding**: Separate feature for multi-user access
- **Pregnancy history collection**: Not asking about previous pregnancies, complications, etc.
- **Medical information collection**: No health conditions, medications, or clinical data during onboarding
- **Analytics/tracking setup**: Onboarding completion metrics are out of scope for this PRD
- **A/B testing different flows**: Single flow implementation only
- **Internationalization**: English only for initial implementation

---

## Design Considerations

### Visual Style
- Match existing NayaBirth design language (coral accents, soft gradients, rounded cards)
- Use existing UI components: `Button`, `Card`, `Input` from `/src/components/ui/`
- Maintain dark mode compatibility using CSS custom properties
- Mobile-first responsive design (primary use case is phone)

### Interaction Patterns
- Linear flow with clear progress indication
- Large touch targets for mobile users
- Swipe gestures for tour cards (consider `react-swipeable` or native scroll-snap)
- Subtle animations for transitions between steps

### Illustrations/Icons
- Consider adding friendly illustrations (pregnant figure, baby items) to warm up the experience
- Reuse existing tool icons from Hub for consistency

### Accessibility
- All interactive elements must be keyboard accessible
- Color contrast must meet WCAG AA standards
- Screen reader support for step progression

### Mockup Reference
```
┌─────────────────────────────────┐
│     [UCI Health Logo]           │
│                                 │
│        Welcome to               │
│        NayaBirth                │
│                                 │
│  Your pregnancy companion from  │
│  UCI Health                     │
│                                 │
│  ✓ Build your birth plan        │
│  ✓ Track weekly milestones      │
│  ✓ Access trusted resources     │
│  ✓ Prepare for delivery         │
│                                 │
│     ┌─────────────────────┐     │
│     │    Get Started      │     │
│     └─────────────────────┘     │
│                                 │
│  I've used this before          │
│  Already have a saved plan?     │
│                                 │
└─────────────────────────────────┘
```

---

## Technical Considerations

### State Management
- New `OnboardingContext` follows existing pattern (see `ThemeContext`, `BirthPlanContext`)
- User profile data shape:
```javascript
{
  dueDate: "2025-06-15" | null,      // ISO date string
  trimester: 1 | 2 | 3 | null,       // Calculated or manually selected
  stage: "pregnant" | "postpartum" | "planning",
  onboardingCompletedAt: "2025-01-22T..." | null
}
```

### localStorage Keys (New)
- `nayabirth_onboarding_complete`: boolean
- `nayabirth_user_profile`: JSON object with pregnancy info

### Integration Points
- **Pregnancy Timeline**: Sync due date with existing `nayabirth-timeline` localStorage key
- **Hub**: Read from OnboardingContext for personalized messaging
- **Settings**: Ability to trigger re-onboarding

### Routing Logic
```javascript
// In App.jsx or a wrapper component
const hasCompletedOnboarding = localStorage.getItem('nayabirth_onboarding_complete') === 'true';
const hasExistingData = localStorage.getItem('nayabirth_draft') || localStorage.getItem('nayabirth-timeline');

if (!hasCompletedOnboarding && !hasExistingData) {
  // Redirect to /onboarding
}
```

### Performance
- Onboarding assets should be lightweight (no heavy images blocking first paint)
- Consider lazy loading tour illustrations
- Total onboarding JS bundle should be < 50KB

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Onboarding completion rate | > 70% | Users who reach Hub after starting onboarding |
| Time to first tool interaction | < 90 seconds | From app open to first tool tap |
| Due date capture rate | > 50% | Users who enter due date vs skip |
| Skip rate per step | < 30% per step | Users who skip each individual step |
| Return visit rate (7-day) | > 40% | Users who return within 7 days of onboarding |

---

## Open Questions

1. **Should we ask about first-time pregnancy?** This could enable more targeted recommendations (e.g., emphasizing educational content for first-time parents) but adds friction.

2. **What happens if a user's due date passes?** Should we automatically transition them to "postpartum" mode, or prompt them to update?

3. **Should the tour be skippable entirely or mandatory?** Current spec allows skipping, but stakeholders may want guaranteed feature exposure.

4. **Do we need a "What's New" flow for existing users after major updates?** This is separate from onboarding but related UX consideration.

5. **Should pregnancy stage affect resource sorting/filtering?** E.g., showing third-trimester content first for users in their third trimester.

---

## Appendix: Tool Recommendation Matrix

| Stage | Primary Recommendation | Secondary Recommendations |
|-------|----------------------|--------------------------|
| First Trimester (weeks 1-12) | Pregnancy Timeline | Resources (Early Pregnancy) |
| Second Trimester (weeks 13-26) | Birth Plan Builder | Pregnancy Timeline, Kick Counter |
| Third Trimester (weeks 27-40) | Birth Plan Builder | Hospital Checklist, Contraction Timer |
| Postpartum | Postpartum Assessment | Resources (Postpartum, Feeding) |
| Pre-conception | Resources | Pregnancy Timeline (for planning) |

---

## Implementation Order

Suggested sequencing for development:

1. **Foundation** (US-001, US-002, US-010): Detection, context, routing
2. **Core Flow** (US-003, US-004, US-005): Welcome, stage collection, recommendations
3. **Polish** (US-006, US-007): Tour, completion transition
4. **Integration** (US-008, US-009): Hub personalization, settings reset

---

*PRD Created: January 22, 2026*
*Target Audience: Development team and UCI Health stakeholders*
*Status: Ready for review*
