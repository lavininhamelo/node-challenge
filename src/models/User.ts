import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

const UserSchema = new Schema(
	{
		_id: {
			type: String,
			default: () => {
				return v4();
			},
		},
		username: {
			type: String,
			required: true,
			min: 3,
			max: 20,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			// eslint-disable-next-line no-useless-escape
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
		},
		password: {
			type: String,
			min: 6,
		},
	},
	{ timestamps: true },
);

UserSchema.pre('save', async function hashPassword(next) {
	if (!this.isModified('password')) next();
	this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
	compareHash(hash) {
		return bcrypt.compare(hash, this.password);
	},

	generateToken() {
		return jwt.sign({ id: this.id }, 'secret', {
			expiresIn: 86400,
		});
	},
};

export default mongoose.model('User', UserSchema);
