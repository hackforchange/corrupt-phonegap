var corrupt = (function (corrupt) {

    var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 

    // Wait for PhoneGap to connect with the device
    //
   corrupt.onLoad = function onLoad() {
        document.addEventListener("deviceready",onDeviceReady,false);
    }

    // PhoneGap is ready to be used!
    //
    corrupt.onDeviceReady = function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    corrupt.onPhotoDataSuccess = function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('image-data');

      // Unhide image elements
      //
      //smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.value = "data:image/jpeg;base64," + imageData;
    }

    // Called when a photo is successfully retrieved
    //
    corrupt.onPhotoURISuccess = function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage');

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    corrupt.capturePhoto = function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(corrupt.onPhotoDataSuccess, corrupt.onFail, { quality: 50 });
    }

    // A button will call this function
    //
    corrupt.capturePhotoEdit = function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(corrupt.onPhotoDataSuccess, corrupt.onFail, { quality: 20, allowEdit: true }); 
    }

    // A button will call this function
    //
    corrupt.getPhoto = function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(corrupt.onPhotoURISuccess, corrupt.onFail, { quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    // 
    corrupt.onFail = function onFail(mesage) {
      alert('Failed because: ' + message);
    }
    return corrupt;
})(corrupt || {});
