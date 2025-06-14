import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if we have a Resend API key
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      // If no API key is configured, log to console for development
      console.log('=== CONTACT FORM SUBMISSION ===');
      console.log('To: albertshih3@gmail.com');
      console.log('From:', email);
      console.log('Name:', name);
      console.log('Message:', message);
      console.log('==============================');
      
      return NextResponse.json(
        { message: 'Message logged to console (Resend API key not configured)' },
        { status: 200 }
      );
    }

    // Send email using Resend
    const resend = new Resend(resendApiKey);
    
    const emailResult = await resend.emails.send({
      from: 'Portfolio Contact <portfolio@resend.dev>', // This is a verified domain on Resend
      to: 'albertshih3@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
            New Portfolio Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>This message was sent from your portfolio contact form.</p>
            <p>Reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      replyTo: email, // This allows you to reply directly to the sender
    });

    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailResult.data?.id);
    
    return NextResponse.json(
      { message: 'Email sent successfully', id: emailResult.data?.id },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}