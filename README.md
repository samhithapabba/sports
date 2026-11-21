# SportGear – Sports & Fitness Equipment Store

**Task ID:** WD-EC-008  
**Domain:** E-Commerce Sports & Fitness  
**Technologies:** HTML5, CSS3, JavaScript, LocalStorage

## Project overview
SportGear is a responsive frontend-only sports and fitness e-commerce demo. It includes product discovery, category/sport filters, product details, cart management, a simulated checkout, demo account handling, order history, wishlist and contact form.

## Run locally
1. Download and extract the project ZIP.
2. Open the `sportgear-project` folder in Visual Studio Code.
3. Install the **Live Server** extension (or use any static web server).
4. Right-click `index.html` and select **Open with Live Server**.
5. The website opens in your browser. You can also open `index.html` directly, but Live Server is recommended.

## Files
- `index.html` – page structure and all website sections.
- `style.css` – visual design, layout, animations and responsive breakpoints.
- `script.js` – product data, filters, cart, wishlist, demo authentication and checkout logic.

## Features
- Responsive home page, category cards and featured products
- Search by product name, brand, category or sport
- Category, sport and sorting filters
- Product detail dialog with size selection
- Add/remove products and update cart quantities
- Subtotal, shipping, tax and total calculation
- Checkout form with shipping details and simulated payment choices
- Demo login and registration
- Wishlist and order history
- Contact form demo feedback
- Browser LocalStorage persistence

## Data and payment note
This is a frontend-only student project. Products are JavaScript objects and cart, wishlist, demo user and orders are saved in browser LocalStorage. No real user authentication, server, database or payment gateway is connected. Do not enter real payment card details.

## Customization
Edit the `products` array near the top of `script.js` to add or change products. Update image URLs, prices, categories, sizes and descriptions there. The main theme colors are CSS variables at the top of `style.css`.

## Deployment
For GitHub Pages, push these three files to a public repository, then open **Settings → Pages**, choose the `main` branch and `/ (root)` folder, and save. Netlify can also deploy the folder by drag-and-drop.

## Suggested screenshots for submission
1. Home page desktop
2. Home page mobile
3. Product listing and filters
4. Product details dialog
5. Shopping cart with quantities
6. Checkout form
7. Account / order history
