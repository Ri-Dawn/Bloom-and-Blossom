-- Run this once in Supabase: Project > SQL Editor > New Query > paste > Run

create table if not exists orders (
  id text primary key,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  shipping_address text not null,
  country text default 'IN',
  item_name text not null,
  category text not null,
  customisation jsonb default '{}'::jsonb,
  amount numeric not null,
  currency text default 'INR',
  status text default 'received',            -- received | in_design | hand_finished | quality_check | dispatched
  payment_status text default 'pending',      -- pending | awaiting_verification | paid
  courier_name text,
  tracking_number text,
  tracking_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id text references orders(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz default now()
);

create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,          -- order id, or a generated id for pre-order chats
  sender text not null,              -- 'customer' | 'shop'
  message_type text not null,        -- 'text' | 'voice'
  content text not null,             -- text body, or a data: URI for voice notes
  created_at timestamptz default now()
);

create index if not exists idx_chat_session on chat_messages(session_id);
create index if not exists idx_orders_email on orders(customer_email);

-- Row Level Security: locked down by default. All reads/writes in this app
-- go through server-side API routes using the service role key, so RLS can
-- stay strict. If you later call Supabase directly from the browser, add
-- narrower policies here first.
alter table orders enable row level security;
alter table order_status_history enable row level security;
alter table chat_messages enable row level security;
