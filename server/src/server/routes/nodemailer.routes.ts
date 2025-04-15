import express from 'express';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send-email', async (req, res) => {
    const { destination, pdfData, subject, cc, message } = req.body;

    if (!destination || !pdfData) {
        return res.status(400).json({ error: 'Endereço de email e arquivo PDF são necessários' });
    }

    const msg = {
        to: destination,
        from: 'robot@co-lecione.wiki.br',
        cc: cc,
        subject: subject,
        html: message ? `<p>${message}</p>` : '<strong>O arquivo PDF solicitado está anexado neste e-mail.</strong>',
        attachments: [
            {
                content: pdfData,
                filename: 'document.pdf',
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: 'pdf',
            },
        ],
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
});

export { router as sendGridRouter };