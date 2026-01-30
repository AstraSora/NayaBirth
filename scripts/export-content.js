/**
 * NayaBirth Content Export Script
 *
 * Exports all content from src/data/ JSON files to:
 * - Excel workbook with multiple sheets for easy review
 * - Word document for article content (easier to read/comment)
 *
 * Usage: cd scripts && npm install && npm run export
 */

import * as XLSX from 'xlsx';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  ExternalHyperlink,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle
} from 'docx';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const DATA_DIR = join(__dirname, '..', 'src', 'data');
const OUTPUT_DIR = join(__dirname, '..', 'content-exports');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Load all JSON data
function loadData() {
  return {
    resources: JSON.parse(readFileSync(join(DATA_DIR, 'resources.json'), 'utf-8')),
    questions: JSON.parse(readFileSync(join(DATA_DIR, 'questions.json'), 'utf-8')),
    milestones: JSON.parse(readFileSync(join(DATA_DIR, 'pregnancyMilestones.json'), 'utf-8')),
    epds: JSON.parse(readFileSync(join(DATA_DIR, 'epds.json'), 'utf-8')),
    checklist: JSON.parse(readFileSync(join(DATA_DIR, 'hospitalChecklist.json'), 'utf-8'))
  };
}

// Extract URLs from markdown text
function extractUrls(text) {
  if (!text) return [];
  const urlRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    urls.push({ text: match[1], url: match[2] });
  }
  return urls;
}

// Strip markdown formatting for plain text
function stripMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // bold
    .replace(/\*([^*]+)\*/g, '$1')       // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links
    .replace(/#{1,6}\s+/g, '')           // headings
    .replace(/`([^`]+)`/g, '$1')         // code
    .replace(/\n{3,}/g, '\n\n')          // multiple newlines
    .trim();
}

// Create Excel workbook
function createExcelWorkbook(data) {
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Resources (Articles)
  const resourcesData = [];
  resourcesData.push(['Category', 'Category ID', 'Article ID', 'Title', 'Summary', 'Content (Plain Text)', 'Tags', 'Source Links', 'Image URL']);

  for (const category of data.resources.categories) {
    for (const resource of category.resources) {
      const urls = extractUrls(resource.content);
      const sourceLinks = urls.map(u => `${u.text}: ${u.url}`).join('\n');

      resourcesData.push([
        category.title,
        category.id,
        resource.id,
        resource.title,
        resource.summary,
        stripMarkdown(resource.content),
        (resource.tags || []).join(', '),
        sourceLinks,
        resource.image?.url || ''
      ]);
    }
  }

  const resourcesSheet = XLSX.utils.aoa_to_sheet(resourcesData);
  resourcesSheet['!cols'] = [
    { wch: 20 }, // Category
    { wch: 15 }, // Category ID
    { wch: 20 }, // Article ID
    { wch: 35 }, // Title
    { wch: 50 }, // Summary
    { wch: 80 }, // Content
    { wch: 25 }, // Tags
    { wch: 60 }, // Source Links
    { wch: 50 }  // Image URL
  ];
  XLSX.utils.book_append_sheet(workbook, resourcesSheet, 'Resources');

  // Sheet 2: Birth Plan Questions
  const questionsData = [];
  questionsData.push(['Section', 'Section ID', 'Question ID', 'Type', 'Question', 'Options', 'Learn More Text', 'Citations', 'Condition']);

  for (const section of data.questions.sections) {
    for (const question of section.questions) {
      const options = question.options
        ? question.options.map(o => `${o.value}: ${o.label}`).join('\n')
        : '';
      const urls = extractUrls(question.learnMore);
      const citations = urls.map(u => `${u.text}: ${u.url}`).join('\n');
      const condition = question.condition
        ? JSON.stringify(question.condition)
        : '';

      questionsData.push([
        section.title,
        section.id,
        question.id,
        question.type,
        question.question || question.content || '',
        options,
        stripMarkdown(question.learnMore || ''),
        citations,
        condition
      ]);
    }
  }

  const questionsSheet = XLSX.utils.aoa_to_sheet(questionsData);
  questionsSheet['!cols'] = [
    { wch: 20 }, // Section
    { wch: 18 }, // Section ID
    { wch: 20 }, // Question ID
    { wch: 10 }, // Type
    { wch: 60 }, // Question
    { wch: 50 }, // Options
    { wch: 60 }, // Learn More
    { wch: 60 }, // Citations
    { wch: 30 }  // Condition
  ];
  XLSX.utils.book_append_sheet(workbook, questionsSheet, 'Birth Plan Questions');

  // Sheet 3: Pregnancy Milestones (Medical)
  const milestonesData = [];
  milestonesData.push(['Week Start', 'Week End', 'Category', 'Title', 'Short Description', 'Details', 'Icon', 'Priority', 'Ongoing', 'Citations']);

  for (const milestone of data.milestones.milestones) {
    const urls = extractUrls(milestone.details);
    const citations = urls.map(u => `${u.text}: ${u.url}`).join('\n');

    milestonesData.push([
      milestone.week,
      milestone.weekEnd || milestone.week,
      milestone.category,
      milestone.title,
      milestone.shortDescription,
      stripMarkdown(milestone.details),
      milestone.icon,
      milestone.priority,
      milestone.ongoing ? 'Yes' : 'No',
      citations
    ]);
  }

  const milestonesSheet = XLSX.utils.aoa_to_sheet(milestonesData);
  milestonesSheet['!cols'] = [
    { wch: 10 }, // Week Start
    { wch: 10 }, // Week End
    { wch: 15 }, // Category
    { wch: 25 }, // Title
    { wch: 40 }, // Short Description
    { wch: 80 }, // Details
    { wch: 5 },  // Icon
    { wch: 12 }, // Priority
    { wch: 8 },  // Ongoing
    { wch: 60 }  // Citations
  ];
  XLSX.utils.book_append_sheet(workbook, milestonesSheet, 'Medical Milestones');

  // Sheet 4: Baby Development
  const babyData = [];
  babyData.push(['Week', 'Size Comparison', 'Icon', 'Length', 'Development Highlight', 'Source']);

  for (const week of data.milestones.babyDevelopment) {
    babyData.push([
      week.week,
      week.size,
      week.icon,
      week.length,
      week.highlight,
      week.source
    ]);
  }

  const babySheet = XLSX.utils.aoa_to_sheet(babyData);
  babySheet['!cols'] = [
    { wch: 8 },  // Week
    { wch: 20 }, // Size
    { wch: 5 },  // Icon
    { wch: 10 }, // Length
    { wch: 50 }, // Highlight
    { wch: 20 }  // Source
  ];
  XLSX.utils.book_append_sheet(workbook, babySheet, 'Baby Development');

  // Sheet 5: EPDS Questions
  const epdsData = [];
  epdsData.push(['Question #', 'Question Text', 'Option 1 (Score 0)', 'Option 2 (Score 1)', 'Option 3 (Score 2)', 'Option 4 (Score 3)']);

  for (const q of data.epds.questions) {
    epdsData.push([
      q.id,
      q.text,
      q.options[0]?.label || '',
      q.options[1]?.label || '',
      q.options[2]?.label || '',
      q.options[3]?.label || ''
    ]);
  }

  const epdsSheet = XLSX.utils.aoa_to_sheet(epdsData);
  epdsSheet['!cols'] = [
    { wch: 10 }, // Question #
    { wch: 50 }, // Question Text
    { wch: 40 }, // Option 1
    { wch: 40 }, // Option 2
    { wch: 40 }, // Option 3
    { wch: 40 }  // Option 4
  ];
  XLSX.utils.book_append_sheet(workbook, epdsSheet, 'EPDS Questions');

  // Sheet 6: Hospital Checklist
  const checklistData = [];
  checklistData.push(['Category', 'Item ID', 'Item Label', 'Essential']);

  for (const category of data.checklist.categories) {
    for (const item of category.items) {
      checklistData.push([
        category.title,
        item.id,
        item.label,
        item.essential ? 'Yes' : ''
      ]);
    }
  }

  // Add hospital provides section
  checklistData.push(['', '', '', '']);
  checklistData.push(['Hospital Provides', '', '', '']);
  for (const item of data.checklist.hospitalProvides) {
    checklistData.push(['(Hospital)', '', item, '']);
  }

  const checklistSheet = XLSX.utils.aoa_to_sheet(checklistData);
  checklistSheet['!cols'] = [
    { wch: 20 }, // Category
    { wch: 25 }, // Item ID
    { wch: 45 }, // Item Label
    { wch: 10 }  // Essential
  ];
  XLSX.utils.book_append_sheet(workbook, checklistSheet, 'Hospital Checklist');

  // Sheet 7: Metadata & Sources
  const metaData = [];
  metaData.push(['Data Type', 'Field', 'Value']);

  // EPDS attribution
  metaData.push(['EPDS', 'Name', data.epds.attribution.name]);
  metaData.push(['EPDS', 'Citation', data.epds.attribution.citation]);
  metaData.push(['EPDS', 'ACOG URL', data.epds.attribution.acogUrl]);
  metaData.push(['', '', '']);

  // Pregnancy milestones sources
  metaData.push(['Milestones Sources', '', '']);
  for (const [key, source] of Object.entries(data.milestones.sources)) {
    metaData.push(['', source.name, source.url]);
    metaData.push(['', 'Citation', source.citation]);
  }
  metaData.push(['', '', '']);

  // Resource categories
  metaData.push(['Resource Categories', '', '']);
  for (const cat of data.resources.categories) {
    metaData.push(['', cat.title, `ID: ${cat.id}, Icon: ${cat.icon}`]);
  }

  const metaSheet = XLSX.utils.aoa_to_sheet(metaData);
  metaSheet['!cols'] = [
    { wch: 20 },
    { wch: 40 },
    { wch: 80 }
  ];
  XLSX.utils.book_append_sheet(workbook, metaSheet, 'Metadata & Sources');

  return workbook;
}

// Parse markdown content into docx paragraphs
function parseMarkdownToParagraphs(text) {
  if (!text) return [new Paragraph({})];

  const paragraphs = [];
  const lines = text.split('\n');
  let currentParagraph = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Heading
    if (line.startsWith('**') && line.endsWith('**')) {
      // Flush current paragraph
      if (currentParagraph.length > 0) {
        paragraphs.push(new Paragraph({ children: currentParagraph }));
        currentParagraph = [];
      }

      paragraphs.push(new Paragraph({
        children: [new TextRun({ text: line.replace(/\*\*/g, ''), bold: true })],
        spacing: { before: 200, after: 100 }
      }));
    }
    // Bullet point
    else if (line.startsWith('- ')) {
      if (currentParagraph.length > 0) {
        paragraphs.push(new Paragraph({ children: currentParagraph }));
        currentParagraph = [];
      }

      // Parse the bullet content for links and formatting
      const bulletText = line.substring(2);
      const runs = parseInlineFormatting(bulletText);

      paragraphs.push(new Paragraph({
        children: runs,
        bullet: { level: 0 }
      }));
    }
    // Empty line
    else if (line.trim() === '') {
      if (currentParagraph.length > 0) {
        paragraphs.push(new Paragraph({ children: currentParagraph }));
        currentParagraph = [];
      }
      paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
    }
    // Regular text
    else {
      const runs = parseInlineFormatting(line);
      currentParagraph.push(...runs);
      currentParagraph.push(new TextRun({ text: ' ' }));
    }
  }

  if (currentParagraph.length > 0) {
    paragraphs.push(new Paragraph({ children: currentParagraph }));
  }

  return paragraphs;
}

// Parse inline formatting (bold, links) into TextRuns
function parseInlineFormatting(text) {
  const runs = [];
  let remaining = text;

  while (remaining.length > 0) {
    // Check for link
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      runs.push(new ExternalHyperlink({
        children: [new TextRun({ text: linkMatch[1], style: 'Hyperlink' })],
        link: linkMatch[2]
      }));
      remaining = remaining.substring(linkMatch[0].length);
      continue;
    }

    // Check for bold
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      runs.push(new TextRun({ text: boldMatch[1], bold: true }));
      remaining = remaining.substring(boldMatch[0].length);
      continue;
    }

    // Regular text until next special character
    const nextSpecial = remaining.search(/\[|\*\*/);
    if (nextSpecial === -1) {
      runs.push(new TextRun({ text: remaining }));
      break;
    } else if (nextSpecial > 0) {
      runs.push(new TextRun({ text: remaining.substring(0, nextSpecial) }));
      remaining = remaining.substring(nextSpecial);
    } else {
      // Special character but not a match, treat as regular text
      runs.push(new TextRun({ text: remaining.charAt(0) }));
      remaining = remaining.substring(1);
    }
  }

  return runs;
}

// Create Word document for articles
async function createWordDocument(data) {
  const sections = [];

  // Title page content
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: 'NayaBirth Content Review', bold: true, size: 56 })],
      heading: HeadingLevel.TITLE,
      spacing: { after: 400 }
    }),
    new Paragraph({
      children: [new TextRun({ text: `Generated: ${new Date().toLocaleDateString()}`, italics: true })]
    }),
    new Paragraph({
      children: [new TextRun({ text: 'This document contains all educational articles from the NayaBirth app for content review.' })]
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Please use Track Changes or comments to provide feedback.', italics: true })],
      spacing: { before: 200 }
    }),
    new Paragraph({ spacing: { after: 600 } })
  );

  // Table of Contents header
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: 'Table of Contents', bold: true, size: 32 })],
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 400, after: 200 }
    })
  );

  // Generate TOC
  for (const category of data.resources.categories) {
    sections.push(
      new Paragraph({
        children: [new TextRun({ text: `${category.icon} ${category.title}`, bold: true })],
        spacing: { before: 100 }
      })
    );
    for (const resource of category.resources) {
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: `    - ${resource.title}` })]
        })
      );
    }
  }

  sections.push(new Paragraph({ spacing: { after: 600 } }));

  // Articles by category
  for (const category of data.resources.categories) {
    // Category heading
    sections.push(
      new Paragraph({
        children: [new TextRun({ text: `${category.icon} ${category.title}`, bold: true, size: 36 })],
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 600, after: 200 },
        pageBreakBefore: true
      }),
      new Paragraph({
        children: [new TextRun({ text: category.description, italics: true })],
        spacing: { after: 300 }
      })
    );

    // Each article
    for (const resource of category.resources) {
      // Article title
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: resource.title, bold: true, size: 28 })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 100 }
        })
      );

      // Summary
      sections.push(
        new Paragraph({
          children: [
            new TextRun({ text: 'Summary: ', bold: true }),
            new TextRun({ text: resource.summary })
          ],
          spacing: { after: 100 }
        })
      );

      // Tags
      if (resource.tags && resource.tags.length > 0) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({ text: 'Tags: ', bold: true }),
              new TextRun({ text: resource.tags.join(', '), italics: true })
            ],
            spacing: { after: 200 }
          })
        );
      }

      // Content
      const contentParagraphs = parseMarkdownToParagraphs(resource.content);
      sections.push(...contentParagraphs);

      // Source links summary
      const urls = extractUrls(resource.content);
      if (urls.length > 0) {
        sections.push(
          new Paragraph({
            children: [new TextRun({ text: 'Sources:', bold: true })],
            spacing: { before: 200, after: 100 }
          })
        );
        for (const url of urls) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: '• ' }),
                new ExternalHyperlink({
                  children: [new TextRun({ text: url.text, style: 'Hyperlink' })],
                  link: url.url
                }),
                new TextRun({ text: ` (${url.url})`, size: 18, color: '666666' })
              ]
            })
          );
        }
      }

      // Separator
      sections.push(
        new Paragraph({
          children: [new TextRun({ text: '─'.repeat(50) })],
          spacing: { before: 300, after: 300 }
        })
      );
    }
  }

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: 'Normal',
          name: 'Normal',
          basedOn: 'Normal',
          run: { font: 'Calibri', size: 24 },
          paragraph: { spacing: { line: 276 } }
        }
      ]
    },
    sections: [{
      properties: {},
      children: sections
    }]
  });

  return doc;
}

// Main execution
async function main() {
  console.log('Loading content data...');
  const data = loadData();

  console.log('Creating Excel workbook...');
  const workbook = createExcelWorkbook(data);
  const excelPath = join(OUTPUT_DIR, 'nayabirth-content.xlsx');
  XLSX.writeFile(workbook, excelPath);
  console.log(`Excel file created: ${excelPath}`);

  console.log('Creating Word document...');
  const doc = await createWordDocument(data);
  const wordBuffer = await Packer.toBuffer(doc);
  const wordPath = join(OUTPUT_DIR, 'resources-articles.docx');
  writeFileSync(wordPath, wordBuffer);
  console.log(`Word file created: ${wordPath}`);

  console.log('\nExport complete!');
  console.log(`\nFiles created in: ${OUTPUT_DIR}`);
  console.log('- nayabirth-content.xlsx (all content in spreadsheet format)');
  console.log('- resources-articles.docx (articles formatted for reading/commenting)');

  // Summary
  console.log('\nContent summary:');
  console.log(`- ${data.resources.categories.length} resource categories`);
  console.log(`- ${data.resources.categories.reduce((sum, cat) => sum + cat.resources.length, 0)} total articles`);
  console.log(`- ${data.questions.sections.length} birth plan sections`);
  console.log(`- ${data.questions.sections.reduce((sum, sec) => sum + sec.questions.length, 0)} total questions`);
  console.log(`- ${data.milestones.milestones.length} medical milestones`);
  console.log(`- ${data.milestones.babyDevelopment.length} baby development entries`);
  console.log(`- ${data.epds.questions.length} EPDS questions`);
  console.log(`- ${data.checklist.categories.reduce((sum, cat) => sum + cat.items.length, 0)} hospital checklist items`);
}

main().catch(console.error);
