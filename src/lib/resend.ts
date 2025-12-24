import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
	console.error('RESEND_API_KEY is not set; email sending will be disabled.');
}

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : undefined;