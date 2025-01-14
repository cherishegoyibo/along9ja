import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const user = new mongoose.Schema({
    google_id : { type: String},
    name: { type: String, required: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 15 },
    isGoogleUser: { type: Boolean, default: false },
    profilePic: { type: String, default: "" },  
    createdAt: { type: Date, default: Date.now },
})

user.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });

  user.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

const User = mongoose.model('User', user);

const Waypoint = new mongoose.Schema({
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    instruction: { type: String, required: false }
  });
  
  const route = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    waypoints: [Waypoint]
  });
  

const Route = mongoose.model('Route', route);


export { User, Route };