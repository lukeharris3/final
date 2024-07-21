const pool = require('./db');

const seed = async () => {
  try {
    await pool.query('INSERT INTO brands (name) VALUES ($1)', ['Taylormade']);
    await pool.query('INSERT INTO brands (name) VALUES ($1)', ['Titleist']);
    await pool.query('INSERT INTO brands (name) VALUES ($1)', ['Scotty Cameron']);
    await pool.query('INSERT INTO brands (name) VALUES ($1)', ['Callaway']);
    await pool.query('INSERT INTO brands (name) VALUES ($1)', ['Odyssey']);

    await pool.query('INSERT INTO golfcourses (name, address, phone, description, price_for_9, price_for_18, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    ['Alpine CC', '5000 West Country Club Lane, Highland, UT 84003', '(801) 322-3971', 'Alpine Country Club is no doubt a golfers club. Our membership and golf staff have a shared passion for the game...', 75.00, 125.00, 'https://lh3.googleusercontent.com/p/AF1QipNfS0lSDBuT2BXNe_zkk-u_v5Ab13cgqguH5hbH=w1200-h630-p-k-no-nu']);

    // Add more golf courses...

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database', err);
  } finally {
    pool.end();
  }
};

seed();
