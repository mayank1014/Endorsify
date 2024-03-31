import React from 'react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useLocation } from 'react-router-dom';

const ViewDocs = () => {
  const location = useLocation();

    if (!location.state || !location.state.documentUrl) {
        return <div>No document URL provided.</div>;
    }

    const docs = [
        {
            uri: location.state.documentUrl,
            fileType: 'docx',
            fileName: 'Document'
        }
    ];

    return (
        <div>
            <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}
                style={{ height: "100vh", width: "auto", marginLeft: "200px", marginRight: "200px" }}
            />
        </div>
    );
};

export default ViewDocs;
