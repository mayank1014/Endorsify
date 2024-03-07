// DocxEditor.js
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Inject,
} from '@syncfusion/ej2-react-documenteditor';

const DocxEditor = ({ Content }) => {
let editorObj = DocumentEditorContainerComponent | null;

const onSave = () => {
  editorObj?.documentEditor.save("Sample", "Docx");
}

  return (
    <div>
      <h2>Docx Editor</h2>
      <button onClick={onSave}>Save</button>
      <DocumentEditorContainerComponent
        height="590"
        enableToolbar={true}
        ref={(ins => editorObj = ins)}
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
      >
        <Inject services={[Toolbar]} />
      </DocumentEditorContainerComponent>
    </div>
  );
};

export default DocxEditor;
