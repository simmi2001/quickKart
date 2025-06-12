import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';

const sampleProducts = [
  {
    name: 'Fresh Bananas',
    category: 'fruits',
    price: 2.99,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh, ripe bananas perfect for snacking or smoothies',
    stock: 50
  },
  {
    name: 'Red Apples',
    category: 'fruits',
    price: 3.49,
    image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Crisp and sweet red apples, great for eating fresh',
    stock: 30
  },
  {
    name: 'Fresh Spinach',
    category: 'vegetables',
    price: 2.49,
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh organic spinach leaves, perfect for salads',
    stock: 25
  },
  {
    name: 'Carrots',
    category: 'vegetables',
    price: 1.99,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh orange carrots, great for cooking and snacking',
    stock: 40
  },
  {
    name: 'Whole Milk',
    category: 'dairy',
    price: 3.99,
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh whole milk, 1 gallon',
    stock: 20
  },
  {
    name: 'Greek Yogurt',
    category: 'dairy',
    price: 4.99,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Creamy Greek yogurt, high in protein',
    stock: 15
  },
  {
    name: 'Potato Chips',
    category: 'snacks',
    price: 2.99,
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Crispy potato chips, original flavor',
    stock: 35
  },
  {
    name: 'Mixed Nuts',
    category: 'snacks',
    price: 6.99,
    image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium mixed nuts, perfect for snacking',
    stock: 20
  },
  {
    name: 'Orange Juice',
    category: 'beverages',
    price: 4.49,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh squeezed orange juice, 100% pure',
    stock: 18
  },
  {
    name: 'Sparkling Water',
    category: 'beverages',
    price: 1.99,
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Refreshing sparkling water, naturally flavored',
    stock: 45
  },
  {
    name: 'Whole Wheat Bread',
    category: 'bakery',
    price: 2.79,
    image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh baked whole wheat bread loaf',
    stock: 12
  },
  {
    name: 'Croissants',
    category: 'bakery',
    price: 5.99,
    image: 'https://images.pexels.com/photos/2135/food-france-morning-breakfast.jpg?auto=compress&cs=tinysrgb&w=400',
    description: 'Buttery, flaky croissants - pack of 6',
    stock: 8
  },
  {
    name: 'Chicken Breast',
    category: 'meat',
    price: 8.99,
    image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh boneless chicken breast, 1 lb',
    stock: 22
  },
  {
    name: 'Ground Beef',
    category: 'meat',
    price: 7.99,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh ground beef, 80/20 lean, 1 lb',
    stock: 18
  },
  {
    name: 'Pasta',
    category: 'other',
    price: 1.49,
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium pasta, various shapes available',
    stock: 60
  },
  {
    name: 'Rice',
    category: 'other',
    price: 3.99,
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Long grain white rice, 2 lb bag',
    stock: 30
  }
];

export const seedDatabase = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@quickkart.com' });
    
    if (!existingAdmin) {
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const admin = new Admin({
        email: 'admin@quickkart.com',
        password: hashedPassword
      });
      await admin.save();
      console.log('✅ Admin user created');
    }

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts === 0) {
      // Create sample products
      await Product.insertMany(sampleProducts);
      console.log('✅ Sample products created');
    }

    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
};