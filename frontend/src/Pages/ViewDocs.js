// import React, { useEffect } from 'react';
// import DocViewer, {DocViewerRenderers} from '@cyntler/react-doc-viewer';
// import axios from 'axios';


// const ViewDocs = () => {

//     const docs = [
//         {
//             uri: "",
//             fileType: "docx",
//             fileName: "demo.docx"
//         }
//       ];

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get('http://localhost:8000/api/docx');
//             docs[0].uri = response.data;
//           } catch (error) {
//             console.error('Error fetching data:', error);
//           }
//         };
   
//         fetchData();
//       }, []);


//   return (
//     <div>
//       <h1>LOR</h1>
//         <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} 
//             style={{height : 1000}}
//         />
//     </div>
//   );
// };


// export default ViewDocs;



