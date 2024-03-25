"use strict";

var docxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
var docxmContentType = "application/vnd.ms-word.document.macroEnabled.main+xml";
var dotxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml";
var dotmContentType = "application/vnd.ms-word.template.macroEnabledTemplate.main+xml";
var headerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml";
var footnotesContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml";
var commentsContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml";
var footerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml";
var pptxContentType = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
var pptxSlideMaster = "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml";
var pptxSlideLayout = "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml";
var pptxPresentationContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
var main = [docxContentType, docxmContentType, dotxContentType, dotmContentType];
var filetypes = {
  main: main,
  docx: [headerContentType].concat(main, [footerContentType, footnotesContentType, commentsContentType]),
  pptx: [pptxContentType, pptxSlideMaster, pptxSlideLayout, pptxPresentationContentType]
};
module.exports = filetypes;