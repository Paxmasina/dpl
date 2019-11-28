const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    cb(null, true);
  else
    cb(new Error('Format fotografije nije validan. Mogu se koristiti samo jpeg i png formati.'), false); 
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = (app) => {
    app.post('/register',
      AuthenticationControllerPolicy.register,
      AuthenticationController.register)
    app.post('/login',
      AuthenticationController.login),
    app.post('/admin',
      upload.single('travelImage'),
      AuthenticationController.createTravel)
    app.get('/catalogue',
      AuthenticationController.getTravels)
    app.post('/catalogue',
      AuthenticationController.registerForTravel)
    app.post('/mytravels',
      AuthenticationController.getUserTravels)
    app.post('/catalogueAdmin',
      AuthenticationController.deleteTravel)
    app.post('/mytravelsCancel',
      AuthenticationController.cancelTravel)
    app.post('/update',
      AuthenticationController.updateTravel)
    app.post('/updateImg',
      upload.single('travelImage'),
      AuthenticationController.updateTravelImage)
}