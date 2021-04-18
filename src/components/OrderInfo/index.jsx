// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();
// Create a reference to the file we want to download
var starsRef = storageRef.child('logo-055.jpg');

// Get the download URL
starsRef.getDownloadURL().then(function(url) {

    // This can be downloaded directly:
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
      var fileName = starsRef.name //if you have the fileName header available
      var link=document.createElement('a');
      link.href=window.URL.createObjectURL(blob);
      link.download=fileName;
      link.click();
    };
    // xhr.open('GET', url);
    // xhr.send();
}).catch(function(error) {

  switch (error.code) {
    case 'storage/object-not-found':
      console.log("File doesn't exist")
      break;

    case 'storage/unauthorized':
      console.log("User doesn't have permission to access the object")
      break;

    case 'storage/canceled':
      console.log("User canceled the upload")
      break;

    case 'storage/unknown':
      console.log("Unknown error occurred, inspect the server response")
      break;
  }
});
