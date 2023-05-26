const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv')
const News = require("./router/News")
const Drinks = require("./router/Drinks")
const Bakery = require("./router/Bakerys")
const Snack = require("./router/Snacks")
const User = require("./router/Users")
const Category = require("./router/Category")
const Order = require("./router/Order")
const Roles = require("./router/Roles")
const Permission = require("./router/Permission")
const Auth = require("./router/Auth")



const multer = require('multer');


dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(cors())


const PORT = process.env.PORT || 5000;

// ROUTER
app.use("/drinks", Drinks)

app.use("/snack", Snack)

app.use("/bakery", Bakery)

app.use("/user", User)

app.use("/category", Category)

app.use("/news", News)

app.use("/order", Order)

app.use("/roles", Roles)

app.use("/permission", Permission)

app.use("/auth", Auth)


// Upload ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/') // thư mục lưu trữ ảnh được gửi lên
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // tên tệp tin của ảnh sẽ được lưu trữ trên server
    }
})
const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), function (req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send({ imageURL: 'http://localhost:7000/uploads/' + file.filename })
})



// CONNECT DATABASE
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('CONNECT TO MONGO DB');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });

app.listen(PORT, () => {
    console.log("Server is running !")
})