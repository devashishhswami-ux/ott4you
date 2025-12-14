import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';

export default async function AdminDashboard() {
  await connectDB();
  
  const [totalOrders, totalUsers, totalProducts, orders] = await Promise.all([
    Order.countDocuments(),
    User.countDocuments(),
    Product.countDocuments(),
    Order.find().sort({ purchaseDate: -1 }).limit(10).lean(),
  ]);

  const totalRevenue = await Order.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: null, total: { $sum: '$amount' } } },
  ]);

  const revenue = totalRevenue[0]?.total || 0;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
        <div className="glass-card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Total Revenue
              </p>
              <h2 style={{ fontSize: '2rem' }} className="text-gradient">
                ₹{revenue.toLocaleString()}
              </h2>
            </div>
            <div style={{ fontSize: '2.5rem' }}>💰</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Total Orders
              </p>
              <h2 style={{ fontSize: '2rem' }} className="text-gradient">
                {totalOrders}
              </h2>
            </div>
            <div style={{ fontSize: '2.5rem' }}>🛒</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Total Users
              </p>
              <h2 style={{ fontSize: '2rem' }} className="text-gradient">
                {totalUsers}
              </h2>
            </div>
            <div style={{ fontSize: '2.5rem' }}>👥</div>
          </div>
        </div>

        <div className="glass-card">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Total Products
              </p>
              <h2 style={{ fontSize: '2rem' }} className="text-gradient">
                {totalProducts}
              </h2>
            </div>
            <div style={{ fontSize: '2.5rem' }}>📦</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Recent Orders</h2>
        <div className="glass-card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}>
              <thead>
                <tr style={{
                  borderBottom: '1px solid var(--glass-border)',
                }}>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>Product</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>Duration</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>Amount</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>Date</th>
                  <th style={{
                    padding: '1rem',
                    textAlign: 'left',
                    color: 'var(--text-secondary)',
                    fontWeight: 600,
                  }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{
                      padding: '2rem',
                      textAlign: 'center',
                      color: 'var(--text-secondary)',
                    }}>
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order: any) => (
                    <tr key={order._id.toString()} style={{
                      borderBottom: '1px solid var(--glass-border)',
                    }}>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>{order.productName}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {order.platform}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {order.duration} {order.duration === 1 ? 'Month' : 'Months'}
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600 }}>
                        ₹{order.amount}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                        {new Date(order.purchaseDate).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${
                          order.status === 'completed' ? 'badge-success' :
                          order.status === 'pending' ? 'badge-warning' :
                          'badge-danger'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
