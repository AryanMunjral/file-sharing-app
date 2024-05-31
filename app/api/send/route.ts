// Import necessary modules
import { EmailTemplate } from './../../_components/email-template';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize Resend instance with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the POST function
export async function POST(req) {
    // Parse the request body to get the firstName (and other data if needed)
    const { downloadURL } = await req.json();
    try {
        // Generate email content using the EmailTemplate component
        const emailContent = EmailTemplate({ firstName: downloadURL });
        // console.log(req.body);
        console.log(downloadURL);
        console.log(req);

        // Send the email using Resend
        const data = await resend.emails.send({
            from: 'aryanmunjral@resend.dev',
            to: ['freeforu118@gmail.com'],
            subject: 'hello your link to download file is here :',
            react: emailContent,
        });

        // Return the response in JSON format
        return NextResponse.json(data);
    } catch (error) {
        // Return the error response in JSON format
        return NextResponse.json({ error });
    }
}
