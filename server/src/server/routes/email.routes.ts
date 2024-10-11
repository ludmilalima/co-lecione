import express from 'express';
import { MailerSend, EmailParams, Sender, Recipient, Attachment } from 'mailersend';

const router = express.Router();

router.post('/send-email', async (req, res) => {
    const { destination, pdfData, subject, cc, message } = req.body;

    if (!destination || !pdfData) {
        return res.status(400).json({ error: 'Endereço de email e arquivo PDF são necessários' });
    }

    const mailerSend = new MailerSend({
        apiKey: process.env.EMAIL_API_KEY,
    });

    const sentFrom = new Sender('robot@co-lecione.wiki.br', 'Robot');
    const recipients = [new Recipient(destination, 'Recipient')];
    const ccRecipient = [new Recipient(cc, 'CC')];
    const messageBody = message ? `<p>${message}</p>` : '<strong>O arquivo PDF solicitado está anexado neste e-mail.</strong>';

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
        .setSubject(subject)
        .setHtml(messageBody)
        .setText('Arquivo PDF.');

    if (cc) {
        emailParams.setCc(ccRecipient);
    }

    try {
        await mailerSend.email.send(emailParams);
        res.status(200).json({ message: 'Email enviado com sucesso' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: error.message });
    }
});

export { router as emailRouter };