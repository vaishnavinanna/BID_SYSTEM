const service = require('../Service/pdfService'); 

const pdfController = async (req, res) => {
  try {
    const UnitpdfBuffer = await service.generatePdf(); 
    const pdfBuffer = Buffer.from(UnitpdfBuffer);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline;');
    // console.log(UnitpdfBuffer.slice(0,10));
    res.send(pdfBuffer);
  }
  catch (error) {
    console.error('Error creating PDF:', error);
    res.status(500).json({
      message: 'Failed to create PDF',
      error: error.message,
    });
  }
};

module.exports = { pdfController };
