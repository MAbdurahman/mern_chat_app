const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_USERNAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET

});

exports = {
   cloudinary
}