const mongoose = require("mongoose");

class database {
  constructor() {
    this.url = process.env.DATABASE_URI;
  }

  async connect() {
    await mongoose
      .connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("MongoDB bağlantısı başarılı"))
      .catch((err) => {
        console.error("MongoDB bağlantısı hatası:", err);
      });
  }

  async close() {
    await mongoose.connection
      .close()
      .then(console.log("MongoDB bağlantısı kapatıldı"))
      .catch((err) => {
        console.error("MongoDB kapatma hatası:", err);
      });
  }
}

module.exports = new database();
