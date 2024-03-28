import React, { useEffect } from 'react';
import DocViewer, {DocViewerRenderers} from '@cyntler/react-doc-viewer';
import axios from 'axios';

const ViewDocs = () => {

    const docs = [
        {
            uri: "https://res.cloudinary.com/djhsk7akn/raw/upload/v1711549562/nvcxepnpctojmuvhgsip.docx",
            fileType: "docx",
            fileName: "..."
        }
      ];

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('http://localhost:8000/download/docx');
    //         docs[0].uri = response.data;
    //         console.log(response.data)
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
   
    //     fetchData();
    //   }, []);


  return (
    <div>
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} 
            style={{height: "100vh", width: "auto", marginLeft: "200px", marginRight: "200px"}}
        />
    </div>
  );
};


export default ViewDocs;



