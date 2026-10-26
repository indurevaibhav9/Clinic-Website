type TransactionalEmail = {
  to: string;
  subject: string;
  html: string;
  senderName: string;
};

type BrevoEmailResponse = {
  messageId?: string;
};

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  senderName,
}: TransactionalEmail): Promise<BrevoEmailResponse> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_FROM_EMAIL;

  if (!apiKey) {
    throw new Error("BREVO_API_KEY is not configured.");
  }

  if (!senderEmail) {
    throw new Error("BREVO_FROM_EMAIL is not configured.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    }),
  });

  console.log(response)
  if (!response.ok) {
    
    const details = await response.text();
    throw new Error(
      `Brevo API error (${response.status}): ${details || response.statusText}`,
    );
  }

  const result: unknown = await response.json();
  if (
    typeof result === "object" &&
    result !== null &&
    "messageId" in result &&
    typeof result.messageId === "string"
  ) {
    return { messageId: result.messageId };
  }

  return {};
}
