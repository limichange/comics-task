import * as fs from 'fs-extra'
import { PDFDocument } from 'pdf-lib'

export async function createPDF(name: string, chapter: string, num: number) {
  const pdfDoc = await PDFDocument.create()

  const array = new Array(num).fill(1).map((item, index) => index + 1)

  for await (const index of array) {
    await addImage(pdfDoc, `files/${name}/${chapter}/${index}.jpg`)
  }

  const pdfBytes = await pdfDoc.save()

  fs.ensureDirSync('pdf')
  fs.ensureDirSync(`pdf/${name}`)
  await fs.writeFile(`pdf/${name}/${chapter}.pdf`, pdfBytes)
}

async function addImage(pdfDoc: PDFDocument, image: string) {
  const jpgImageBytes = fs.readFileSync(image)
  const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)

  const page = pdfDoc.addPage([jpgImage.width, jpgImage.height])

  page.drawImage(jpgImage, {
    x: page.getWidth() / 2 - jpgImage.width / 2,
    y: page.getHeight() / 2 - jpgImage.height / 2,
    width: jpgImage.width,
    height: jpgImage.height,
  })
}
