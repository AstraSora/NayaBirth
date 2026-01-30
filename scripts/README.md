# NayaBirth Content Export Scripts

Export app content to Excel/Word for team review and feedback.

## Quick Start

```bash
cd scripts
npm install
npm run export
```

## Output Files

Files are created in `../content-exports/` (gitignored):

### `nayabirth-content.xlsx`
Excel workbook with 7 sheets:
- **Resources** - All educational articles with category, title, content, tags, source links
- **Birth Plan Questions** - All questions with options, learn more text, citations
- **Medical Milestones** - Prenatal appointments, tests, vaccines with timing
- **Baby Development** - Week-by-week size comparisons and highlights
- **EPDS Questions** - Postpartum depression screening questions
- **Hospital Checklist** - Packing list items by category
- **Metadata & Sources** - Attribution and source information

### `resources-articles.docx`
Word document with all educational articles formatted for reading:
- Table of contents
- Articles grouped by category
- Embedded hyperlinks
- Sources listed per article
- Easy to use Track Changes for feedback

## Review Workflow

1. Developer runs export script
2. Share files via email/SharePoint/Google Drive
3. Team reviews and adds comments/track changes
4. Developer incorporates feedback into JSON files
5. Standard git commit and deploy

## Content Source Files

All content lives in `src/data/`:
- `resources.json` - Educational articles (5 categories, 15+ articles)
- `questions.json` - Birth plan questions (7 sections, 36 questions)
- `pregnancyMilestones.json` - Timeline and baby development
- `epds.json` - Depression screening (validated EPDS scale)
- `hospitalChecklist.json` - Packing list
