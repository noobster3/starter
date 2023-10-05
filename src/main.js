import { getStaticFile, throwIfMissing } from './utils.js';
import twilio from 'twilio'

export default async (context) => {
  const { req, res, log, error } = context;

  throwIfMissing(process.env, [
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
  ]);

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  if (req.method === 'GET') {
    return res.send(getStaticFile('index.html'), 200, {
      'Content-Type': 'text/html; charset=utf-8',
    });
  }

  try {
    throwIfMissing(req.query, ['From', 'To', 'Body']);
  } catch (err) {
    return res.json({ ok: false, error: err.message }, 400);
  }

  const from = req.query.From;
  const to = req.query.To;
  const body = req.query.Body || 'Ahoy, World!';

  twilioClient = twilio(accountSid, authToken);
  try
  {
    const message = await twilioClient.messages.create({ body, to, from });
    return res.json({ message: message.sid });
}catch(error){
        return res.json({ error: error });
    }
};
