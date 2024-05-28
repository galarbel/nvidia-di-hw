import mongoose, { Document, Schema } from 'mongoose';

export interface Mnf extends Document {
  _id: mongoose.Types.ObjectId;
  PN: string;
  SN: string;
  TEST_TYPE: string;
  PASS: 0 | 1;
  TEST_DATE: Date;
}

const MnfSchema = new Schema<Mnf>({
  PN: {
    type: String,
    required: true
  },
  SN: {
    type: String,
    required: true
  },
  TEST_TYPE: {
    type: String,
    required: true
  },
  PASS: {
    type: Number,
    required: true
  },
  TEST_DATE: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { collection: 'mnf_data' });

export default mongoose.model<Mnf>('Mnf', MnfSchema);