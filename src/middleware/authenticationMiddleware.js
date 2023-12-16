const jwt = require("jsonwebtoken");

class Authentication {
  generateToken(payload, secretKey) {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
  }

  verifyToken(token, secretKey) {
    try {
      return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return console.log("Token Geçersiz");
        }

        console.log("decoded", decoded);
        const userEmail = decoded.email;
        const userRole = decoded.role;

        console.log(
          `Hoş geldiniz, Kullanıcı mail: ${userEmail}, Kullanıcı rol: ${userRole}`
        );

        return decoded;
      });
    } catch (error) {
      console.log("Token doğrulanamadı", error);
    }
  }
}

module.exports = new Authentication();
