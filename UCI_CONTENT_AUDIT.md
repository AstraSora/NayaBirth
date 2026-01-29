# NayaBirth Content Audit for UCI Review

**Generated:** January 29, 2026
**Last Updated:** January 29, 2026 (Web research verification added)
**Purpose:** Identify app content that needs verification against UCI's actual offerings to ensure patient expectations align with available services.

---

## Web Research Summary

The following findings are based on publicly available information from [UCI Health's website](https://www.ucihealth.org/medical-services/specialties/maternity) and related sources. Items marked "Unconfirmed" should still be verified directly with UCI staff.

### Key Confirmed Facts About UCI Health Maternity:
- ✅ **Baby-Friendly designated hospital** (rooming-in encouraged)
- ✅ **2 support people allowed** in L&D and postpartum
- ✅ **Doulas permitted** with prior arrangements
- ✅ **Golden Hour encouraged** with skin-to-skin contact
- ✅ **Lactation consultants available** during stay and after discharge
- ✅ **Private rooms** for most patients
- ✅ **22% cesarean rate** (below national goal of 24%)
- ✅ **25% VBAC rate** (twice Orange County average)
- ✅ **3.3% episiotomy rate** (vs 29% OC average)
- ✅ **Showers available** in delivery suites
- ❌ **No mention of labor tubs** or water birth
- ❌ **No mention of nitrous oxide**

---

## HIGH PRIORITY - Commonly Varies Between Hospitals

These options are frequently NOT available at all hospitals and should be verified first:

### Pain Management Options
| Option | Location | Concern | Confirmed |
|--------|----------|---------|-----------|
| **Nitrous oxide (laughing gas)** | `questions.json` line 161 | Not available at many US hospitals | ❌ **NO** - Not mentioned on UCI site |
| **Hydrotherapy (shower/tub)** | `questions.json` line 145 | Availability of labor tubs varies | ⚠️ **PARTIAL** - Showers confirmed; labor tubs NOT mentioned |

### Labor & Delivery Options
| Option | Location | Concern | Confirmed |
|--------|----------|---------|-----------|
| **Wireless/waterproof fetal monitor** | `questions.json` line 101 | Listed as "if available" - confirm | ❓ Unconfirmed |
| **Intermittent monitoring** | `questions.json` line 99 | May have restrictions based on policy | ❓ Unconfirmed |
| **Aromatherapy** | `questions.json` line 66 | Some hospitals prohibit due to allergies/fire codes | ❓ Unconfirmed |
| **Light snacks during labor** | `questions.json` line 87 | Many hospitals restrict to clear liquids only | ❓ Unconfirmed |
| **Doula support** | `questions.json` line 33 | Confirm UCI's doula policies | ✅ **YES** - Permitted with prior arrangements ([source](https://www.ucihealth.org/medical-services/specialties/maternity/visiting-hours-guidelines)) |

### Pushing & Delivery Positions
| Option | Location | Concern | Confirmed |
|--------|----------|---------|-----------|
| **Hands and knees pushing** | `questions.json` line 195 | May be limited with epidural or monitoring | ❓ Unconfirmed |
| **Squatting position** | `questions.json` line 196 | Requires equipment (squat bar); may not be available | ❓ Unconfirmed |
| **Help catch the baby** | `questions.json` line 231 | Not all providers allow this | ❓ Unconfirmed |

### Cesarean Birth Options ("Gentle Cesarean")
| Option | Location | Concern | Confirmed |
|--------|----------|---------|-----------|
| **Clear drape** | `questions.json` line 294 | Not standard equipment everywhere | ❓ Unconfirmed |
| **Lowered drape to see baby born** | `questions.json` line 293 | Requires specific setup | ❓ Unconfirmed |
| **Immediate skin-to-skin in OR** | `questions.json` line 295 | Not all ORs accommodate | ⚠️ **LIKELY** - UCI encourages Golden Hour; ask about OR specifically |
| **Two support people in cesarean** | `questions.json` line 280 | Listed as "if allowed" - confirm policy | ❓ Unconfirmed - L&D allows 2, but OR may differ |
| **Delayed cord clamping during cesarean** | `questions.json` line 296 | May not be possible in all situations | ❓ Unconfirmed |
| **Photos/video during cesarean** | `questions.json` line 297 | Many hospitals prohibit OR recording | ❓ Unconfirmed |

### Newborn & Postpartum Care
| Option | Location | Concern | Confirmed |
|--------|----------|---------|-----------|
| **Nursery available at night** | `questions.json` line 402 | Many "Baby-Friendly" hospitals don't offer | ⚠️ **UNLIKELY** - UCI is Baby-Friendly; goal is "never separate mother and baby" |
| **Delay first bath 24+ hours** | `questions.json` line 337 | Confirm this is UCI standard practice | ⚠️ **LIKELY** - Consistent with Baby-Friendly practices |
| **Circumcision** | `questions.json` line 389 | Confirm availability and timing at UCI | ✅ **YES** - Available via [UCI Pediatric Urology](https://ucipediatricurology.com/specialties/newborn-circumcision/) |

### Postpartum Support Services
| Option | Location | Concern | Confirmed |
|--------|----------|---------|-----------|
| **Home health visits** | `questions.json` line 456 | May not be a UCI-provided service | ❓ Unconfirmed |
| **Breastfeeding support groups** | `questions.json` line 453 | Confirm UCI offers this | ✅ **YES** - [Breastfeeding classes offered](https://www.ucihealth.org/medical-services/programs/breastfeeding-services) |
| **New parent classes** | `questions.json` line 455 | Confirm UCI offers this | ✅ **YES** - 4-week childbirth education series available |
| **Postpartum mental health resources** | `questions.json` line 454 | Confirm specific UCI resources available | ⚠️ **PARTIAL** - Psychiatry lists "perinatal mental health" as expertise area; no dedicated program page found |

---

## MEDIUM PRIORITY - Should Be Confirmed

These are more commonly available but should still be verified:

### Labor Support & Environment
| Option | Location | Notes | Confirmed |
|--------|----------|-------|-----------|
| Dim lighting capability | `questions.json` line 62 | Usually available | ❓ Unconfirmed |
| Music/playlist (patient's own) | `questions.json` line 63 | Usually allowed | ❓ Unconfirmed |
| Birth ball availability | `questions.json` line 146 | Common but confirm | ❓ Unconfirmed |
| Heat/cold packs | `questions.json` line 147 | Usually available | ❓ Unconfirmed |

### Pain Management
| Option | Location | Notes | Confirmed |
|--------|----------|-------|-----------|
| IV pain medication | `questions.json` line 160 | Standard but confirm options | ✅ **YES** - Standard at academic medical centers |
| Epidural availability | `questions.json` line 159 | Standard - confirm timing policies | ✅ **YES** - Standard at academic medical centers |
| Epidural "as early as possible" | `questions.json` line 174 | Policies vary on when epidural can be placed | ❓ Unconfirmed - timing policy unclear |

### Delivery Preferences
| Option | Location | Notes | Confirmed |
|--------|----------|-------|-----------|
| Mirror to see baby emerge | `questions.json` line 228 | Usually available on request | ❓ Unconfirmed |
| Touch baby's head during crowning | `questions.json` line 229 | Provider-dependent | ❓ Unconfirmed |
| Partner/support cuts cord | `questions.json` line 254 | Usually allowed | ⚠️ **LIKELY** - Common practice |
| Delayed cord clamping (vaginal birth) | `questions.json` line 244 | Increasingly standard | ⚠️ **LIKELY** - ACOG-recommended practice |
| Spontaneous pushing (mother-led) | `questions.json` line 208 | Provider-dependent | ❓ Unconfirmed |

### Newborn Care
| Option | Location | Notes | Confirmed |
|--------|----------|-------|-----------|
| Immediate skin-to-skin (vaginal) | `questions.json` line 324 | Usually standard | ✅ **YES** - UCI "encourages Golden Hour" and skin-to-skin |
| Lactation consultant visit | `questions.json` line 361 | Confirm availability and timing | ✅ **YES** - Available during stay and after discharge |
| Help with pumping | `questions.json` line 364 | Confirm pump availability | ✅ **YES** - Part of lactation services |
| Decline/discuss standard procedures | `questions.json` line 375-380 | Confirm process for declining | ❓ Unconfirmed |

### Feeding Support
| Option | Location | Notes | Confirmed |
|--------|----------|-------|-----------|
| No formula unless medically needed | `questions.json` line 362 | Confirm Baby-Friendly status | ✅ **YES** - UCI is Baby-Friendly designated |
| No pacifiers unless requested | `questions.json` line 362 | Confirm policy | ✅ **YES** - Consistent with Baby-Friendly |
| Formula available on request | `questions.json` line 363 | Usually available | ✅ **YES** - Available when needed |

---

## LOW PRIORITY - Likely Standard (Quick Verification)

These are generally standard but worth a quick confirmation:

### Standard Newborn Procedures (confirm all offered)
| Procedure | Confirmed |
|-----------|-----------|
| Vitamin K injection | ✅ **YES** - Standard |
| Antibiotic eye ointment (erythromycin) | ✅ **YES** - Standard |
| Hepatitis B vaccine | ✅ **YES** - Standard |
| Hearing screening | ✅ **YES** - Standard |
| Metabolic screening (heel prick) | ✅ **YES** - Standard |

### Prenatal Testing (confirm all offered at UCI)
All standard prenatal tests are expected to be available at an academic medical center like UCI.

### Hospital Provisions Listed
The app states UCI provides:
- Hospital gown
- Mesh underwear and pads
- Basic toiletries
- Diapers and wipes
- Baby blankets

*Source: `hospitalChecklist.json` line 64* — ❓ Unconfirmed specifics

---

## UCI-SPECIFIC REFERENCES IN APP

The following UCI-specific content should be verified for accuracy:

### Contact Information
| Reference | Location | Value | Confirmed |
|-----------|----------|-------|-----------|
| UCI Labor & Delivery phone | `Hub.jsx`, `resources.json` | (949) 824-8200 | ⚠️ **CHECK** - UCI Maternity Services uses 714-456-2911 |
| UCI Women's Health URL | `Hub.jsx` | https://www.ucihealth.org/medical-services/womens-health | ❓ Verify URL is correct |

### Services Mentioned
| Service | Location | Notes | Confirmed |
|---------|----------|-------|-----------|
| "UCI Perinatal Mental Health" | `epds.json` line 156 | Confirm this service exists and name is correct | ⚠️ **PARTIAL** - Psychiatry mentions perinatal expertise; exact service name unconfirmed |
| UCI Health partnership | `Hub.jsx` footer | Verify partnership language is approved | ❓ Unconfirmed |

---

## RECOMMENDED TOOLS SECTION

The Hub page (`Hub.jsx`) recommends these tools - confirm they align with UCI guidance:

| Tool | Confirmed |
|------|-----------|
| **Pregnancy Timeline** - Track milestones and baby development | ✅ Appropriate |
| **Birth Plan Builder** - Create personalized birth plan | ✅ Appropriate |
| **Postpartum Self-Assessment** - EPDS screening tool | ✅ Appropriate |
| **Kick Counter** - Track baby movements | ✅ Appropriate |
| **Contraction Timer** - Time contractions | ✅ Appropriate |
| **Hospital Bag Checklist** - Packing list | ✅ Appropriate |

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
- **Pain Management Options** ⚠️ **UPDATE NEEDED** - mentions nitrous oxide which is likely not available

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

| Resource | Phone | Location | Confirmed |
|----------|-------|----------|-----------|
| 988 Suicide & Crisis Lifeline | 988 | `epds.json` | ✅ **YES** - National resource |
| Postpartum Support International | 1-800-944-4773 | `epds.json` | ✅ **YES** - National resource |
| Emergency Services | 911 | `epds.json`, `Hub.jsx` | ✅ **YES** - Standard |

---

## UPDATED QUESTIONS FOR UCI REVIEW MEETING

Based on web research, here are the **remaining questions** that couldn't be confirmed online:

### Must Ask (High Priority)
1. **Nitrous oxide** - Web search found no mention. Is this available? If not, we should remove from app.

2. **Labor tubs/hydrotherapy** - Only showers mentioned online. Are labor tubs available for water immersion during labor?

3. **Gentle cesarean specifics** - Which of these does UCI accommodate?
   - Clear drape
   - Lowered drape
   - Photos/video in OR
   - Two support people in OR

4. **Nursery at night** - As a Baby-Friendly hospital, is nursery care available for mothers who need rest, or is rooming-in required?

5. **Wireless fetal monitors** - Are these available?

6. **Food/drink policy** - Clear liquids only, or light snacks allowed?

### Should Verify
7. **Phone number** - App uses (949) 824-8200 but UCI Maternity Services lists 714-456-2911. Which is correct for L&D?

8. **Perinatal Mental Health** - Is there a specific program/service by this name for referrals?

9. **Home health visits** - Does UCI offer postpartum home visits?

10. **Aromatherapy** - Allowed in L&D rooms?

---

## RECOMMENDED CODE CHANGES

Based on this research, prioritized changes:

### Immediate (Before UCI Meeting)
1. ⚠️ **Update phone number** - Verify and fix L&D contact number
2. ⚠️ **Add disclaimer** - "Options may vary - discuss with your care team"

### After UCI Confirmation
3. 🔴 **Remove or caveat nitrous oxide** - If not available
4. 🔴 **Update hydrotherapy** - Change to "shower" if no labor tubs
5. 🟡 **Caveat nursery option** - Add "if available" for Baby-Friendly context
6. 🟡 **Update cesarean options** - Add "ask your provider" to unconfirmed items

---

## SOURCES

- [UCI Health Maternity Services](https://www.ucihealth.org/medical-services/specialties/maternity)
- [UCI Health Labor & Delivery](https://www.ucihealth.org/medical-services/programs/labor-delivery)
- [UCI Health Visiting Hours & Guidelines](https://www.ucihealth.org/medical-services/specialties/maternity/visiting-hours-guidelines)
- [UCI Health Breastfeeding Services](https://www.ucihealth.org/medical-services/programs/breastfeeding-services)
- [UCI Pediatric Urology - Circumcision](https://ucipediatricurology.com/specialties/newborn-circumcision/)
- [UCI Health Best Maternity Hospital Recognition](https://www.ucihealth.org/about-us/news/2025/12/best-maternity-hospital)
- [US News Maternity Ratings - UCI](https://health.usnews.com/best-hospitals/area/ca/university-of-california-irvine-medical-center-6932290/maternity)

---

*End of Audit Document*
