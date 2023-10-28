// Örnek bir kullanıcı modeli (models/user.js) içeri aktarılır.
const User = require("../models/user");

// Kullanıcı kaydı verilerini doğrula ve biçimlendir
exports.validateUserRegistration = (req, res, next) => {
  const { username, email, password } = req.body;

  // Gelen verilerin doğruluğunu kontrol et
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Tüm alanlar gereklidir." });
  }

  // E-posta adresinin geçerli bir e-posta olup olmadığını doğrula
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email.match(emailRegex)) {
    return res.status(400).json({ error: "Geçerli bir e-posta adresi girin." });
  }

  // Şifrenin uzunluğunu kontrol et
  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Şifre en az 6 karakter uzunluğunda olmalıdır." });
  }

  // Gelen verileri temizle ve işle
  req.body.username = username.trim();
  req.body.email = email.trim();
  req.body.password = password;

  next();
};
