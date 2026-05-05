import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { DOCTOR } from "@/config/doctor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  formType?: "e-consult" | "contact";
  consultationVia?: string;
  condition?: string;
  fullname?: string;
  mobile?: string;
  email?: string;
  country?: string;
  message?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Minimum-viable validation: name + (email OR mobile).
  const name = (body.fullname ?? "").trim();
  const email = (body.email ?? "").trim();
  const mobile = (body.mobile ?? "").trim();
  if (!name || (!email && !mobile)) {
    return NextResponse.json(
      { ok: false, error: "Name plus email or mobile is required." },
      { status: 422 }
    );
  }

  const submittedAt = new Date().toISOString();
  const subject = `[${body.formType ?? "enquiry"}] ${name} — ${DOCTOR.shortName} site`;

  const lines: string[] = [
    `Form: ${body.formType ?? "unknown"}`,
    `Submitted: ${submittedAt}`,
    `Name: ${name}`,
    email ? `Email: ${email}` : "",
    mobile ? `Mobile: ${mobile}` : "",
    body.country ? `Country: ${body.country}` : "",
    body.consultationVia ? `Preference: ${body.consultationVia}` : "",
    body.condition ? `\nCondition:\n${body.condition}` : "",
    body.message ? `\nMessage:\n${body.message}` : "",
  ].filter(Boolean);

  const text = lines.join("\n");

  const to = process.env.ENQUIRY_EMAIL || DOCTOR.contact.email;
  const fromAddress = process.env.ENQUIRY_FROM_EMAIL || `no-reply@${stripProtocol(DOCTOR.brand.siteUrl)}`;
  const transport = buildTransport();

  if (!transport) {
    // No SMTP configured — log and return 200 so dev / preview environments work.
    console.warn("[enquiry] SMTP not configured. Logging payload:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    await transport.sendMail({
      from: `${DOCTOR.shortName} site <${fromAddress}>`,
      to,
      replyTo: email || undefined,
      subject,
      text,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[enquiry] sendMail failed:", err);
    return NextResponse.json({ ok: false, error: "Could not send email." }, { status: 502 });
  }
}

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) return null;
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
