const mongoose = require('mongoose');
require('dotenv').config();
const { ROLES } = require('../../constants/roles');

// This migration ensures the 'publisher' role is properly handled in the User model

async function runMigration() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zjnnp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Get the User model
    const User = mongoose.model('User');

    // Update users with the publisher role to ensure they're valid
    const result = await User.updateMany(
      { role: 'publisher' },
      { $set: { role: ROLES.PUBLISHER } },
      { strict: false } // Allow updating even if role wasn't in the schema before
    );

    console.log(`Migration complete. Updated ${result.nModified} users with publisher role.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
