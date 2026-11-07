const { default: mongoose } = require("mongoose");

const mongodbUrl = "mongodb+srv://sakshiverma2319_db_user:zFuPDoYLImPeH4WT@cluster0.kyo8hcn.mongodb.net/?appName=Cluster0";

const connectDb = () => {
    return mongoose.connect(mongodbUrl)
}

module.exports={connectDb}