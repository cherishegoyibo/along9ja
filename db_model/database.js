import mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 3, maxlength: 15 },
    createdAt: { type: Date, default: Date.now },
})

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