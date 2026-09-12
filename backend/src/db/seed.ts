import bcrypt from "bcryptjs";
import { pool } from "../config/db";

async function seed() {
  console.log("Starting database seed script for Serendib Adventures...");

  try {
    // 1. Create tables if not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password_hash VARCHAR(256) NOT NULL,
        role VARCHAR(32) DEFAULT 'admin',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(64) PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        subtitle VARCHAR(256),
        description TEXT,
        image VARCHAR(512),
        badge VARCHAR(64),
        count VARCHAR(64)
      );

      CREATE TABLE IF NOT EXISTS destinations (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        district VARCHAR(128),
        region VARCHAR(256),
        description TEXT,
        overview TEXT,
        tours_count VARCHAR(64),
        image VARCHAR(512),
        best_time_to_visit VARCHAR(128),
        highlights JSONB
      );

      CREATE TABLE IF NOT EXISTS tours (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(128) UNIQUE NOT NULL,
        title VARCHAR(256) NOT NULL,
        location VARCHAR(128),
        category VARCHAR(128),
        category_id VARCHAR(64) REFERENCES categories(id) ON DELETE SET NULL,
        destination_id VARCHAR(64) REFERENCES destinations(id) ON DELETE SET NULL,
        image VARCHAR(512),
        duration VARCHAR(64),
        difficulty VARCHAR(64),
        rating NUMERIC(3, 2) DEFAULT 4.9,
        reviews_count INT DEFAULT 0,
        price INT NOT NULL,
        old_price INT,
        badge VARCHAR(64),
        featured BOOLEAN DEFAULT FALSE,
        group_size VARCHAR(64),
        overview TEXT,
        highlights JSONB,
        included JSONB,
        to_bring JSONB,
        itinerary JSONB,
        gallery JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR(64) PRIMARY KEY,
        full_name VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        phone VARCHAR(64) NOT NULL,
        tour_id VARCHAR(64) REFERENCES tours(id) ON DELETE CASCADE,
        tour_title VARCHAR(256),
        preferred_date VARCHAR(64),
        guests_count INT DEFAULT 2,
        notes TEXT,
        status VARCHAR(32) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(128) NOT NULL,
        country VARCHAR(128),
        initials VARCHAR(8),
        trip VARCHAR(128),
        rating INT DEFAULT 5,
        comment TEXT NOT NULL,
        approved BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create Default Admin User
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, role)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE SET password_hash = $4`,
      ["user-admin-1", "Serendib Admin", "admin@serendibadventures.com", hashedPassword, "admin"]
    );
    console.log("✔ Admin User Created: admin@serendibadventures.com / admin123");

    // 3. Insert Categories
    const categoriesData = [
      ["white-water-rafting", "White Water Rafting", "Read the river. Ride the wild.", "Grade 3-4 rapids along Kelani River in Kitulgala.", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", "Most Popular", "12 Tours"],
      ["canyoning", "Jungle Canyoning", "Into the rainforest gorge.", "Natural rock slides, canyon jumps, and stream scrambling.", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", null, "8 Tours"],
      ["jungle-trekking", "Rainforest Trekking", "Follow the living forest.", "Guided jungle trails in Kitulgala, Sinharaja, and Knuckles.", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", null, "15 Tours"],
      ["waterfall-abseiling", "Waterfall Abseiling", "Step over the edge.", "Descend spectacular water drops with certified rigging.", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", null, "6 Tours"],
      ["camping-nature", "Camping & Nature", "Stay where the wild begins.", "Riverside glamping and luxury wilderness camping.", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", null, "10 Tours"],
      ["cultural-safari", "Safari & Heritage", "Wild kingdom & ancient roots.", "Leopard tracking in Yala and Sigiriya rock fortress expeditions.", "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800", null, "20 Tours"]
    ];

    for (const c of categoriesData) {
      await pool.query(
        `INSERT INTO categories (id, title, subtitle, description, image, badge, count)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE SET title = $2, image = $5`,
        c
      );
    }
    console.log("✔ Categories Seeded");

    // 4. Insert Destinations
    const destinationsData = [
      ["kitulgala", "Kitulgala", "Kegalle", "Sabragamuwa Rainforest", "Wild rivers and deep rainforest at Sri Lanka’s adventure capital.", "Kitulgala is the premier outdoor adventure sanctuary of Sri Lanka.", "12 Adventure Tours", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", "October to April", JSON.stringify(["Grade 3 & 4 White Water Rafting", "Jungle Canyoning", "Waterfall Abseiling"])],
      ["sigiriya", "Sigiriya", "Matale", "Cultural Triangle", "Ancient 5th-century sky fortress atop a 200m monolithic rock.", "Sigiriya Lion Rock is a UNESCO World Heritage site.", "18 Heritage Tours", "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800", "December to April", JSON.stringify(["Lion Rock Summit", "Pidurangala Sunrise Hike", "Elephant Gathering Safari"])],
      ["ella", "Ella", "Badulla", "Central Highlands", "Cloud forests, mountain gaps, Nine Arch Bridge, and tea estates.", "Ella is a high-altitude mountain haven.", "22 Highland Tours", "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800", "January to March", JSON.stringify(["Nine Arch Demodara Bridge", "Little Adam's Peak Summit", "Scenic Blue Train"])],
      ["yala", "Yala", "Hambantota", "South Coast Wildlands", "Sri Lanka's premier wildlife national park with wild leopards and elephants.", "Yala holds the world's highest density of wild leopards.", "20 Wildlife Safaris", "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800", "February to July", JSON.stringify(["4x4 Leopard Jeep Safari", "Wild Elephants", "Coastal Lagoon Birding"])]
    ];

    for (const d of destinationsData) {
      await pool.query(
        `INSERT INTO destinations (id, name, district, region, description, overview, tours_count, image, best_time_to_visit, highlights)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET name = $2, image = $8`,
        d
      );
    }
    console.log("✔ Destinations Seeded");

    // 5. Insert Sample Tours
    const toursData = [
      [
        "kitulgala-white-water-rafting",
        "kitulgala-white-water-rafting",
        "Kitulgala White Water Rafting Expedition",
        "Kitulgala, Sabaragamuwa",
        "White Water Rafting",
        "white-water-rafting",
        "kitulgala",
        "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800",
        "3 hours",
        "Moderate",
        4.9,
        142,
        65,
        80,
        "Best Seller",
        true,
        "2 - 8 People",
        "Conquer 5 major rapids and 4 minor rapids on the historic Kelani River.",
        JSON.stringify(["5 Grade 3/4 Rapids", "Full Safety Equipment", "Buffet Lunch Included"]),
        JSON.stringify(["Rafting Guide", "Helmets & Vests", "Buffet Lunch"]),
        JSON.stringify(["Quick-dry Clothes", "Water Shoes", "Towel"]),
        JSON.stringify([{ time: "09:00 AM", title: "Safety Briefing", desc: "Equipment fitting & instructions." }]),
        JSON.stringify(["https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=800"])
      ],
      [
        "sigiriya-rock-pidurangala-heritage-tour",
        "sigiriya-rock-pidurangala-heritage-tour",
        "Sigiriya Lion Rock Fortress & Pidurangala Sunrise Expedition",
        "Sigiriya, Central Province",
        "Safari & Heritage",
        "cultural-safari",
        "sigiriya",
        "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800",
        "Full day",
        "Moderate",
        4.9,
        184,
        110,
        135,
        "UNESCO Classic",
        true,
        "1 - 12 People",
        "Climb King Kasyapa's ancient 5th-century sky palace.",
        JSON.stringify(["Sigiriya 1,200 step climb", "Ancient Frescoes", "Pidurangala Sunrise Hike"]),
        JSON.stringify(["Sigiriya Ticket", "Pidurangala Ticket", "Village Lunch"]),
        JSON.stringify(["Walking Shoes", "Hat & Sunscreen", "Camera"]),
        JSON.stringify([{ time: "05:00 AM", title: "Sunrise Climb", desc: "Ascend Pidurangala rock." }]),
        JSON.stringify(["https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?q=80&w=800"])
      ]
    ];

    for (const t of toursData) {
      await pool.query(
        `INSERT INTO tours (
          id, slug, title, location, category, category_id, destination_id, image, duration, difficulty,
          rating, reviews_count, price, old_price, badge, featured, group_size, overview, highlights, included, to_bring, itinerary, gallery
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)
        ON CONFLICT (id) DO UPDATE SET title = $3, price = $13`,
        t
      );
    }
    console.log("✔ Tours Seeded");

    console.log("🎉 Database seeding finished successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

seed();
