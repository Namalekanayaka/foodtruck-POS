import { useMemo, useState } from 'react'

const orderFilters = ['All orders', 'Preparing', 'Ready']

function Orders({ Icon, onStatusChange, orders, view }) {
  const [activeFilter, setActiveFilter] = useState('All orders')
  const isHistory = view === 'Order history'
  const visibleOrders = useMemo(() => {
    if (isHistory) return orders.filter((order) => order.status === 'Completed')
    const activeOrders = orders.filter((order) => order.status !== 'Completed')
    if (activeFilter === 'All orders') return activeOrders
    return activeOrders.filter((order) => order.status === activeFilter)
  }, [activeFilter, isHistory, orders])
  const preparingCount = orders.filter((order) => order.status === 'Preparing').length
  const readyCount = orders.filter((order) => order.status === 'Ready').length
  const completedCount = orders.filter((order) => order.status === 'Completed').length

  return (
    <main className="catalog orders-page">
      <header className="topbar">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> GOOD EATS · LIVE SERVICE</div>
          <h1>{isHistory ? 'Order history' : 'Kitchen orders'}</h1>
          <p className="subheading">
            {isHistory
              ? 'A look back at completed orders.'
              : 'Keep every order moving, from kitchen to customer.'}
          </p>
        </div>
        <div className="orders-live-badge"><span className="green-indicator" /> Service live</div>
      </header>

      <section className="order-stats" aria-label="Order summary">
        <article className="order-stat-card">
          <span className="order-stat-icon is-preparing"><Icon name="clock" size={18} /></span>
          <span className="order-stat-copy"><small>Preparing</small><strong>{preparingCount}</strong></span>
        </article>
        <article className="order-stat-card">
          <span className="order-stat-icon is-ready"><Icon name="check" size={18} /></span>
          <span className="order-stat-copy"><small>Ready for pickup</small><strong>{readyCount}</strong></span>
        </article>
        <article className="order-stat-card">
          <span className="order-stat-icon is-completed"><Icon name="receipt" size={18} /></span>
          <span className="order-stat-copy"><small>Completed today</small><strong>{completedCount}</strong></span>
        </article>
      </section>

      <section className="orders-list-section" aria-label={isHistory ? 'Completed orders' : 'Active orders'}>
        <div className="orders-list-heading">
          <div>
            <h2>{isHistory ? 'Completed orders' : 'Current orders'}</h2>
            <span className="section-note">
              {visibleOrders.length} order{visibleOrders.length === 1 ? '' : 's'}
              {isHistory ? ' completed today' : ' in this view'}
            </span>
          </div>
          {!isHistory && (
            <div className="orders-filter" role="group" aria-label="Filter orders">
              {orderFilters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter}
                  className={activeFilter === filter ? 'is-selected' : ''}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        {visibleOrders.length ? (
          <div className="orders-list">
            {visibleOrders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-card-top">
                  <span className="order-card-id">{order.id}</span>
                  <span className={`order-status is-${order.status.toLowerCase()}`}>
                    <span />{order.status}
                  </span>
                </div>
                <div className="order-card-main">
                  <div>
                    <h3>{order.name}</h3>
                    <p>{order.type || 'Pickup'} <span>·</span> {order.items} item{order.items === 1 ? '' : 's'}</p>
                  </div>
                  <span className="order-card-time"><Icon name="clock" size={14} />{order.time || 'Today'}</span>
                </div>
                {order.status !== 'Completed' && (
                  <button
                    className={`order-action ${order.status === 'Ready' ? 'is-complete' : ''}`}
                    onClick={() => onStatusChange(order.id, order.status === 'Preparing' ? 'Ready' : 'Completed')}
                  >
                    <Icon name={order.status === 'Preparing' ? 'check' : 'receipt'} size={15} />
                    {order.status === 'Preparing' ? 'Mark as ready' : 'Complete order'}
                  </button>
                )}
                {order.status === 'Completed' && (
                  <div className="order-completed-note"><Icon name="check" size={14} /> Completed</div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="orders-empty">
            <span className="empty-icon"><Icon name={isHistory ? 'receipt' : 'clock'} size={23} /></span>
            <strong>{isHistory ? 'No completed orders yet' : 'No orders in this view'}</strong>
            <p>
              {isHistory
                ? 'Orders will appear here after they are completed.'
                : 'New orders will show up here as they come in.'}
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default Orders
