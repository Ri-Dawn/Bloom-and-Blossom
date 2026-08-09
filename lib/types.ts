export type OrderStatus =
  | 'received'
  | 'in_design'
  | 'hand_finished'
  | 'quality_check'
  | 'dispatched';

export type PaymentStatus = 'pending' | 'awaiting_verification' | 'paid';

export const STATUS_STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'received', label: 'Received' },
  { key: 'in_design', label: 'In Design' },
  { key: 'hand_finished', label: 'Hand-Finished' },
  { key: 'quality_check', label: 'Quality Check' },
  { key: 'dispatched', label: 'Dispatched' },
];

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: string;
  country: string;
  item_name: string;
  category: string;
  customisation: Record<string, unknown>;
  amount: number;
  currency: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  courier_name: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'customer' | 'shop';
  message_type: 'text' | 'voice';
  content: string;
  created_at: string;
}
