const pdfKit = require('pdfkit')

module.exports = {
    // POST /generate-card
    generateCardUser: (req, res) => {
        try {
            const { name, course, semester } = req.body;
    
            // Validação
            if (!name || typeof name !== 'string' || name.trim() === '') {
                throw new HttpError(400, "Invalid name!");
            }
            if (!course || typeof course !== 'string' || course.trim() === '') {
                throw new HttpError(400, "Invalid course!");
            }
            if (!semester || typeof semester !== 'string' || semester.trim() === '') {
                throw new HttpError(400, "Invalid semester!");
            }
    
            // Criando o PDF
            const doc = new pdfKit()
    
            // Configurar os cabeçalhos da resposta
            res.setHeader("Content-Type", "application/pdf")
            res.setHeader("Content-Disposition", `attachment; filename=${name.replace(/\s+/g, '_')}_card.pdf`)
            doc.pipe(res);
    
            // Verificar se a imagem existe antes de utilizá-la
            const fs = require("fs");
            const imagePath = "../images/card-background.webp"
            if (fs.existsSync(imagePath)) {
                // Adicionar imagem de fundo
                doc.image(imagePath, 0, 0, { width: 595.28, height: 841.89 }) // Dimensões A4 padrão
            } else {
                console.warn("Imagem de fundo não encontrada. Continuando sem imagem.")
            }
    
            // Adicionar texto ao PDF
            doc.fontSize(20).text("Student Card", 200, 50, { align: "center" })
            doc.fontSize(16).text(`Nome: ${name}`, 50, 100);
            doc.fontSize(16).text(`Curso: ${course}`, 50, 130);
            doc.fontSize(16).text(`Semestre: ${semester}`, 50, 160);
    
            // Finalizar o documento
            doc.end()
        } catch (error) {
            // Tratamento de erros
            if (!res.headersSent) {
                if (error instanceof HttpError) {
                    return res.status(error.status).json({ message: error.message });
                }
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            } else {
                console.error("Erro após os cabeçalhos terem sido enviados:", error);
            }
        }
    }
    
}