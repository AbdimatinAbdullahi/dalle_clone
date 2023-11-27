import mongoose from 'mongoose';

const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        // Throw the error to be caught by the calling code
        throw error;
    });
};

export default connectDB;
