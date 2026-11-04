import { Resend } from "resend";

export const config = {
  api: {
    bodyParser: false,
  },
};

const receivingAddress = "oraconverter@vkim.com.br";

async function readRawBody(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf8");
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "method_not_allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  const forwardTo = process.env.FORWARD_EMAIL_TO;

  if (!apiKey || !webhookSecret || !forwardTo) {
    return response.status(503).json({ error: "service_not_configured" });
  }

  const resend = new Resend(apiKey);

  let event;
  try {
    const payload = await readRawBody(request);
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers["svix-id"],
        timestamp: request.headers["svix-timestamp"],
        signature: request.headers["svix-signature"],
      },
      webhookSecret,
    });
  } catch {
    return response.status(400).json({ error: "invalid_webhook" });
  }

  if (event.type !== "email.received") {
    return response.status(200).json({ received: true, forwarded: false });
  }

  const recipients = (event.data.to ?? []).map((address) => address.toLowerCase());
  if (!recipients.includes(receivingAddress)) {
    return response.status(200).json({ received: true, forwarded: false });
  }

  const { data, error } = await resend.emails.receiving.forward({
    emailId: event.data.email_id,
    to: forwardTo,
    from: `ORACONVERTER <${receivingAddress}>`,
  });

  if (error) {
    return response.status(502).json({ error: "forward_failed" });
  }

  return response.status(200).json({ received: true, forwarded: true, id: data?.id });
}
