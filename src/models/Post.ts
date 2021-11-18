import mongoose, { Schema } from 'mongoose';
import { v4 } from 'uuid';

const PostSchema = new Schema({
	_id: {
		type: String,
		default: () => {
			return v4();
		},
	},
	body: {
		type: String,
		required: true,
	},

	title: {
		type: String,
		required: true,
	},
	author_id: { type: String, ref: 'User' },
	tags: [String],
});

export default mongoose.model('Post', PostSchema);
