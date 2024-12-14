import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });

  await mongoose.connect(`${process.env.MongoDB_URL}/e-commerce`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
