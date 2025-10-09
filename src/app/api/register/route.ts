import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();

  const name = formData.get("fullName")?.toString() || '';
  const email = formData.get("email")?.toString() || '';
  const password = formData.get("password")?.toString() || '';
  const registrationType = formData.get("registrationType")?.toString() || '';

  if (!name || !email || !password || !registrationType) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  // Validate registration type
  const validTypes = ['participant', 'partner', 'copr', 'copl'];
  if (!validTypes.includes(registrationType)) {
    return NextResponse.json({ message: 'Invalid registration type' }, { status: 400 });
  }

  // Here you would typically save the user to the database
  // Include the registrationType in your database schema

  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    const message = `New registration:
                    Type: ${registrationType}
                    Name: ${name}
                    Email: ${email}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
      }),
    });

    if (!telegramResponse.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return NextResponse.json({ message: 'User registered successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Registration failed.' }, { status: 500 });
  }
}
