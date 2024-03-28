import React, { useState } from 'react';
import axios from 'axios';

const UploadDocs = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Endorsify');
      formData.append('cloud_name', 'djhsk7akn');

      const response = axios.post(
        'https://api.cloudinary.com/v1_1/djhsk7akn/raw/upload',
        formData
      ).then((response) => {
        console.log('Public URL:', response.data.secure_url);
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>Upload File to Cloudinary</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadDocs;
