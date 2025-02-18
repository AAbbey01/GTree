function myFunction() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var cursor = doc.getCursor();
  var elem = body.insertParagraph(0,"Tree");
  elem.setHeading(DocumentApp.ParagraphHeading.HEADING1);
  var ixElement = body.getChildIndex(elem);
  //input a new function here: nextFolder, which will search through folders until no inside folders
  var rootFolder = DriveApp.getRootFolder();
  var count = 0;
  nextFolder(rootFolder,count,ixElement,body);
}
//root is a DriveApp..getFolders() iterator
function nextFolder(root,count,ixElement,body){
  //pass folder into function, first document the folder's name
  body.insertListItem(ixElement+1,root.getName().toString()).setNestingLevel(count).editAsText().setBackgroundColor("#808080");
  //now check if there are subfolders, and if so go through them
  var subfolders = root.getFolders();
  while(subfolders.hasNext()){
    nextFolder(subfolders.next(),count+1,ixElement+1,body);
  }
  //TODO: then check for file TYPE!!!!!!!!!
  //TODO: Fix ordering 
  var t = root.getFiles();
  while(t.hasNext()){
    var file_1 = t.next();
    var file_type = file_1.getMimeType();
    var color = file_color(file_type);
    var file_name = file_1.getName().toString();
    var q =body.insertListItem(ixElement+2,file_name).setNestingLevel(count+1);
    q.editAsText().setBackgroundColor(color);
  }
}

function file_color(type){
  if (type === "application/pdf") {
    return "#FF0000"; // Red for PDF files
  } else if (type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
             type === "application/vnd.google-apps.spreadsheet") {
    return "#00FF00"; // Green for Excel files
  } else if (type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"||
             type === "application/vnd.google-apps.document") {
    return "#c2e7ff"; // Blue for Word files
  } else if (type === "application/vnd.openxmlformats-officedocument.presentationml.presentation"||
             type === "application/vnd.google-apps.presentation") {
    return "#fff300"; // Blue for Presentation files
  }else if (type === "image/jpeg" || 
             type === "image/png" || 
             type === "image/gif" || 
             type === "image/bmp" || 
             type === "image/svg+xml" || 
             type === "image/tiff" || 
             type === "image/heic") {
    return "#da1ce7"; 
  } else {
    return "#FFFFFF"; 
  }
}





/**while(root.hasNext()){
    var insideFolder = DriveApp.getRootFolder().getName().toString();
    console.log(insideFolder);
    var insert = body.insertListItem(ixElement+count,insideFolder);
    insert.setNestingLevel(count);
    var b = root.next().getFolders();
    while(b.hasNext()){
      nextFolder(b,count+1,ixElement);
    }
  } */



// while(a.hasNext()){
  //   var t = body.insertListItem(ixElement+1+count,DriveApp.getRootFolder().getName().toString());
  //   //t.setNestingLevel(count);
  //   var b = a.next().getFolders();
  //   while(b.hasNext()){
  //     c = b.next().getName().toString();
  //     console.log(c);
  //     var q = body.insertListItem(ixElement+2,c);
  //     q.setNestingLevel(count+1);

  //   }

  // }

