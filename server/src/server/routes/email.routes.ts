import express from 'express';
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend';

const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { email, pdfData } = req.body;

    if (!email || !pdfData) {
        return res.status(400).json({ error: 'Endereço de email e arquivo PDF são necessários' });
    }

    const mailerSend = new MailerSend({
        apiKey: process.env.EMAIL_API_KEY,
    });

    const sentFrom = new Sender('robot@trial-0r83ql35dpp4zw1j.mlsender.net', 'Robot');
    const recipients = [new Recipient(email, 'Recipient')];

    const attachments = [
        new Attachment(
            pdfData,
            'document.pdf',
            'attachment',
            'document'
        )
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setAttachments(attachments)
        .setSubject('Arquivo PDF')
        .setHtml('<strong>O arquivo PDF solicitado está anexado neste e-mail.</strong>')
        .setText('Arquivo PDF.');

    try {
        const result = await mailerSend.email.send(emailParams);
        console.log('Email sent:', result);
        res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
});

export { router as emailRouter };