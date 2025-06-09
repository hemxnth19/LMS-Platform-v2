import mongoose, { Schema } from 'mongoose';

export interface ITraining extends mongoose.Document {
  title: string;
  description: string;
  instructor: string;
  startDate: Date;
  endDate: Date;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'workshop' | 'seminar' | 'certification' | 'other';
  prerequisites?: string[];
  materials?: string[];
  participants: mongoose.Types.ObjectId[];
  createdBy: mongoose.Types.ObjectId;
  enrolledParticipants: Array<{
    participant: mongoose.Types.ObjectId;
    status: 'registered' | 'attended' | 'completed' | 'cancelled';
    registeredAt: Date;
  }>;
}

const trainingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  type: {
    type: String,
    enum: ['workshop', 'seminar', 'certification', 'other'],
    required: true
  },
  prerequisites: [{
    type: String,
    trim: true
  }],
  materials: [{
    type: String,
    trim: true
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrolledParticipants: [{
    participant: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'completed', 'cancelled'],
      default: 'registered'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Add validation to ensure endDate is after startDate
trainingSchema.pre('save', function(next) {
  if (this.endDate <= this.startDate) {
    next(new Error('End date must be after start date'));
  }
  next();
});

// Add index for better query performance
trainingSchema.index({ startDate: 1, status: 1 });
trainingSchema.index({ type: 1 });

export const Training = mongoose.model<ITraining>('Training', trainingSchema); 