import { useEffect, useState } from 'react'
import './App.css'
import Menu from './Menu.jsx'
import Orders from './Orders.jsx'

const iconShapes = {
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.8" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.8" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.8" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.8" /></>,
  burger: <><path d="M4 10a8 8 0 0 1 16 0H4Z" /><path d="M4 13h16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2Z" /><path d="M5 20h14" /><path d="M8 7h.01M12 5.5h.01M16 7h.01" /></>,
  taco: <><path d="M3.5 15a8.5 8.5 0 0 1 17 0H3.5Z" /><path d="M5 15c0 3.3 2.8 6 7 6s7-2.7 7-6" /><path d="M8 11l1.2-1.5m2.5 1.5L13 9m2.5 2.1L17 9.5" /></>,
  fries: <><path d="M6 10h12l-1 10H7L6 10Z" /><path d="m8 10 1-7m3 7V2m3 8 1-7" /><path d="M9 14h6" /></>,
  cup: <><path d="M7 7h10l-1 14H8L7 7Z" /><path d="M10 3v4m4-4v4M9 12h6" /><path d="M17 10h3" /></>,
  bowl: <><path d="M3 12h18a9 9 0 0 1-18 0Z" /><path d="M5 16h14M8 8c0-1.2 1-1.8 1-3m4 3c0-1.2 1-1.8 1-3m3 3c0-1.2 1-1.8 1-3" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
  sliders: <><path d="M4 6h9m4 0h3M4 12h3m4 0h9M4 18h9m4 0h3" /><circle cx="15" cy="6" r="2" /><circle cx="9" cy="12" r="2" /><circle cx="15" cy="18" r="2" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  receipt: <><path d="M5 3.5h14v17l-3-2-4 2-4-2-3 2v-17Z" /><path d="M8 8h8m-8 4h8m-8 4h4" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15v5Z" /></>,
  cash: <><rect x="3" y="6" width="18" height="12" rx="2.5" /><circle cx="12" cy="12" r="2.5" /><path d="M6 9h.01M18 15h.01" /></>,
  card: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 10h18m-14 5h4" /></>,
  qr: <><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><path d="M15 14h2v2h-2zm4 0h1v3h-3m-2 2h3v-2m2 2h.01" /></>,
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
  spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
}

function Icon({ name, size = 18, ...props }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {iconShapes[name]}
    </svg>
  )
}

const products = [
  {
    id: 1,
    name: 'Backyard cheeseburger',
    detail: 'Double smash · cheddar · house sauce',
    category: 'Burgers',
    price: 12.5,
    tag: 'BEST SELLER',
    image: 'photo-1568901346375-23c9450c58cd',
    vegetarian: false,
  },
  {
    id: 2,
    name: 'Street corn chicken tacos',
    detail: 'Grilled chicken · lime crema · 3 pcs',
    category: 'Tacos',
    price: 14,
    tag: 'POPULAR',
    image: 'photo-1551504734-5ee1c4a1479b',
    vegetarian: false,
  },
  {
    id: 3,
    name: 'Avocado crunch salad',
    detail: 'Avocado · greens · toasted seeds',
    category: 'Bowls',
    price: 11.75,
    tag: '',
    image: 'photo-1512621776951-a57141f2eefd',
    vegetarian: true,
  },
  {
    id: 4,
    name: 'Crispy seasoned fries',
    detail: 'Shoestring fries · sea salt · herbs',
    category: 'Sides',
    price: 5.5,
    tag: '',
    image: 'photo-1573080496219-bb080dd4f877',
    vegetarian: true,
  },
  {
    id: 5,
    name: 'Fresh orange lemonade',
    detail: 'Fresh-squeezed orange · house lemonade',
    category: 'Drinks',
    price: 4.5,
    tag: 'FRESH',
    image: 'photo-1600271886742-f049cd451bba',
    vegetarian: true,
  },
  {
    id: 6,
    name: 'Garden veggie burrito',
    detail: 'Black beans · avocado · salsa verde',
    category: 'Tacos',
    price: 12,
    tag: '',
    image: 'photo-1626700051175-6818013e1d4f',
    vegetarian: true,
  },
]

const formatPrice = (price) => `$${price.toFixed(2)}`

const navigation = [
  { name: 'Menu', icon: 'grid' },
  { name: 'Orders', icon: 'receipt' },
  { name: 'Order history', icon: 'clock' },
]

function App() {
  const [activeNav, setActiveNav] = useState('Menu')
  const [orderType, setOrderType] = useState('Pickup')
  const [payment, setPayment] = useState('Card')
  const [cart, setCart] = useState({})
  const [orders, setOrders] = useState([
    { id: 'T1', name: 'Mia C.', items: 3, status: 'Preparing', type: 'Pickup', time: '8 min ago' },
    { id: 'T2', name: 'Jordan R.', items: 2, status: 'Ready', type: 'Dine in', time: '12 min ago' },
    { id: 'T3', name: 'Sam W.', items: 4, status: 'Preparing', type: 'Delivery', time: '18 min ago' },
  ])
  const [nextOrderNumber, setNextOrderNumber] = useState(4)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return undefined
    const timeoutId = window.setTimeout(() => setMessage(''), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [message])

  const cartItems = products.filter((product) => cart[product.id] > 0)
  const itemCount = cartItems.reduce((sum, product) => sum + cart[product.id], 0)
  const activeOrders = orders.filter((order) => order.status !== 'Completed')
  const subtotalCents = cartItems.reduce(
    (sum, product) =>
      sum + Math.round(product.price * 100) * cart[product.id],
    0,
  )
  const taxCents = Math.round(subtotalCents * 0.05)
  const subtotal = subtotalCents / 100
  const tax = taxCents / 100
  const total = (subtotalCents + taxCents) / 100

  const updateQuantity = (productId, change) => {
    setCart((currentCart) => {
      const nextQuantity = (currentCart[productId] || 0) + change
      const nextCart = { ...currentCart }
      if (nextQuantity <= 0) {
        delete nextCart[productId]
      } else {
        nextCart[productId] = nextQuantity
      }
      return nextCart
    })
  }

  const placeOrder = () => {
    if (!itemCount) return
    setOrders((currentOrders) => [
      {
        id: `T${nextOrderNumber}`,
        name: 'Walk-in',
        items: itemCount,
        status: 'Preparing',
        type: orderType,
        time: 'Just now',
      },
      ...currentOrders,
    ])
    setNextOrderNumber((number) => number + 1)
    setCart({})
    setMessage(`Order T${nextOrderNumber} sent to the kitchen`)
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    )
  }

  return (
    <div className="pos-shell">
      <aside className="sidebar">
        <a className="brand" href="#menu" onClick={() => setActiveNav('Menu')}>
          <span className="brand-mark"><Icon name="spark" size={21} /></span>
          <span className="brand-copy">
            <strong>GOOD EATS</strong>
            <small>FOOD TRUCK POS</small>
          </span>
        </a>

        <div className="truck-status">
          <span className="status-dot" />
          <span>Truck is open</span>
          <span className="live-label">LIVE</span>
        </div>

        <span className="nav-label">WORKSPACE</span>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              aria-current={activeNav === item.name ? 'page' : undefined}
              className={`nav-item ${activeNav === item.name ? 'is-active' : ''}`}
              key={item.name}
              onClick={() => setActiveNav(item.name)}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.name}</span>
              {item.name === 'Orders' && <span className="nav-badge">{activeOrders.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="shift-card">
            <span className="avatar">AJ</span>
            <span className="staff-copy"><strong>Alex Johnson</strong><small>On shift · Manager</small></span>
            <button aria-label="Sign out" className="icon-button sign-out" onClick={() => setMessage('You are signed in for this demo')}>
              <Icon name="logout" size={17} />
            </button>
          </div>
          <div className="sidebar-footer">
            <span className="green-indicator" /> Service running smoothly
          </div>
        </div>
      </aside>

      {activeNav === 'Menu' ? (
        <Menu
          Icon={Icon}
          cart={cart}
          formatPrice={formatPrice}
          products={products}
          updateQuantity={updateQuantity}
        />
      ) : (
        <Orders
          Icon={Icon}
          onStatusChange={updateOrderStatus}
          orders={orders}
          view={activeNav}
        />
      )}

      <aside className="order-panel" aria-label="Current order">
        <header className="order-header">
          <div>
            <span className="order-number">NEW ORDER <span className="order-number-dot" /></span>
            <h2>Order #{String(nextOrderNumber + 20).padStart(3, '0')}</h2>
            <p>Walk-in customer <span>·</span> Just now</p>
          </div>
          <button aria-label="Edit order" className="icon-button edit-button" onClick={() => setMessage('Order details are ready to edit')}>
            <Icon name="edit" size={17} />
          </button>
        </header>

        <div className="order-type-switch" role="group" aria-label="Order type">
          {['Pickup', 'Dine in', 'Delivery'].map((type) => (
            <button
              aria-pressed={orderType === type}
              className={orderType === type ? 'is-selected' : ''}
              key={type}
              onClick={() => setOrderType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="cart-heading">
          <h3>Your order <span>{itemCount}</span></h3>
          {itemCount > 0 && <button className="clear-button" onClick={() => setCart({})}>Clear all</button>}
        </div>

        <div className="cart-list">
          {cartItems.length ? cartItems.map((product) => (
            <div className="cart-item" key={product.id}>
              <img
                alt=""
                className="cart-thumb"
                loading="lazy"
                src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=140&h=140&q=75`}
              />
              <div className="cart-item-info">
                <strong>{product.name}</strong>
                <span>{formatPrice(product.price)} each</span>
                <div className="cart-quantity">
                  <button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Icon name="minus" size={12} /></button>
                  <span>{cart[product.id]}</span>
                  <button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Icon name="plus" size={12} /></button>
                </div>
              </div>
              <strong className="cart-line-total">{formatPrice(product.price * cart[product.id])}</strong>
            </div>
          )) : (
            <div className="empty-cart">
              <span className="empty-cart-icon"><Icon name="bag" size={22} /></span>
              <strong>Your order is waiting</strong>
              <span>Tap a menu item to add it here.</span>
            </div>
          )}
        </div>

        <div className="order-summary">
          <div><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div><span>Tax <small>(5%)</small></span><span>{formatPrice(tax)}</span></div>
          <div className="summary-total"><strong>Total due</strong><strong>{formatPrice(total)}</strong></div>
        </div>

        <div className="payment-section">
          <div className="payment-heading"><h3>Payment method</h3><span>Choose at checkout</span></div>
          <div className="payment-options" role="group" aria-label="Payment method">
            {[
              { name: 'Cash', icon: 'cash' },
              { name: 'Card', icon: 'card' },
              { name: 'QR Pay', icon: 'qr' },
            ].map((method) => (
              <button
                aria-pressed={payment === method.name}
                className={`payment-option ${payment === method.name ? 'is-selected' : ''}`}
                key={method.name}
                onClick={() => setPayment(method.name)}
              >
                <Icon name={method.icon} size={19} />
                <span>{method.name}</span>
              </button>
            ))}
          </div>
        </div>

        <button className="place-order-button" disabled={!itemCount} onClick={placeOrder}>
          <span>Place order</span>
          <span>{formatPrice(total)} <Icon name="check" size={16} /></span>
        </button>
        <p className="secure-note"><Icon name="check" size={12} /> No payment will be processed in this demo</p>
      </aside>

      <footer className="kitchen-queue">
        <div className="queue-title">
          <div className="queue-icon"><Icon name="clock" size={17} /></div>
          <div><strong>Kitchen queue</strong><span>{activeOrders.length} active orders</span></div>
        </div>
        <div className="queue-items">
          {activeOrders.slice(0, 4).map((order) => (
            <div className="queue-order" key={order.id}>
              <span className="queue-id">{order.id}</span>
              <span className="queue-order-info"><strong>{order.name}</strong><small>{order.items} item{order.items === 1 ? '' : 's'} <span>·</span> Kitchen</small></span>
              <span className={`queue-status ${order.status === 'Ready' ? 'is-ready' : ''}`}>{order.status}</span>
            </div>
          ))}
        </div>
        <button className="queue-link" onClick={() => setActiveNav('Orders')}>
          View queue <span>→</span>
        </button>
      </footer>

      {message && <div className="toast-message" role="status">{message}</div>}
    </div>
  )
}

export default App
