import { savePDF } from '@progress/kendo-react-pdf';

class PdfService {
  createPdf = (html) => {
    console.log(html)
    savePDF(html, { 
      paperSize: 'Letter',
      fileName: 'cloud9.pdf',
      margin: 4
    })
  }
}

const Doc = new PdfService();
export default Doc;