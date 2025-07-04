const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../../models/User');

async function runMigration() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zjnnp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Update all users with role 'author' to have null role
    const result = await User.updateMany(
      { role: 'author' },
      { $set: { role: null } }
    );

    console.log(`Migration complete. Updated ${result.nModified} users.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
