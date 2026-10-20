# Good Eats Food Truck POS

A static React point-of-sale demo based on the supplied food-truck POS design.

## Run locally

```sh
npm install
npm run dev
```

## Included

- Searchable menu with food categories and product cards
- In-memory cart with quantity controls and a 5% tax calculation
- Pickup, dine-in, and delivery order types
- Cash, card, and QR payment selection
- Demo kitchen queue and order confirmation
- Responsive desktop, tablet, and mobile layouts

This demo does not use a database, server, or payment processor. Cart changes and
orders exist only in the current browser session and are cleared on refresh.

## Quality checks

```sh
npm run lint
npm run build
```
