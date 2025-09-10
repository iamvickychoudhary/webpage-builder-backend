import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  id: String,
  type: String,
  content: mongoose.Schema.Types.Mixed,
  style: mongoose.Schema.Types.Mixed,
  children: [mongoose.Schema.Types.Mixed],
});

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  blocks: [blockSchema],
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Page', pageSchema);
