import puppeteer from 'puppeteer'
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import handlebars from 'handlebars'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Generate PDF using Puppeteer
export const generatePDF = async (resume) => {
  let browser
  try {
    // Compile Handlebars template
    const templatePath = path.join(__dirname, `../../templates/${resume.template}.hbs`)
    const templateContent = fs.readFileSync(templatePath, 'utf8')
    const template = handlebars.compile(templateContent)
    const html = template({ resume: resume.data })

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()

    // Set the HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    })

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    })

    return pdf
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

// Generate DOCX using docx
export const generateDocx = async (resume) => {
  try {
    const { personalInfo, experiences, educations, skills, projects, certifications } = resume.data

    // Create document sections
    const sections = []

    // Header section
    sections.push({
      properties: {},
      children: [
        new Paragraph({
          text: `${personalInfo.firstName} ${personalInfo.lastName}`,
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: personalInfo.email,
              size: 22
            }),
            new TextRun({
              text: ' | ',
              size: 22
            }),
            new TextRun({
              text: personalInfo.phone || '',
              size: 22
            })
          ],
          alignment: AlignmentType.CENTER
        })
      ]
    })

    // Summary section
    if (personalInfo.summary) {
      sections.push({
        properties: {},
        children: [
          new Paragraph({
            text: 'Professional Summary',
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph({
            text: personalInfo.summary,
            spacing: {
              after: 200
            }
          })
        ]
      })
    }

    // Experience section
    if (experiences && experiences.length > 0) {
      const experienceChildren = [
        new Paragraph({
          text: 'Professional Experience',
          heading: HeadingLevel.HEADING_2
        })
      ]

      experiences.forEach(exp => {
        const dateText = exp.current
          ? `${formatDate(exp.startDate)} - Present`
          : `${formatDate(exp.startDate)} - ${formatDate(exp.endDate)}`

        experienceChildren.push(
          new Paragraph({
            text: exp.jobTitle,
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph({
            text: `${exp.company} | ${exp.location || ''} | ${dateText}`,
            italics: true
          }),
          new Paragraph({
            text: exp.description,
            spacing: {
              after: 200
            }
          })
        )
      })

      sections.push({
        properties: {},
        children: experienceChildren
      })
    }

    // Education section
    if (educations && educations.length > 0) {
      const educationChildren = [
        new Paragraph({
          text: 'Education',
          heading: HeadingLevel.HEADING_2
        })
      ]

      educations.forEach(edu => {
        const dateText = edu.current
          ? `${formatDate(edu.startDate)} - Present`
          : `${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}`

        educationChildren.push(
          new Paragraph({
            text: `${edu.degree} in ${edu.fieldOfStudy || ''}`,
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph({
            text: `${edu.institution} | ${dateText}`,
            italics: true
          }),
          new Paragraph({
            text: edu.description || '',
            spacing: {
              after: 200
            }
          })
        )
      })

      sections.push({
        properties: {},
        children: educationChildren
      })
    }

    // Skills section
    if (skills && skills.length > 0) {
      const skillChildren = [
        new Paragraph({
          text: 'Skills',
          heading: HeadingLevel.HEADING_2
        }),
        new Paragraph({
          text: skills.map(skill => skill.name).join(', '),
          spacing: {
            after: 200
          }
        })
      ]

      sections.push({
        properties: {},
        children: skillChildren
      })
    }

    // Projects section
    if (projects && projects.length > 0) {
      const projectChildren = [
        new Paragraph({
          text: 'Projects',
          heading: HeadingLevel.HEADING_2
        })
      ]

      projects.forEach(proj => {
        projectChildren.push(
          new Paragraph({
            text: proj.name,
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph({
            text: proj.description,
            spacing: {
              after: 200
            }
          })
        )
      })

      sections.push({
        properties: {},
        children: projectChildren
      })
    }

    // Certifications section
    if (certifications && certifications.length > 0) {
      const certificationChildren = [
        new Paragraph({
          text: 'Certifications',
          heading: HeadingLevel.HEADING_2
        })
      ]

      certifications.forEach(cert => {
        const dateText = cert.expirationDate
          ? `${formatDate(cert.issueDate)} - ${formatDate(cert.expirationDate)}`
          : `${formatDate(cert.issueDate)} - Present`

        certificationChildren.push(
          new Paragraph({
            text: cert.name,
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph({
            text: `${cert.issuingOrganization} | ${dateText}`,
            italics: true,
            spacing: {
              after: 200
            }
          })
        )
      })

      sections.push({
        properties: {},
        children: certificationChildren
      })
    }

    // Create the document
    const doc = new Document({
      sections: sections
    })

    // Generate the DOCX file
    const buffer = await Packer.toBuffer(doc)
    return buffer
  } catch (error) {
    console.error('Error generating DOCX:', error)
    throw error
  }
}

// Helper function to format dates
const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}