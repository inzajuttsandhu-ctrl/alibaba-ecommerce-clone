const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  // Electronics - First 8 are the most important
  {
    title: 'Modern Flagship Smartphone',
    description: 'High-end smartphone with professional camera and fast processor.',
    price: 899.99,
    category: 'Electronics',
    imageURL: '/images/smartphone.png',
    brand: 'TechMaster',
    rating: 4.9
  },
  {
    title: 'GoPro Hero 10',
    description: 'The ultimate action camera with 5.3K video and advanced stabilization.',
    price: 399.00,
    category: 'Electronics',
    imageURL: '/images/gopro.png',
    brand: 'GoPro',
    rating: 5.0
  },
  {
    title: 'Noise Cancelling Headphones',
    description: 'Over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 199.5,
    category: 'Electronics',
    imageURL: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    brand: 'SoundBloom',
    rating: 4.9
  },
  {
    title: 'Sleek Gaming Laptop',
    description: 'Powerful gaming laptop with premium finishes and RGB lighting.',
    price: 1299.99,
    category: 'Electronics',
    imageURL: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    brand: 'TechMaster',
    rating: 4.8
  },
  {
    title: 'Premium Smartwatch',
    description: 'Advanced fitness features and sleek design in this high-end smartwatch.',
    price: 243.99,
    category: 'Electronics',
    imageURL: 'https://images.unsplash.com/photo-1542491595-62e93160a36e?w=500&q=80',
    brand: 'SoundBloom',
    rating: 4.7
  },
  {
    title: 'Smart Home Speaker',
    description: 'Voice-controlled speaker with rich sound and smart home integration.',
    price: 99.00,
    category: 'Electronics',
    imageURL: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80',
    brand: 'EchoTech',
    rating: 4.3
  },
  {
    title: '4K Ultra HD Monitor',
    description: 'Stunning 4K resolution with HDR support for a professional workspace.',
    price: 299.99,
    category: 'Electronics',
    imageURL: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=500&q=80',
    brand: 'ViewPro',
    rating: 4.8
  },
  {
    title: 'Wireless Earbuds',
    description: 'True wireless earbuds with clear sound and water resistance.',
    price: 129.00,
    category: 'Electronics',
    imageURL: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    brand: 'SoundBloom',
    rating: 4.5
  },
  // Home & Office - First 4 are important
  {
    title: 'Standing Desk Converter',
    description: 'Easily switch between sitting and standing while you work.',
    price: 189.99,
    category: 'Home & Office',
    imageURL: '/images/standing_desk.webp',
    brand: 'ComfortMax',
    rating: 4.6
  },
  {
    title: 'Bamboo Bookshelf',
    description: 'Eco-friendly bookshelf with 5 tiers of storage space.',
    price: 75.00,
    category: 'Home & Office',
    imageURL: '/images/bamboo_bookshelf.png',
    brand: 'MinimalCraft',
    rating: 4.4
  },
  {
    title: 'Kitchen Mixer Pro',
    description: 'Powerful stand mixer for all your baking and cooking needs.',
    price: 120.00,
    category: 'Home & Office',
    imageURL: '/images/kitchen_mixer.png',
    brand: 'KitchenKing',
    rating: 4.8
  },
  {
    title: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 minimalist ceramic mugs for your morning coffee.',
    price: 24.99,
    category: 'Home & Office',
    imageURL: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80',
    brand: 'MinimalCraft',
    rating: 4.9
  },
  {
    title: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support and adjustable height.',
    price: 159.0,
    category: 'Home & Office',
    imageURL: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80',
    brand: 'ComfortMax',
    rating: 4.5
  },
  {
    title: 'Modern Desk Lamp',
    description: 'Dimmable LED desk lamp with touch control and USB charging port.',
    price: 34.50,
    category: 'Home & Office',
    imageURL: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&q=80',
    brand: 'Lumina',
    rating: 4.4
  },
  {
    title: 'Soft Plush Sofa',
    description: 'Luxurious 3-seater sofa with premium upholstery.',
    price: 499.00,
    category: 'Home & Office',
    imageURL: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
    brand: 'ComfortMax',
    rating: 5.0
  },
  {
    title: 'Wall Art Canvas',
    description: 'Modern abstract canvas art for your home or office.',
    price: 45.00,
    category: 'Home & Office',
    imageURL: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=500&q=80',
    brand: 'Artisan',
    rating: 4.7
  }
];

const seedDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/alibaba-clone';
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded successfully with PERFECTLY MAPPED assets!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
