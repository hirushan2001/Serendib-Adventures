/**
 * Represents a Tour / Adventure Package in Serendib Adventures
 */
export interface Tour {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  categoryId: string;
  destinationId: string;
  image: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Active" | "Challenging";
  rating: number;
  reviewsCount: number;
  price: number;
  oldPrice?: number;
  badge?: string;
  featured?: boolean;
  groupSize?: string;
  overview?: string;
  highlights?: string[];
  included?: string[];
  toBring?: string[];
  itinerary?: { time: string; title: string; desc: string }[];
  gallery?: string[];
  viatorUrl?: string;
  tripAdvisorUrl?: string;
  viatorProductCode?: string;
  tripAdvisorRef?: string;
  freeCancellation?: boolean;
  instantConfirmation?: boolean;
  comboActivities?: string[];
}

/**
 * Represents a Sri Lankan Destination (e.g. Kitulgala, Sigiriya, Ella, Yala)
 */
export interface Destination {
  id: string;
  name: string;
  district?: string;
  region: string;
  description: string;
  overview?: string;
  toursCount: string;
  image: string;
  bestTimeToVisit?: string;
  highlights?: string[];
  gallery?: string[];
  size?: string;
}

/**
 * Represents an Activity Category (e.g. White Water Rafting, Jungle Canyoning)
 */
export interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge?: string;
  count?: string;
  className?: string;
}

/**
 * Represents a Guest Review or Verified Journal Entry
 */
export interface Review {
  id: string;
  name: string;
  country: string;
  avatar?: string;
  initials: string;
  rating: number;
  trip: string;
  comment: string;
  date: string;
  sourceBadge?: "TripAdvisor Verified" | "Viator Verified" | "Direct Guest";
}

/**
 * Represents a Booking Inquiry Form Payload
 */
export interface BookingInquiry {
  fullName: string;
  email: string;
  phone: string;
  adventureSlug: string;
  preferredDate: string;
  guestsCount: number;
  notes?: string;
}
