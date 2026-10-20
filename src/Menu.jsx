import { useMemo, useState } from 'react'

const categories = [
  { name: 'All items', icon: 'grid', count: 6 },
  { name: 'Burgers', icon: 'burger', count: 1 },
  { name: 'Tacos', icon: 'taco', count: 2 },
  { name: 'Sides', icon: 'fries', count: 1 },
  { name: 'Drinks', icon: 'cup', count: 1 },
  { name: 'Bowls', icon: 'bowl', count: 1 },
]

function Menu({ Icon, cart, formatPrice, products, updateQuantity }) {
  const [activeCategory, setActiveCategory] = useState('All items')
  const [query, setQuery] = useState('')

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All items' || product.category === activeCategory
      const matchesSearch =
        !normalizedQuery ||
        `${product.name} ${product.detail} ${product.category}`
          .toLowerCase()
          .includes(normalizedQuery)
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, products, query])

  return (
    <main className="catalog">
      <header className="topbar">
        <div>
          <div className="eyebrow"><span className="eyebrow-dot" /> TUESDAY, OCTOBER 20, 2026</div>
          <h1>Good morning, Alex <span className="wave">✳</span></h1>
          <p className="subheading">Ready for the lunch rush? Let’s get cooking.</p>
        </div>
        <div className="topbar-actions">
          <button aria-label="Filter menu" className="filter-button" onClick={() => { setActiveCategory('All items'); setQuery('') }}>
            <Icon name="sliders" size={18} />
          </button>
          <div className="staff-avatar" aria-label="Alex Johnson">AJ</div>
        </div>
      </header>

      <section className="menu-toolbar" aria-label="Menu search and categories">
        <label className="search-box">
          <Icon name="search" size={19} />
          <input
            aria-label="Search the menu"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your menu..."
            type="search"
            value={query}
          />
          <kbd>⌘ K</kbd>
        </label>
      </section>

      <section className="categories-section" aria-label="Menu categories">
        <div className="section-heading">
          <div>
            <h2>Categories</h2>
            <span className="section-note">Find something delicious</span>
          </div>
          <button className="text-button" onClick={() => setActiveCategory('All items')}>View all <span>→</span></button>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <button
              aria-pressed={activeCategory === category.name}
              className={`category-card ${activeCategory === category.name ? 'is-selected' : ''}`}
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
            >
              <span className="category-icon"><Icon name={category.icon} size={21} /></span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">
                {category.count} item{category.count === 1 ? '' : 's'}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="products-section" id="menu">
        <div className="section-heading products-heading">
          <div>
            <h2>{activeCategory === 'All items' ? "Today's favorites" : activeCategory}</h2>
            <span className="section-note">
              {visibleProducts.length} delicious pick
              {visibleProducts.length === 1 ? '' : 's'}, made fresh
            </span>
          </div>
          <span className="fresh-badge"><span className="green-indicator" /> Made fresh to order</span>
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const quantity = cart[product.id] || 0
              return (
                <article className={`product-card ${quantity ? 'in-cart' : ''}`} key={product.id}>
                  <div className="product-image-wrap">
                    <img
                      alt={product.name}
                      className="product-image"
                      loading="lazy"
                      src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=720&h=520&q=85`}
                    />
                    {product.tag && <span className="product-tag"><Icon name="spark" size={12} /> {product.tag}</span>}
                    <button
                      aria-label={`Add ${product.name} to order`}
                      className="quick-add"
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      <Icon name="plus" size={18} />
                    </button>
                  </div>
                  <div className="product-info">
                    <div className="product-title-row">
                      <h3>{product.name}</h3>
                      {product.vegetarian && <span className="veg-mark" aria-label="Vegetarian">V</span>}
                    </div>
                    <p className="product-detail">{product.detail}</p>
                    <div className="product-bottom">
                      <strong className="product-price">{formatPrice(product.price)}</strong>
                      {quantity ? (
                        <div className="quantity-control" aria-label={`${quantity} in order`}>
                          <button aria-label={`Remove one ${product.name}`} onClick={() => updateQuantity(product.id, -1)}><Icon name="minus" size={14} /></button>
                          <span>{quantity}</span>
                          <button aria-label={`Add one ${product.name}`} onClick={() => updateQuantity(product.id, 1)}><Icon name="plus" size={14} /></button>
                        </div>
                      ) : (
                        <span className="add-hint">Add to order <span>↗</span></span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="empty-menu">
            <span className="empty-icon"><Icon name="search" size={24} /></span>
            <strong>No dishes found</strong>
            <p>Try a different search or category.</p>
            <button className="text-button" onClick={() => { setQuery(''); setActiveCategory('All items') }}>Clear filters</button>
          </div>
        )}
      </section>
    </main>
  )
}

export default Menu
