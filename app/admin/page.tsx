'use client';

import { useState, useEffect, useCallback } from 'react';

interface Order {
  order_id: string;
  first_name: string;
  email: string;
  country: string;
  product_name: string;
  amount_charged_usd: number;
  payment_method: 'crypto' | 'manual';
  payment_status: 'pending' | 'confirmed' | 'cancelled';
  utm_source: string | null;
  utm_content: string | null;
  created_at: string;
  confirmed_at: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#E8A427',
  confirmed: '#4ade80',
  cancelled: '#f87171',
};

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed'>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const fetchOrders = useCallback(async (s: string, f: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/orders?secret=${s}&status=${f}`);
      if (res.status === 401) {
        setError('Wrong secret.');
        setAuthed(false);
        return;
      }
      const data = await res.json() as { orders: Order[]; count: number };
      setOrders(data.orders);
      setAuthed(true);
    } catch {
      setError('Failed to load orders.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed && secret) fetchOrders(secret, filter);
  }, [filter, authed, secret, fetchOrders]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    await fetchOrders(secret, filter);
  }

  async function confirmOrder(orderId: string) {
    setConfirmingId(orderId);
    try {
      const res = await fetch(`/api/admin/confirm-order?secret=${secret}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await res.json() as { confirmed?: boolean; skipped?: string; error?: string };
      if (data.confirmed) {
        setToast(`✅ ${orderId} confirmed. Confirmation email sent.`);
        await fetchOrders(secret, filter);
      } else if (data.skipped) {
        setToast(`Already confirmed: ${orderId}`);
      } else {
        setToast(`Error: ${data.error}`);
      }
    } catch {
      setToast('Network error.');
    } finally {
      setConfirmingId(null);
      setTimeout(() => setToast(''), 4000);
    }
  }

  const pending = orders.filter((o) => o.payment_status === 'pending').length;
  const revenue = orders
    .filter((o) => o.payment_status === 'confirmed')
    .reduce((sum, o) => sum + Number(o.amount_charged_usd), 0);

  // Login screen
  if (!authed) {
    return (
      <div style={s.page}>
        <div style={s.loginBox}>
          <h1 style={s.logo}>ISRIB A15 · Admin</h1>
          <form onSubmit={handleLogin} style={{ marginTop: 24 }}>
            <input
              type="password"
              placeholder="Admin secret"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              autoFocus
              style={s.input}
            />
            <button type="submit" style={s.btn}>
              Enter →
            </button>
          </form>
          {error && <p style={s.errorMsg}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Toast */}
      {toast && (
        <div style={s.toast}>{toast}</div>
      )}

      {/* Header */}
      <div style={s.header}>
        <h1 style={s.logo}>ISRIB A15 · Orders</h1>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ color: '#888', fontSize: 13 }}>
            {pending > 0 && (
              <span style={{ color: '#E8A427', fontWeight: 700 }}>{pending} pending · </span>
            )}
            ${revenue.toFixed(0)} confirmed
          </span>
          <button
            onClick={() => fetchOrders(secret, filter)}
            style={{ ...s.btnSmall, background: '#1a1a20' }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={s.tabs}>
        {(['all', 'pending', 'confirmed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...s.tab,
              borderBottom: filter === f ? '2px solid #E8A427' : '2px solid transparent',
              color: filter === f ? '#E8A427' : '#888',
            }}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders table */}
      {loading ? (
        <p style={{ color: '#888', padding: 32 }}>Loading...</p>
      ) : orders.length === 0 ? (
        <p style={{ color: '#888', padding: 32 }}>No orders.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={s.table}>
            <thead>
              <tr>
                {['Order ID', 'Name', 'Email', 'Country', 'Product', 'Amount', 'Method', 'Status', 'Source', 'Date', 'Action'].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id} style={s.row}>
                  <td style={s.td}>
                    <span style={{ fontFamily: 'monospace', fontSize: 12, color: '#E8A427' }}>
                      {order.order_id}
                    </span>
                  </td>
                  <td style={s.td}>{order.first_name}</td>
                  <td style={s.td}>
                    <a href={`mailto:${order.email}`} style={{ color: '#b0b0b0', textDecoration: 'none' }}>
                      {order.email}
                    </a>
                  </td>
                  <td style={s.td}>{order.country}</td>
                  <td style={{ ...s.td, maxWidth: 180, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.product_name}
                  </td>
                  <td style={{ ...s.td, fontWeight: 700, color: '#f5f5f0' }}>
                    ${Number(order.amount_charged_usd).toFixed(0)}
                  </td>
                  <td style={s.td}>
                    <span style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: order.payment_method === 'crypto' ? '#1a1a30' : '#1a1a20',
                      color: order.payment_method === 'crypto' ? '#818cf8' : '#9ca3af',
                    }}>
                      {order.payment_method}
                    </span>
                  </td>
                  <td style={s.td}>
                    <span style={{
                      fontSize: 11,
                      padding: '2px 8px',
                      borderRadius: 4,
                      color: STATUS_COLORS[order.payment_status] ?? '#888',
                      background: '#1a1a20',
                      fontWeight: 600,
                    }}>
                      {order.payment_status}
                    </span>
                  </td>
                  <td style={{ ...s.td, fontSize: 12, color: '#666' }}>
                    {order.utm_source ?? '—'}
                    {order.utm_content ? (
                      <span style={{ display: 'block', color: '#444', fontSize: 11 }}>
                        {order.utm_content}
                      </span>
                    ) : null}
                  </td>
                  <td style={{ ...s.td, fontSize: 12, color: '#555', whiteSpace: 'nowrap' }}>
                    {new Date(order.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </td>
                  <td style={s.td}>
                    {order.payment_status === 'pending' ? (
                      <button
                        onClick={() => confirmOrder(order.order_id)}
                        disabled={confirmingId === order.order_id}
                        style={{
                          ...s.btnSmall,
                          background: '#14532d',
                          color: '#4ade80',
                          border: '1px solid #166534',
                          opacity: confirmingId === order.order_id ? 0.6 : 1,
                          cursor: confirmingId === order.order_id ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {confirmingId === order.order_id ? '...' : '✓ Confirm'}
                      </button>
                    ) : (
                      <span style={{ color: '#333', fontSize: 12 }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Inline styles (no Tailwind dependency, pure CSS-in-JS)
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0D0D12',
    color: '#f5f5f0',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: '0 0 80px',
  },
  loginBox: {
    maxWidth: 360,
    margin: '20vh auto 0',
    padding: 40,
    background: '#141418',
    borderRadius: 12,
    border: '1px solid #2a2a30',
  },
  logo: {
    fontSize: 18,
    fontWeight: 700,
    color: '#E8A427',
    margin: 0,
    letterSpacing: '0.02em',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    background: '#0D0D12',
    border: '1px solid #2a2a30',
    borderRadius: 8,
    padding: '12px 16px',
    color: '#f5f5f0',
    fontSize: 14,
    outline: 'none',
    marginBottom: 12,
  },
  btn: {
    width: '100%',
    background: '#E8A427',
    color: '#0D0D12',
    border: 'none',
    borderRadius: 8,
    padding: '12px 0',
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
  },
  btnSmall: {
    background: '#1f1f28',
    color: '#b0b0b0',
    border: '1px solid #2a2a30',
    borderRadius: 6,
    padding: '5px 12px',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
  },
  errorMsg: {
    color: '#f87171',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center' as const,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 32px',
    borderBottom: '1px solid #1a1a20',
  },
  tabs: {
    display: 'flex',
    gap: 0,
    padding: '0 32px',
    borderBottom: '1px solid #1a1a20',
    marginBottom: 0,
  },
  tab: {
    background: 'none',
    border: 'none',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.04em',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 13,
  },
  th: {
    textAlign: 'left' as const,
    padding: '12px 16px',
    color: '#555',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    borderBottom: '1px solid #1a1a20',
    whiteSpace: 'nowrap' as const,
  },
  td: {
    padding: '14px 16px',
    color: '#b0b0b0',
    borderBottom: '1px solid #141418',
    verticalAlign: 'middle' as const,
  },
  row: {
    transition: 'background 0.1s',
  },
  toast: {
    position: 'fixed' as const,
    top: 24,
    right: 24,
    background: '#141418',
    border: '1px solid #2a2a30',
    borderRadius: 8,
    padding: '12px 20px',
    fontSize: 13,
    color: '#f5f5f0',
    zIndex: 999,
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
};
