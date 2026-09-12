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
}

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
}

export interface BookingInquiry {
  fullName: string;
  email: string;
  phone: string;
  adventureSlug: string;
  preferredDate: string;
  guestsCount: number;
  notes?: string;
}
