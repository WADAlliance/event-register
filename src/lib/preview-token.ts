import { SignJWT } from 'jose';


export async function generatePreviewToken(): Promise<string> {
  const secret = process.env.PREVIEW_SIGNING_SECRET;

  if (!secret) {
    throw new Error('PREVIEW_SIGNING_SECRET environment variable is not configured');
  }

  const secretKey = new TextEncoder().encode(secret);

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 10 * 60;

  const token = await new SignJWT({
    iss: 'app-a',
    aud: 'embed-preview',
    resource: 'app-b',
    scope: 'preview:read',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(secretKey);

  return token;
}
