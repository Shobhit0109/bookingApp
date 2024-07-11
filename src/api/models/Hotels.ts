import mongoose from 'mongoose';

// const { Schema } = mongoose;

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  photos: {
    type: [String],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  rooms: {
    type: [String],
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Hotel', HotelSchema);

// body for api testing
/*
{
  "name": "Hotel Name",
  "type": "Hotel Type",
  "city": "City",
  "address": "Address",
  "distance": 10,
  "photos": ["Photo 1", "Photo 2"],
  "description": "Description",
  "rating": 4,
  "rooms": ["Room 1", "Room 2"],
  "cheapestPrice": 100,
  "featured": true
}
*/
