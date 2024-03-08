const mongoose = require('mongoose');
const { Schema } = mongoose;

const Page = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    slug: {
      type: String,
      required: true,
    },
    content: Object,
    user_id: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
    
);

export default mongoose.model('Pages', Page);
