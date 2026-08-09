import { Resend } from 'resend';
import type { Order } from './types';

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is missing. Check .env.local');
  return new Resend(key);
}

const wrap = (inner: string) => `
<div style="background:#F8F1EA;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:#2A211A;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #EFE1D1;">
    <div style="background:#B0225A;color:#F8F1EA;padding:28px 28px;">
      <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.85;">Bloom &amp; Blossom</div>
    </div>
    <div style="padding:28px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.7;color:#2A211A;">
      ${inner}
    </div>
    <div style="padding:16px 28px;font-family:Helvetica,Arial,sans-serif;font-size:11px;color:#A98B68;border-top:1px solid #EFE1D1;">
      Bloom &amp; Blossom — handworked, one story at a time.
    </div>
  </div>
</div>`;

export async function sendOrderConfirmed(order: Order, trackUrl: string) {
  const html = wrap(`
    <p style="font-size:17px;font-family:Georgia,serif;">Your ${order.item_name} just began.</p>
    <p>We've confirmed your payment and your piece has entered our worktable. We'll message you the moment it moves to the next stage — no need to check in.</p>
    <p><a href="${trackUrl}" style="color:#B0225A;">Track this order →</a></p>
    <p style="color:#A98B68;font-size:12px;">Order ${order.id}</p>
  `);
  await client().emails.send({
    from: process.env.EMAIL_FROM!,
    to: order.customer_email,
    subject: `Your order is confirmed — ${order.id}`,
    html,
  });
}

export async function sendStatusUpdate(order: Order, trackUrl: string) {
  const messages: Record<string, string> = {
    in_design: 'Your piece is now being designed on our worktable.',
    hand_finished: "It's been hand-finished — every charm and bead in place.",
    quality_check: "We're giving it one last look before it travels to you.",
    dispatched: `It left our hands today, exactly as promised.${
      order.tracking_number ? ` Tracking: ${order.tracking_number}${order.courier_name ? ` via ${order.courier_name}` : ''}.` : ''
    }`,
  };
  const html = wrap(`
    <p style="font-size:17px;font-family:Georgia,serif;">An update on your order.</p>
    <p>${messages[order.status] ?? 'Your order has moved forward.'}</p>
    <p><a href="${trackUrl}" style="color:#B0225A;">See the full journey →</a></p>
    ${order.tracking_url ? `<p><a href="${order.tracking_url}" style="color:#B0225A;">Live courier tracking →</a></p>` : ''}
    <p style="color:#A98B68;font-size:12px;">Order ${order.id}</p>
  `);
  await client().emails.send({
    from: process.env.EMAIL_FROM!,
    to: order.customer_email,
    subject: `Order update — ${order.id}`,
    html,
  });
}

export async function sendPaymentAwaitingVerification(order: Order) {
  const html = wrap(`
    <p style="font-size:17px;font-family:Georgia,serif;">A payment needs confirming.</p>
    <p>${order.customer_name} says they've paid for ${order.item_name} (₹${order.amount}). Check your UPI app, then confirm it in the admin panel.</p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="color:#B0225A;">Open admin →</a></p>
    <p style="color:#A98B68;font-size:12px;">Order ${order.id}</p>
  `);
  await client().emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    subject: `Payment to confirm — ${order.id}`,
    html,
  });
}

export async function sendNewChatNotice(orderId: string, preview: string) {
  const html = wrap(`
    <p style="font-size:17px;font-family:Georgia,serif;">A new Design Studio message.</p>
    <p>${preview}</p>
    <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin" style="color:#B0225A;">Reply in admin →</a></p>
    <p style="color:#A98B68;font-size:12px;">Session ${orderId}</p>
  `);
  await client().emails.send({
    from: process.env.EMAIL_FROM!,
    to: process.env.ADMIN_EMAIL!,
    subject: `New message — ${orderId}`,
    html,
  });
}
