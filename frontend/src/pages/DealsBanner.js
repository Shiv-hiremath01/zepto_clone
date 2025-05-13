import React from 'react';
import { Link } from 'react-router-dom';

const DealsBanner = () => {
  const banners = [
    {
      title: 'Super Sonic Deals',
      description: 'UP TO 90% OFF',
      bgColor: '#000000',
      textColor: '#ffffff',
      categories: [
        { label: 'Audio Gear & Watches', discount: 'UP TO 90% OFF', link: '/electronics', img: 'https://cdn.zeptonow.com/production/inventory/banner/36d0d504-7398-4f6a-9473-8249ff4b90c6.png' },
        { label: 'Home & Kitchen Appliances', discount: 'UP TO 80% OFF', link: '/electronics' },
        { label: 'Tech Accessories', discount: 'UP TO 75% OFF', link: '/electronics' },
        { label: 'Charging Needs', discount: 'UP TO 80% OFF', link: '/electronics' },
        { label: 'Personal Care & Grooming', discount: 'UP TO 80% OFF', link: '/electronics' },
      ],
    },
    {
      title: 'Beauty LIT Fest',
      description: 'UP TO 60% OFF',
      bgColor: '#fde9ef',
      textColor: '#000000',
      categories: [
        { label: 'Luscious Lips', discount: 'UP TO 40% OFF', link: '/beauty' },
        { label: 'Flawless Face', discount: 'UP TO 45% OFF', link: '/beauty' },
        { label: 'Dazzling Eyes', discount: 'UP TO 60% OFF', link: '/beauty' },
        { label: 'Nails & more', discount: 'UP TO 50% OFF', link: '/beauty' },
        { label: 'Korean Beauty', discount: 'UP TO 60% OFF', link: '/beauty' },
      ],
    },
  ];

  const promoBanners = [
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1051,ar-1051-660,pr-true,f-auto,q-80/inventory/banner/bf5d1531-5a20-4466-b319-98cd22413431.png',
      alt: 'Life Cover Ad',
      link: 'https://www.axismaxlife.com/term-insurance-plans/premium-calculator?utmCode=143713627&utm_theme=2Crore',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/a0ef6b1b-a303-413b-9082-142ba98cb968.png',
      alt: 'EMI Card Ad',
      link: 'https://www.bajajfinserv.in/webform/v1/emicard/login',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/1bc8faa1-9dcc-44dd-b728-d2007571424d.png',
      alt: 'Zero Forex Ad',
      link: 'https://apply.scapia.cards/landing_page?campaign_image_asset=v1744873027%2Fspitha_prod_uploads%2F2025_04%2FScapiaforex2_1744873025455.webp',
    },
    {
      img: 'https://cdn.zeptonow.com/production/tr:w-1050,ar-1050-660,pr-true,f-auto,q-80/inventory/banner/a6fed5d6-9714-4698-9a07-f3f53fbe81c9.png',
      alt: 'Bank Ad',
      link: 'https://www.idfcfirstbank.com/personal-banking/accounts/savings-account',
    },
  ];

  const coffeeProducts = [
    {
      title: 'Vietnamese Cold Coffee',
      volume: '450 ml',
      price: 189,
      originalPrice: 439,
      discount: '56%',
      img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-5304-5304,pr-true,f-auto,q-80/cms/product_variant/9bc896d4-229d-45a4-8294-b36f97f5992c/Vietnamese-Cold-Coffee.jpeg',
    },
    {
      title: 'Hot Chocolate',
      volume: '250 ml',
      price: 135,
      originalPrice: 279,
      discount: '51%',
      img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/76f7bedc-0cf0-4a64-ae7d-476e187346d8/Hot-Chocolate.jpeg',
    },
    {
      title: 'Classic Cold Coffee',
      volume: '350 ml',
      price: 159,
      originalPrice: 319,
      discount: '50%',
      img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/18d502d4-00ba-4533-99e3-ae817db3f361/Classic-Cold-Coffee.jpeg',
    },
    {
      title: 'Hazelnut Cold Coffee',
      volume: '350 ml',
      price: 169,
      originalPrice: 279,
      discount: '39%',
      img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2400-2400,pr-true,f-auto,q-80/cms/product_variant/d72f520d-1907-42df-801c-ecd6684106ac/Hazelnut-Cold-Coffee.jpeg',
    },
    {
      title: 'French Vanilla Latte',
      volume: '250 ml',
      price: 179,
      originalPrice: 384,
      discount: '53%',
      img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-4348-4348,pr-true,f-auto,q-80/cms/product_variant/03dec151-460d-485e-ade8-bc2ea74c42a8/French-Vanilla-Latte.jpeg',
    },
  ];

  return (
    <div className="container my-4">
      <style>
        {`
          .banner-card {
            border-radius: 16px;
            padding: 20px;
            height: 100%;
          }
          .category-tile {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            margin: 5px;
            min-width: 150px;
            text-align: center;
            color: inherit;
            text-decoration: none;
            display: block;
            transition: background 0.3s ease;
          }
          .category-tile:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
          .category-row {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding-top: 15px;
          }
          .promo-banner {
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s ease;
          }
          .promo-banner:hover {
            transform: scale(1.02);
          }
          .scroll-section {
            background: #fff2ee;
            border-radius: 16px;
            padding: 20px;
            margin-top: 2rem;
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            gap: 20px;
          }
          .section-card {
            min-width: 250px;
            max-width: 250px;
            flex-shrink: 0;
          }
          .section-card h5 {
            font-weight: bold;
          }
          .product-card {
            background: white;
            border-radius: 12px;
            padding: 10px;
            min-width: 150px;
            flex-shrink: 0;
            text-align: center;
            transition: transform 0.3s ease;
          }
          .product-card:hover {
            transform: scale(1.05);
          }
          .product-card img {
            width: 100%;
            max-height: 120px;
            object-fit: cover;
            border-radius: 10px;
          }
          .discount-badge {
            position: absolute;
            background: purple;
            color: white;
            padding: 2px 6px;
            font-size: 12px;
            border-radius: 4px;
            top: 5px;
            left: 5px;
          }
          .product-link {
            text-decoration: none;
            color: inherit;
          }
          .accessory-card {
            transition: transform 0.3s ease;
          }
          .accessory-card:hover {
            transform: scale(1.05);
          }
          .accessory-card img {
            width: 100%;
            border-radius: 8px;
          }
          .household-section .accessory-card img {
            height: 140px;
            object-fit: cover;
          }
          .banner-link {
            text-decoration: none;
            color: inherit;
            display: block;
          }
          .banner-card:hover {
            opacity: 0.95;
          }
        `}
      </style>

      {/* Banners */}
      <div className="row">
        {banners.map((banner, index) => (
          <div className="col-md-6 mb-3" key={index}>
            <Link
              to={banner.title === 'Super Sonic Deals' ? '/electronics' : '/beauty'}
              className="banner-link"
            >
              <div
                className="banner-card"
                style={{ backgroundColor: banner.bgColor, color: banner.textColor }}
              >
                <h4>{banner.title}</h4>
                <p>{banner.description}</p>
                <div className="category-row">
                  {banner.categories.map((cat, i) => (
                    <a key={i} href={cat.link} className="category-tile">
                      <strong>{cat.discount}</strong>
                      <div>{cat.label}</div>
                    </a>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Promo Banners */}
      <div className="row mt-4">
        {promoBanners.map((banner, index) => (
          <div className="col-md-3 col-6 mb-3" key={index}>
            <a href={banner.link} className="d-block promo-banner">
              <img
                src={banner.img}
                alt={banner.alt}
                className="img-fluid w-100"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Coffee Lovers Style Scrollable Section */}
      <div className="scroll-section">
        <div className="section-card">
          <p style={{ color: '#9b5b2b', fontSize: '14px' }}>COFFEE LOVERS</p>
          <h5>Dive into the world of fresh brew</h5>
          <button className="btn btn-dark mt-2">More Items</button>
        </div>
        {coffeeProducts.map((product, index) => (
          <Link to="/cafe" className="product-link" key={index}>
            <div className="product-card">
              <div style={{ position: 'relative' }}>
                <span className="discount-badge">{product.discount} Off</span>
                <img src={product.img} alt={product.title} />
              </div>
              <div className="mt-2">
                <strong>{product.title}</strong>
                <div style={{ fontSize: '14px', color: '#666' }}>{product.volume}</div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>₹{product.price}</span>{' '}
                  <span style={{ textDecoration: 'line-through', color: '#aaa', fontSize: '12px' }}>
                    ₹{product.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Accessories Section */}
      <div className="accessories-section mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Mobile Accessories</h4>
          <Link to="/mobiles" className="text-danger fw-semibold">
            See All <span></span>
          </Link>
        </div>
        <div className="d-flex overflow-auto">
          {[
            {
              title: 'Lapcare Blaze 10000mAh Power...',
              unit: '1 piece',
              price: 686,
              originalPrice: 1599,
              discount: '57%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/4fbe2559-0038-42d5-ac34-402c85b157ca/Lapcare-Blaze-10000mAh-Power-bank-Dual-USB-Port-PD-22-5w-Fast-Charging-Type-c.jpeg',
            },
            {
              title: 'boAt 20000mAh Power Bank w/ 2...',
              unit: '1 pc',
              price: 1699,
              originalPrice: 4499,
              discount: '62%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/c36ba756-db3c-4a07-bfa5-0ebf682cc357/boAt-20000mAh-Power-Bank-w-2-Way-22-5W-Fast-Charging-Smart-Power-Management-PB400-Burgundy-.jpeg',
            },
            {
              title: 'Portronics Konnect Sync 3M Cord...',
              unit: '1 pc',
              price: 223,
              originalPrice: 899,
              discount: '75%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1200-1200,pr-true,f-auto,q-80/cms/product_variant/6c997e54-cca0-43f2-8223-284bab4bd9c6/Portronics-Konnect-Sync-3M-Cord-Length-Hdmi-Cable.jpg',
            },
            {
              title: 'boAt 20000mAh Power Bank w/ 2...',
              unit: '1 pc',
              price: 1699,
              originalPrice: 4499,
              discount: '62%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/17fee3d3-a18d-47fc-947e-48131829e0a7/boAt-20000mAh-Power-Bank-w-2-Way-22-5W-Fast-Charging-Smart-Power-Management-PB400-Carbon-Black-.jpeg',
            },
            {
              title: 'Sounce Usb C To Hdmi Adapter, Typ...',
              unit: '1 pc',
              price: 418,
              originalPrice: 999,
              discount: '58%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-679-679,pr-true,f-auto,q-80/cms/product_variant/b6746060-35b4-401c-8c0a-eb71c161d914/Sounce-Usb-C-To-Hdmi-Adapter-Type-C-To-Hdmi-4K-Adapter-Thunderbolt-3Compatible-Grey-.jpg',
            },
            {
              title: 'Sounce 3M High-Speed Hdmi Cable...',
              unit: '1 pack',
              price: 199,
              originalPrice: 999,
              discount: '80%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/de1c637d-9d30-4045-9602-8d64e5c4520c/Sounce-3M-High-Speed-Hdmi-Cable-Ultra-Hd-4K-X-2K-Hdmi-Cable-Audio-Video-Gold-Plated-Black-.jpg',
            },
            {
              title: 'boAt 10000mAh Power Bank w/...',
              unit: '1 pc',
              price: 1199,
              originalPrice: 2999,
              discount: '60%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1500-1500,pr-true,f-auto,q-80/cms/product_variant/0b6ee454-730d-4938-951d-9ebb5f5a9ab6/boAt-10000mAh-Power-Bank-w-22-5W-Fast-Charging-Smart-IC-Protection-PB300-Martian-Red-.jpeg',
            },
          ].map((item, index) => (
            <Link to="/mobiles" className="product-link" key={index}>
              <div className="me-3 accessory-card" style={{ minWidth: '140px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    background: '#7e22ce',
                    color: '#fff',
                    fontSize: '11px',
                    padding: '2px 6px',
                    borderTopLeftRadius: '6px',
                    borderBottomRightRadius: '6px',
                    zIndex: 1
                  }}>{item.discount} Off</span>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="mt-2">
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#777' }}>{item.unit}</div>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div>
                      <strong>₹{item.price}</strong>{' '}
                      <small style={{ textDecoration: 'line-through', color: '#999' }}>
                        ₹{item.originalPrice}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Must have in your Household Section */}
      <div className="accessories-section household-section mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">Must have in your Household</h4>
          <Link to="/kitchen-dining" className="text-danger fw-semibold">
            See All <span></span>
          </Link>
        </div>
        <div className="d-flex overflow-auto">
          {[
            {
              title: 'Kitchen Essentials Ferstel Triply...',
              unit: '1 pc',
              price: 1760,
              originalPrice: 3300,
              discount: '46%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1802-1802,pr-true,f-auto,q-80/cms/product_variant/49471c5c-662e-4bb0-9c21-867dc0dd69c1/Kitchen-Essentials-Ferstal-Triply-Induction-Bottom-Kalash-Pressure-Cooker-Outer-Lid-3-Ltr.jpg',
            },
            {
              title: 'Wonderchef Alfa Aluminium Inner Lid Pressure Cooker | 3 Litre...',
              unit: '1 pack',
              price: 899,
              originalPrice: 2000,
              discount: '55%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1100-1100,pr-true,f-auto,q-80/cms/product_variant/3e76a213-53bf-4859-9b49-875dd7268b54/Wonderchef-Alfa-Aluminium-Inner-Lid-Pressure-Cooker-3-Litre.jpg',
            },
            {
              title: 'Prestige Nakshatra Plus Svachh Hard Anodised Spillage Control Handi Pressure Cooker, 3 L (Black)',
              unit: '1 pc',
              price: 1955,
              originalPrice: 2300,
              discount: '15%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-1000-1000,pr-true,f-auto,q-80/cms/product_variant/470ac042-dafa-4546-b6b2-8b6f2e6c6eab/Prestige-Nakshatra-Plus-Svachh-Hard-Anodised-Spillage-Control-Handi-Pressure-Cooker-3-L-Black-.jpg',
            },
            {
              title: 'Prestige Nakshatra Essential Svachh Stainless Steel Pressure Cooker 5.0 L...',
              unit: '1 pc',
              price: 2783,
              originalPrice: 3275,
              discount: '15%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2000-2000,pr-true,f-auto,q-80/cms/product_variant/667e2576-3148-44b0-bfc7-ffa636d2371e/Prestige-Nakshatra-Essential-Svachh-Stainless-Steel-Pressure-Cooker-5-0-L.jpg',
            },
            {
              title: 'Pigeon Favorite 5L Aluminium Induction Base Outer Lid Pressure Cooker...',
              unit: '1 pc',
              price: 939,
              originalPrice: 1895,
              discount: '50%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-973-740,pr-true,f-auto,q-80/cms/product_variant/232d16d0-c9f0-4e97-92db-8c42b771ee83/Pigeon-Favorite-5L-Aluminium-Induction-Base-Outer-Lid-Pressure-Cooker.jpeg',
            },
            {
              title: 'Vinod Pressure Cooker 5 Litre...',
              unit: '1 pc',
              price: 2489,
              originalPrice: 3570,
              discount: '30%',
              img: 'https://cdn.zeptonow.com/production/ik-seo/tr:w-350,ar-2399-2399,pr-true,f-auto,q-80/cms/product_variant/6ca3cc43-e285-4184-a3f8-2d9ee717f096/Classic-Essentials-Prochef-Isi-Certified-5l-Inner-Lid-Induction-Bottom-Steel-Pressure-Cooker.jpg',
            },
          ].map((item, index) => (
            <Link to="/kitchen-dining" className="product-link" key={index}>
              <div className="me-3 accessory-card" style={{ minWidth: '140px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute', top: '0', left: '0',
                    background: '#7e22ce', color: '#fff',
                    fontSize: '11px', padding: '2px 6px',
                    borderTopLeftRadius: '6px', borderBottomRightRadius: '6px', zIndex: 1
                  }}>{item.discount} Off</span>
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="mt-2">
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#777' }}>{item.unit}</div>
                  <div className="d-flex align-items-center justify-content-between mt-1">
                    <div>
                      <strong>₹{item.price}</strong>{' '}
                      <small style={{ textDecoration: 'line-through', color: '#999' }}>
                        ₹{item.originalPrice}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="how-it-works-section text-center mt-5">
        <h3 className="fw-bold mb-4">How it Works</h3>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          {/* Card 1 */}
          <div className="p-4 rounded shadow-sm bg-white" style={{ width: '280px' }}>
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.70.0/images/pdp/place-order.svg" alt="Open the app" className="mb-3" style={{ height: '80px' }} />
            <h5 className="fw-bold">Open the app</h5>
            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
              Choose from over 7000 products across groceries, fresh fruits & veggies, meat, pet care, beauty items & more
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-4 rounded shadow-sm bg-white" style={{ width: '280px' }}>
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.70.0/images/pdp/do-not-blink.svg" alt="Place an order" className="mb-3" style={{ height: '80px' }} />
            <h5 className="fw-bold">Place an order</h5>
            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
              Add your favourite items to the cart & avail the best offers
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-4 rounded shadow-sm bg-white" style={{ width: '280px' }}>
            <img src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/12.70.0/images/pdp/enjoy.svg" alt="Get free delivery" className="mb-3" style={{ height: '80px' }} />
            <h5 className="fw-bold">Get free delivery</h5>
            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
              Experience lightning-fast speed & get all your items delivered in 10 minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsBanner;