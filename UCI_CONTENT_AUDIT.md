# NayaBirth Content Audit for UCI Review

**Generated:** January 29, 2026
**Purpose:** Identify app content that needs verification against UCI's actual offerings to ensure patient expectations align with available services.

---

## Summary

This audit identifies **all features, options, and services** mentioned in the NayaBirth app that should be reviewed with UCI staff to confirm availability. Items are categorized by priority level based on how commonly they vary between hospitals.

---

## HIGH PRIORITY - Commonly Varies Between Hospitals

These options are frequently NOT available at all hospitals and should be verified first:

### Pain Management Options
| Option | Location | Concern |
|--------|----------|---------|
| **Nitrous oxide (laughing gas)** | `questions.json` line 161 | Not available at many US hospitals |
| **Hydrotherapy (shower/tub)** | `questions.json` line 145 | Availability of labor tubs varies |

### Labor & Delivery Options
| Option | Location | Concern |
|--------|----------|---------|
| **Wireless/waterproof fetal monitor** | `questions.json` line 101 | Listed as "if available" - confirm |
| **Intermittent monitoring** | `questions.json` line 99 | May have restrictions based on policy |
| **Aromatherapy** | `questions.json` line 66 | Some hospitals prohibit due to allergies/fire codes |
| **Light snacks during labor** | `questions.json` line 87 | Many hospitals restrict to clear liquids only |
| **Doula support** | `questions.json` line 33 | Confirm UCI's doula policies |

### Pushing & Delivery Positions
| Option | Location | Concern |
|--------|----------|---------|
| **Hands and knees pushing** | `questions.json` line 195 | May be limited with epidural or monitoring |
| **Squatting position** | `questions.json` line 196 | Requires equipment (squat bar); may not be available |
| **Help catch the baby** | `questions.json` line 231 | Not all providers allow this |

### Cesarean Birth Options ("Gentle Cesarean")
| Option | Location | Concern |
|--------|----------|---------|
| **Clear drape** | `questions.json` line 294 | Not standard equipment everywhere |
| **Lowered drape to see baby born** | `questions.json` line 293 | Requires specific setup |
| **Immediate skin-to-skin in OR** | `questions.json` line 295 | Not all ORs accommodate |
| **Two support people in cesarean** | `questions.json` line 280 | Listed as "if allowed" - confirm policy |
| **Delayed cord clamping during cesarean** | `questions.json` line 296 | May not be possible in all situations |
| **Photos/video during cesarean** | `questions.json` line 297 | Many hospitals prohibit OR recording |

### Newborn & Postpartum Care
| Option | Location | Concern |
|--------|----------|---------|
| **Nursery available at night** | `questions.json` line 402 | Many "Baby-Friendly" hospitals don't offer |
| **Delay first bath 24+ hours** | `questions.json` line 337 | Confirm this is UCI standard practice |
| **Circumcision** | `questions.json` line 389 | Confirm availability and timing at UCI |

### Postpartum Support Services
| Option | Location | Concern |
|--------|----------|---------|
| **Home health visits** | `questions.json` line 456 | May not be a UCI-provided service |
| **Breastfeeding support groups** | `questions.json` line 453 | Confirm UCI offers this |
| **New parent classes** | `questions.json` line 455 | Confirm UCI offers this |
| **Postpartum mental health resources** | `questions.json` line 454 | Confirm specific UCI resources available |

---

## MEDIUM PRIORITY - Should Be Confirmed

These are more commonly available but should still be verified:

### Labor Support & Environment
| Option | Location | Notes |
|--------|----------|-------|
| Dim lighting capability | `questions.json` line 62 | Usually available |
| Music/playlist (patient's own) | `questions.json` line 63 | Usually allowed |
| Birth ball availability | `questions.json` line 146 | Common but confirm |
| Heat/cold packs | `questions.json` line 147 | Usually available |

### Pain Management
| Option | Location | Notes |
|--------|----------|-------|
| IV pain medication | `questions.json` line 160 | Standard but confirm options |
| Epidural availability | `questions.json` line 159 | Standard - confirm timing policies |
| Epidural "as early as possible" | `questions.json` line 174 | Policies vary on when epidural can be placed |

### Delivery Preferences
| Option | Location | Notes |
|--------|----------|-------|
| Mirror to see baby emerge | `questions.json` line 228 | Usually available on request |
| Touch baby's head during crowning | `questions.json` line 229 | Provider-dependent |
| Partner/support cuts cord | `questions.json` line 254 | Usually allowed |
| Delayed cord clamping (vaginal birth) | `questions.json` line 244 | Increasingly standard |
| Spontaneous pushing (mother-led) | `questions.json` line 208 | Provider-dependent |

### Newborn Care
| Option | Location | Notes |
|--------|----------|-------|
| Immediate skin-to-skin (vaginal) | `questions.json` line 324 | Usually standard |
| Lactation consultant visit | `questions.json` line 361 | Confirm availability and timing |
| Help with pumping | `questions.json` line 364 | Confirm pump availability |
| Decline/discuss standard procedures | `questions.json` line 375-380 | Confirm process for declining |

### Feeding Support
| Option | Location | Notes |
|--------|----------|-------|
| No formula unless medically needed | `questions.json` line 362 | Confirm Baby-Friendly status |
| No pacifiers unless requested | `questions.json` line 362 | Confirm policy |
| Formula available on request | `questions.json` line 363 | Usually available |

---

## LOW PRIORITY - Likely Standard (Quick Verification)

These are generally standard but worth a quick confirmation:

### Standard Newborn Procedures (confirm all offered)
- Vitamin K injection
- Antibiotic eye ointment (erythromycin)
- Hepatitis B vaccine
- Hearing screening
- Metabolic screening (heel prick)

### Prenatal Testing (confirm all offered at UCI)
- Dating ultrasound (8-10 weeks)
- First-trimester screening (NT scan + bloodwork)
- NIPT/Cell-free DNA testing
- Anatomy scan (18-22 weeks)
- Glucose tolerance test (24-28 weeks)
- Tdap vaccine (27-36 weeks)
- Rh antibody screen (week 28)
- Group B strep test (35-37 weeks)

### Hospital Provisions Listed
The app states UCI provides:
- Hospital gown
- Mesh underwear and pads
- Basic toiletries
- Diapers and wipes
- Baby blankets

*Source: `hospitalChecklist.json` line 64*

---

## UCI-SPECIFIC REFERENCES IN APP

The following UCI-specific content should be verified for accuracy:

### Contact Information
| Reference | Location | Value |
|-----------|----------|-------|
| UCI Labor & Delivery phone | `Hub.jsx`, `resources.json` | (949) 824-8200 |
| UCI Women's Health URL | `Hub.jsx` | https://www.ucihealth.org/medical-services/womens-health |

### Services Mentioned
| Service | Location | Notes |
|---------|----------|-------|
| "UCI Perinatal Mental Health" | `epds.json` line 156 | Confirm this service exists and name is correct |
| UCI Health partnership | `Hub.jsx` footer | Verify partnership language is approved |

---

## RECOMMENDED TOOLS SECTION

The Hub page (`Hub.jsx`) recommends these tools - confirm they align with UCI guidance:

1. **Pregnancy Timeline** - Track milestones and baby development
2. **Birth Plan Builder** - Create personalized birth plan
3. **Postpartum Self-Assessment** - EPDS screening tool
4. **Kick Counter** - Track baby movements
5. **Contraction Timer** - Time contractions
6. **Hospital Bag Checklist** - Packing list

---

## EDUCATIONAL CONTENT ARTICLES

The following articles in `resources.json` should be reviewed for accuracy:

### During Pregnancy
- What to Expect at Prenatal Visits
- Nutrition During Pregnancy
- When to Call Your Provider (includes warning signs)

### Labor & Delivery
- Signs of Labor
- What to Pack for the Hospital
- **Pain Management Options** (HIGH PRIORITY - mentions nitrous oxide)

### After Baby Arrives
- Your Physical Recovery
- Newborn Care Basics
- Your Postpartum Checkup

### Mental Health & Wellness
- Baby Blues vs. Postpartum Depression
- Self-Care for New Parents
- Getting Help for Emotional Struggles

### Breastfeeding & Feeding
- Getting Started with Breastfeeding
- Common Breastfeeding Challenges
- Formula Feeding Basics

---

## CRISIS RESOURCES LISTED

Verify these are appropriate to include:

| Resource | Phone | Location |
|----------|-------|----------|
| 988 Suicide & Crisis Lifeline | 988 | `epds.json` |
| Postpartum Support International | 1-800-944-4773 | `epds.json` |
| Emergency Services | 911 | `epds.json`, `Hub.jsx` |

---

## QUESTIONS FOR UCI REVIEW MEETING

Based on this audit, key questions to discuss:

1. **Nitrous oxide** - Is this available at UCI L&D? If not, should it be removed from the app?

2. **Hydrotherapy** - Are labor tubs or showers available? What are the policies?

3. **Gentle cesarean options** - Which of these does UCI accommodate?
   - Clear/lowered drape
   - Skin-to-skin in OR
   - Delayed cord clamping
   - Photography/video

4. **Nursery care** - Is the nursery available for overnight baby care, or is UCI "Baby-Friendly" (rooming-in only)?

5. **Support people** - How many support people are allowed in:
   - Labor room
   - Delivery room
   - Operating room for cesarean

6. **Doula policy** - Are doulas allowed? Do they count toward support person limit?

7. **Postpartum services** - Does UCI offer:
   - Breastfeeding support groups
   - New parent classes
   - Home health visits
   - Perinatal mental health services

8. **Fetal monitoring** - What are the policies on:
   - Intermittent vs. continuous monitoring
   - Wireless monitor availability

9. **Food/drink during labor** - What is the actual policy?

10. **Circumcision** - Is this performed at UCI? Timing?

---

## APPENDIX: COMPLETE LIST OF BIRTH PLAN OPTIONS

### Section 1: About You
- Name (text)
- Due date (date)
- Healthcare provider (text)
- Support people: Partner/Spouse, Doula, Family member, Friend
- Special considerations (textarea)

### Section 2: Labor Preferences
- Environment: Dim lighting, Music, Quiet, Minimal interruptions, Aromatherapy
- Mobility: Move freely, Some movement, Stay in bed, No preference
- Hydration: Clear liquids, Light snacks, IV only, No preference
- Monitoring: Intermittent, Continuous, Wireless, Follow recommendations
- Induction: Natural methods first, Medical if recommended, Discuss later

### Section 3: Pain Management
- Approach: Unmedicated, Wait and see, Epidural when appropriate, Early epidural
- Non-medical: Breathing, Massage, Hydrotherapy, Birth ball, Heat/cold, Music/meditation, Movement
- Medical: Epidural, IV medication, Nitrous oxide, Prefer to avoid
- Epidural timing: ASAP, Active labor, On request, Last resort

### Section 4: Delivery Preferences
- Positions: Semi-reclined, Side-lying, Hands and knees, Squatting, Whatever feels right
- Pushing: Directed, Spontaneous, Combination, No preference
- Episiotomy: Avoid unless necessary, Okay if recommended, No preference
- Birth moment: Mirror, Touch head, Discover sex, Help catch, Photos/video, Calm room
- Cord clamping: Delayed (1-3 min), Immediate, No preference
- Cord cutting: Partner, Self, Provider, No preference

### Section 5: Cesarean Preferences
- Support: Partner, Two people if allowed, Alone okay
- Preferences: Narration, Music, Lowered drape, Clear drape, Skin-to-skin in OR, Delayed clamping, Photos/video
- Anesthesia: Regional (awake), General if needed, Follow recommendation

### Section 6: Newborn Care
- Skin-to-skin: Immediate, After assessment, Partner if I can't, No preference
- First bath: Delay 24+ hours, Before discharge, Be present, No preference
- Feeding: Breastfeeding, Formula, Combination, Undecided
- Feeding support: Lactation consultant, No formula/pacifiers, Okay to supplement, Help with pumping
- Procedures to discuss: Vitamin K, Eye ointment, Hep B vaccine, Hearing screen, Metabolic screen
- Circumcision: Yes, No, Undecided, N/A
- Rooming: 24/7 with me, Nursery at night, Flexible

### Section 7: Postpartum
- Visitors: Limited, Close family, Welcome, Flexible
- Photos: Ask first, No social media, Okay to share
- Discharge: ASAP, Standard stay, Stay longer if possible
- Support resources: Breastfeeding groups, Mental health, Parent classes, Home visits
- Additional notes (textarea)

---

*End of Audit Document*
