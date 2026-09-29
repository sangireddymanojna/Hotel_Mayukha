export interface MenuCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  icon?: string;
}

export interface MenuItem {
  _id: string;
  name: string;
  slug: string;
  categoryId: string | MenuCategory;
  price: number;
  description: string;
  isVeg: boolean;
  spiceLevel: number; // 0, 1, 2, 3
  isAvailable: boolean;
  isChefSpecial: boolean;
  image: string;
  allergenInfo: string[];
  tags: string[];
  preparationTimeMinutes?: number;
}

export interface Reservation {
  _id?: string;
  bookingId: string;
  customerName: string;
  phone: string;
  email: string;
  guestCount: number;
  date: string;
  timeSlot: string;
  branch: 'KPHB Main Branch' | 'Kokapet Branch' | 'Miyapur Branch';
  seatingPreference: 'Standard' | 'Aqua Theme Section' | 'Jungle Theme Section' | 'Family Dining Hall' | 'Private Dining Room';
  status: 'Pending' | 'Confirmed' | 'Seated' | 'Completed' | 'Cancelled';
  specialRequests?: string;
  createdAt?: string;
}

export interface BanquetEnquiry {
  _id?: string;
  enquiryId: string;
  organizerName: string;
  phone: string;
  email: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  preferredLocation: string;
  budgetPerPlate?: string;
  customMenuRequirements?: string;
  status: 'Pending' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Cancelled';
  createdAt?: string;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  visitType: string;
  branch: string;
  isFeatured: boolean;
  createdAt?: string;
}

export interface DashboardStats {
  summary: {
    totalReservations: number;
    todayReservations: number;
    pendingReservations: number;
    totalBanquets: number;
    pendingBanquets: number;
    totalMenuItems: number;
    activeMenuItems: number;
  };
  recentReservations: Reservation[];
  recentBanquets: BanquetEnquiry[];
}
