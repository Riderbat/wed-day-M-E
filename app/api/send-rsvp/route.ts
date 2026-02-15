import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'egorfedosuk@gmail.com';

export type RsvpBody = {
  lastName: string;
  firstName: string;
  attendance: string;
  transfer?: string;
  drinks: string[];
};

function buildEmailHtml(data: RsvpBody): string {
  const attendanceText = data.attendance === 'yes' ? 'Да' : data.attendance === 'no' ? 'Нет' : data.attendance || '—';
  const transferText = data.transfer === 'yes' ? 'Да' : data.transfer === 'no' ? 'Нет' : data.transfer || '—';
  const drinksText = Array.isArray(data.drinks) && data.drinks.length > 0 ? data.drinks.join(', ') : '—';
  return `
    <h2>Анкета гостя</h2>
    <p><strong>ФИО:</strong> ${escapeHtml(data.lastName || '—')}</p>
    <p><strong>В каком составе ждать (ФИО гостей):</strong> ${escapeHtml(data.firstName || '—')}</p>
    <p><strong>Присутствие на торжестве:</strong> ${attendanceText}</p>
    <p><strong>Нужен ли трансфер:</strong> ${transferText}</p>
    <p><strong>Напитки:</strong> ${escapeHtml(drinksText)}</p>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpBody;
    const { lastName, firstName, attendance, transfer, drinks } = body;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Сервер не настроен для отправки писем (RESEND_API_KEY отсутствует).' },
        { status: 500 }
      );
    }

    const html = buildEmailHtml({
      lastName: lastName ?? '',
      firstName: firstName ?? '',
      attendance: attendance ?? '',
      transfer: transfer ?? '',
      drinks: Array.isArray(drinks) ? drinks : [],
    });

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: TO_EMAIL,
      subject: 'Анкета гостя: ' + (lastName || firstName || 'Новый ответ'),
      html,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Ошибка отправки' },
      { status: 500 }
    );
  }
}
