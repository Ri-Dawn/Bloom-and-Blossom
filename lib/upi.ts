/**
 * Builds a standard UPI deep link. Scanning/opening this in any UPI app
 * (GPay, PhonePe, Paytm, BHIM, banking apps) opens the payment screen with
 * the amount pre-filled. Money goes straight to the personal bank account
 * behind UPI_VPA — no gateway, no fees, no KYC beyond the bank account
 * that already exists.
 *
 * Note: the payee name field is deliberately left off the URI. UPI apps run
 * a payee-name-match check against real bank records, and mismatches show
 * a scary warning — omitting "pn" lets the app show the verified bank name
 * instead, which is the cleaner experience.
 */
export function buildUpiLink(params: {
  vpa: string;
  amount: number;
  note: string;
}) {
  const q = new URLSearchParams({
    pa: params.vpa,
    am: params.amount.toFixed(2),
    cu: 'INR',
    tn: params.note,
  });
  return `upi://pay?${q.toString()}`;
}

/** Public QR rendering service — no extra npm dependency needed. */
export function qrImageUrl(data: string, size = 320) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
    data
  )}`;
}
