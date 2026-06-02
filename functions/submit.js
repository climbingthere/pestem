export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const formData = await request.formData();
    const name    = formData.get('name')    || '';
    const phone   = formData.get('phone')   || '';
    const email   = formData.get('email')   || '';
    const address = formData.get('address') || '';
    const pest    = formData.get('pest')    || '';
    const message = formData.get('message') || '';

    const html = `
      <h2>New Quote Request — Pest 'Em</h2>
      <table cellpadding="8" style="font-family:sans-serif;font-size:15px;">
        <tr><td><strong>Name</strong></td><td>${name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${email}</td></tr>
        <tr><td><strong>Address</strong></td><td>${address}</td></tr>
        <tr><td><strong>Pest Concern</strong></td><td>${pest}</td></tr>
        <tr><td><strong>Message</strong></td><td>${message}</td></tr>
      </table>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Pest Em Site <onboarding@resend.dev>',
        to: ['ekirtchakov@gmail.com'],
        subject: `New Quote Request — ${name} (${pest || 'General'})`,
        html,
        reply_to: email,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return new Response('Error sending email', { status: 500 });
    }

    return Response.redirect('https://pestem.pages.dev/thanks.html', 303);

  } catch (err) {
    console.error('Function error:', err);
    return new Response('Server error', { status: 500 });
  }
}
