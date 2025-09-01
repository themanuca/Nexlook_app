import {Cloudinary} from '@cloudinary/url-gen';

const cloudinaryConfig = new Cloudinary({
  cloud: {
    cloudName: 'seu-cloud-name' // substitua pelo seu cloud_name
  },
  url: {
    secure: true
  }
});

export default cloudinaryConfig;
