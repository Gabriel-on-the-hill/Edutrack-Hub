// POST /api/auth/logout
// Clears the authentication cookie

import { clearAuthCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Clear the cookie
  const cookie = clearAuthCookie();
  res.setHeader('Set-Cookie', cookie);

  return res.status(200).json({
    message: 'Logged out successfully',
  });
}
