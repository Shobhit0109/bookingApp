import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    maxPeople: {
      type: Number,
      required: true,
      min: 1,
    },
    roomNumbers: [
      {
        number: {
          type: Number,
          required: true,
          min: 0,
        },
        unavailableDates: { type: [Date] },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Room', RoomSchema);
