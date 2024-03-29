import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import { useRef, useState } from 'react';

const UploadDocs = () => {
  const [isSignatureEmpty, setIsSignatureEmpty] = useState(true);
  const signatureCanvas = useRef();

  const saveSignature = () => {
    const signatureDataUrl = signatureCanvas.current.getTrimmedCanvas().toDataURL('image/png');

    // Prepare FormData object with signature image data and Cloudinary upload parameters
    const formData = new FormData();
    formData.append("file", signatureDataUrl);
    formData.append("upload_preset", "Endorsify"); // Replace 'Endorsify' with your Cloudinary upload preset name
    formData.append("cloud_name", "djhsk7akn"); // Replace 'djhsk7akn' with your Cloudinary cloud name

    // Send POST request to Cloudinary upload API endpoint
    axios.post(
      "https://api.cloudinary.com/v1_1/djhsk7akn/image/upload",
      formData
    ).then(response => {
      console.log('Cloudinary upload result:', response.data);
    }).catch(error => {
      console.error('Error uploading signature to Cloudinary:', error);
    });
  };

  const clearSignature = () => {
    signatureCanvas.current.clear();
    setIsSignatureEmpty(true);
  };

  const handleBeginDrawing = () => {
    setIsSignatureEmpty(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', maxWidth: '400px' }}>
      <SignatureCanvas
        ref={signatureCanvas}
        penColor="black"
        canvasProps={{
          width: 400,
          height: 200,
          className: 'signature-canvas',
          onMouseDown: handleBeginDrawing
        }}
      />
      <button onClick={saveSignature} disabled={isSignatureEmpty}>Save Signature</button>
      <button onClick={clearSignature}>Clear Signature</button>
    </div>
  );
};

export default UploadDocs;
