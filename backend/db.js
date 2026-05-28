const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI;

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Schemas & Models for MongoDB
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  paymentId: { type: String, required: true },
  shippingDetails: { type: Object, default: {} },
  user: { type: Object, default: {} },
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true },
  source: { type: String, default: 'footer' },
  createdAt: { type: Date, default: Date.now }
});

let User, Order, Contact, Newsletter;

if (MONGODB_URI) {
  User = mongoose.model('User', UserSchema);
  Order = mongoose.model('Order', OrderSchema);
  Contact = mongoose.model('Contact', ContactSchema);
  Newsletter = mongoose.model('Newsletter', NewsletterSchema);
}

// Connection function
async function connectDB() {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB Connected successfully!');
    } catch (err) {
      console.error('MongoDB connection error, falling back to local JSON database:', err);
    }
  } else {
    console.log('No MONGODB_URI environment variable detected. Running with local JSON database.');
  }
}

// File fallback helpers
function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.error(`Error reading JSON file ${filename}:`, err);
    return [];
  }
}

function writeJSON(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing JSON file ${filename}:`, err);
  }
}

// Unified Database API
const db = {
  connectDB,
  
  // Users
  async saveUser(userData) {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      const user = new User(userData);
      return await user.save();
    } else {
      const users = readJSON('users.json');
      const newUser = {
        _id: `usr_${Date.now()}`,
        ...userData,
        createdAt: new Date()
      };
      users.push(newUser);
      writeJSON('users.json', users);
      return newUser;
    }
  },

  async getUserByEmailOrPhone(email, phone) {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      return await User.findOne({
        $or: [
          { email: email || 'never_match_default' },
          { phone: phone || 'never_match_default' }
        ]
      });
    } else {
      const users = readJSON('users.json');
      return users.find(u => (email && u.email === email) || (phone && u.phone === phone)) || null;
    }
  },

  async getAllUsers() {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      return await User.find({});
    } else {
      return readJSON('users.json');
    }
  },

  // Orders
  async saveOrder(orderData) {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      const order = new Order(orderData);
      return await order.save();
    } else {
      const orders = readJSON('orders.json');
      const newOrder = {
        _id: `ord_${Date.now()}`,
        status: 'Processing',
        ...orderData,
        createdAt: new Date()
      };
      orders.push(newOrder);
      writeJSON('orders.json', orders);
      return newOrder;
    }
  },

  async getAllOrders() {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      return await Order.find({});
    } else {
      return readJSON('orders.json');
    }
  },

  // Contacts
  async saveContact(contactData) {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      const contact = new Contact(contactData);
      return await contact.save();
    } else {
      const contacts = readJSON('contacts.json');
      const newContact = {
        _id: `con_${Date.now()}`,
        ...contactData,
        createdAt: new Date()
      };
      contacts.push(newContact);
      writeJSON('contacts.json', contacts);
      return newContact;
    }
  },

  async getAllContacts() {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      return await Contact.find({});
    } else {
      return readJSON('contacts.json');
    }
  },

  // Newsletters
  async saveNewsletter(newsletterData) {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      const newsletter = new Newsletter(newsletterData);
      return await newsletter.save();
    } else {
      const newsletters = readJSON('newsletters.json');
      const newNewsletter = {
        _id: `news_${Date.now()}`,
        ...newsletterData,
        createdAt: new Date()
      };
      newsletters.push(newNewsletter);
      writeJSON('newsletters.json', newsletters);
      return newNewsletter;
    }
  },

  async getAllNewsletters() {
    if (MONGODB_URI && mongoose.connection.readyState === 1) {
      return await Newsletter.find({});
    } else {
      return readJSON('newsletters.json');
    }
  }
};

module.exports = db;
