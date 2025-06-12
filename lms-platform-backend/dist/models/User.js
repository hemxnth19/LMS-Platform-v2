"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    position: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true,
        validate: {
            validator: function (v) {
                return ['admin', 'employee'].includes(v);
            },
            message: props => `${props.value} is not a valid role!`
        }
    },
    status: {
        type: String,
        enum: ['active', 'revoked'],
        default: 'active'
    },
    enrolledCourses: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Course'
        }],
    completedCourses: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Course'
        }]
}, {
    timestamps: true,
});
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    try {
        const salt = await bcryptjs_1.default.genSalt(10);
        this.password = await bcryptjs_1.default.hash(this.password, salt);
        next();
    }
    catch (error) {
        next(error);
    }
});
// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcryptjs_1.default.compare(candidatePassword, this.password);
};
exports.User = mongoose_1.default.model('User', userSchema);
