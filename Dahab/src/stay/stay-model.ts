import mongoose from "mongoose";
const RoomTypeSchema = new mongoose.Schema({
  _id: { type: String },
  name: String,
  size: String,
  beds: String,
  maxOccupancy: Number,
  price: Number,
  amenities: [String],
});

interface Stay {
  id: string;
  IdPage: string;
  type: string;
  name: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  images: string[];
  galleryImages: string[];
  badge: string;
  rating: string;
  totalReviews: number;
  location: string;
  locationDetails: {
    city: string;
    region: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    address: string;
    nearbyAttractions: {
      name: string;
      distance: string;
    }[];
  };
  checkInTime: string;
  checkOutTime: string;
  minStay: number;
  maxGuests: number;
  totalRooms: number;
  pricePerNight: number;
  currency: string;
  priceIncludes: string[];
  roomTypes: {
    name: string;
    size: string;
    beds: string;
    maxOccupancy: number;
    price: number;
    amenities: string[];
  }[];
  amenities: {
    general: string[];
    recreation: string[];
    wellness: string[];
    services: string[];
    dining: string[];
  };
  features: string[];
  policies: {
    cancellation: string;
    payment: string;
    children: string;
    pets: string;
    smoking: string;
    checkInFrom: string;
    checkInUntil: string;
    checkOut: string;
  };
  languages: string[];
  propertyType: string;
  starRating: number;
  yearBuilt: number;
  lastRenovated: number;
  href: string;
  bookingUrl: string;
}

export interface IStay {
  category: string;
  categoryId: string; // Not unique (fix for your error)
  description: string;
  stays: Stay[];
}

const StaySchema = new mongoose.Schema<Stay>({
  id: String,
  IdPage: String,
  type: String,
  name: String,
  subtitle: String,
  description: String,
  fullDescription: String,
  images: [String],
  galleryImages: [String],
  badge: String,
  rating: String,
  totalReviews: Number,
  location: String,
  locationDetails: {
    city: String,
    region: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    address: String,
    nearbyAttractions: [
      {
        name: String,
        distance: String,
      },
    ],
  },
  checkInTime: String,
  checkOutTime: String,
  minStay: Number,
  maxGuests: Number,
  totalRooms: Number,
  pricePerNight: Number,
  currency: String,
  priceIncludes: [String],
  roomTypes: [RoomTypeSchema],

  amenities: {
    general: [String],
    recreation: [String],
    wellness: [String],
    services: [String],
    dining: [String],
  },
  features: [String],
  policies: {
    cancellation: String,
    payment: String,
    children: String,
    pets: String,
    smoking: String,
    checkInFrom: String,
    checkInUntil: String,
    checkOut: String,
  },
  languages: [String],
  propertyType: String,
  starRating: Number,
  yearBuilt: Number,
  lastRenovated: Number,
  href: String,
  bookingUrl: String,
});

const StaysSchema = new mongoose.Schema<IStay>(
  {
    category: { type: String, required: true },
    categoryId: { type: String, required: true, unique: false }, // NOT UNIQUE (fix)
    description: { type: String, required: true },
    stays: { type: [StaySchema], required: true },
  },
  { timestamps: true }
);

export const Stay = mongoose.model<IStay>("Stay", StaysSchema, "stays");

// import mongoose from "mongoose";
// import { v4 as uuidv4 } from 'uuid';
// interface Stay {
//     id: string;
//     IdPage: string;
//     type: string;
//     name: string;
//     subtitle: string;
//     description: string;
//     fullDescription: string;
//     images: string[];
//     galleryImages: string[];
//     badge: string;
//     rating: string;
//     totalReviews: number;
//     location: string;
//     locationDetails: {
//         city: string;
//         region: string;
//         country: string;
//         coordinates: {
//             lat: number;
//             lng: number;
//         };
//         address: string;
//         nearbyAttractions: {
//             name: string;
//             distance: string;
//         }[];
//     };
//     checkInTime: string;
//     checkOutTime: string;
//     minStay: number;
//     maxGuests: number;
//     totalRooms: number;
//     pricePerNight: number;
//     currency: string;
//     priceIncludes: string[];
//     roomTypes: {
//         name: string;
//         size: string;
//         beds: string;
//         maxOccupancy: number;
//         price: number;
//         amenities: string[];
//     }[];
//     amenities: {
//         general: string[];
//         recreation: string[];
//         wellness: string[];
//         services: string[];
//         dining: string[];
//     };
//     features: string[];
//     policies: {
//         cancellation: string;
//         payment: string;
//         children: string;
//         pets: string;
//         smoking: string;
//         checkInFrom: string;
//         checkInUntil: string;
//         checkOut: string;
//     };
//     languages: string[];
//     propertyType: string;
//     starRating: number;
//     yearBuilt: number;
//     lastRenovated: number;
//     href: string;
//     bookingUrl: string;
// }

// export interface IStay {
//     category: string;
//     categoryId: string;
//     description: string;
//     stays: Stay[];
// }

// const StaySchema = new mongoose.Schema<Stay>({
//     id: { type: String, required: true },
//     IdPage: { type: String, required: true },
//     type: { type: String, required: true },
//     name: { type: String, required: true },
//     subtitle: { type: String, required: true },
//     description: { type: String, required: true },
//     fullDescription: { type: String, required: true },
//     images: { type: [String], required: true },
//     galleryImages: { type: [String], required: true },
//     badge: { type: String, required: true },
//     rating: { type: String, required: true },
//     totalReviews: { type: Number, required: true },
//     location: { type: String, required: true },
//     locationDetails: {
//         city: { type: String, required: true },
//         region: { type: String, required: true },
//         country: { type: String, required: true },
//         coordinates: {
//             lat: { type: Number, required: true },
//             lng: { type: Number, required: true },
//         },
//         address: { type: String, required: true },
//         nearbyAttractions: [
//             {
//                 name: { type: String, required: true },
//                 distance: { type: String, required: true },
//             },
//         ],
//     },
//     checkInTime: { type: String, required: true },
//     checkOutTime: { type: String, required: true },
//     minStay: { type: Number, required: true },
//     maxGuests: { type: Number, required: true },
//     totalRooms: { type: Number, required: true },
//     pricePerNight: { type: Number, required: true },
//     currency: { type: String, required: true },
//     priceIncludes: { type: [String], required: true },
//     roomTypes: [
//         {
//             name: { type: String, required: true },
//             size: { type: String, required: true },
//             beds: { type: String, required: true },
//             maxOccupancy: { type: Number, required: true },
//             price: { type: Number, required: true },
//             amenities: { type: [String], required: true },
//         },
//     ],
//     amenities: {
//         general: { type: [String], required: true },
//         recreation: { type: [String], required: true },
//         wellness: { type: [String], required: true },
//         services: { type: [String], required: true },
//         dining: { type: [String], required: true },
//     },
//     features: { type: [String], required: true },
//     policies: {
//         cancellation: { type: String, required: true },
//         payment: { type: String, required: true },
//         children: { type: String, required: true },
//         pets: { type: String, required: true },
//         smoking: { type: String, required: true },
//         checkInFrom: { type: String, required: true },
//         checkInUntil: { type: String, required: true },
//         checkOut: { type: String, required: true },
//     },
//     languages: { type: [String], required: true },
//     propertyType: { type: String, required: true },
//     starRating: { type: Number, required: true },
//     yearBuilt: { type: Number, required: true },
//     lastRenovated: { type: Number, required: true },
//     href: { type: String, required: true },
//     bookingUrl: { type: String, required: true },
// });

// const StaysSchema = new mongoose.Schema<IStay>({
//         category: { type: String, required: true },
//         categoryId: { type: String, required: true },
//         description: { type: String, required: true },
//         stays: { type: [StaySchema], required: true },
//     },
//     { timestamps: true }
// );

// export const Stay = mongoose.model<IStay>(
//     "Stay",
//     StaysSchema,
//     "stays"
// );
