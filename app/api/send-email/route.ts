import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS = { name: 100, email: 254, message: 2000 }

// Escape user input before embedding it in the email HTML (prevents the sender
// from injecting markup/links into the message you receive).
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Best-effort in-memory rate limit (per warm instance). Not bulletproof on
// serverless, but blunts bursts cheaply. Swap for Upstash/Redis if abused.
const RATE = new Map<string, { count: number; reset: number }>()
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = RATE.get(ip)
  if (!entry || now > entry.reset) {
    RATE.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, company } = await request.json()

    // Honeypot — only bots fill the hidden `company` field. Pretend success so
    // we don't tip them off, but send nothing.
    if (company) {
      return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    // Validate the input
    if (
      typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
      !name.trim() || !email.trim() || !message.trim()
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 })
    }

    const safeName = escapeHtml(name.trim())
    const safeEmail = escapeHtml(email.trim())
    const safeMessage = escapeHtml(message.trim())

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      replyTo: `${safeName} <${safeEmail}>`, // hit Reply to respond to the sender
      subject: `Portfolio Contact from ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Message from Portfolio Contact Form
          </h2>

          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
          </div>

          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${safeMessage}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center;">
            <p style="color: #6c757d; font-size: 14px;">
              This email was sent from your portfolio contact form at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
      // Also include plain text version (uses raw, un-escaped values — plain text
      // can't execute markup, and escaping would show literal &amp; etc.)
      text: `New message from your portfolio contact form

Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}

Sent at: ${new Date().toLocaleString()}`,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    )
  }
}
