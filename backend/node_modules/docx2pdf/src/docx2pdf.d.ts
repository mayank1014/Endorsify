declare module "docx2pdf" {
  function docx2pdf (fpIn: string): Promise<Readable>;
  export default docx2pdf;
}
