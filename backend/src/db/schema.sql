-- PostgreSQL Database Schema for Serendib Adventures Sri Lanka

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
  status VARCHAR(32) DEFAULT 'pending', -- pending, confirmed, cancelled
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
