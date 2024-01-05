const Authentication = require("../middleware/authenticationMiddleware");

const decodeUser = async (req, res) => {
  try {
    const reqHeader = req.headers["authorization"];
    if (!reqHeader) {
      res.status(401).json({ error: "Yetkilendirme başlığı bulunamadı" });
      return null;
    }

    const token = reqHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Token bulunamadı" });
      return null;
    }

    const decodedUser = Authentication.verifyToken(
      token,
      process.env.SECRET_KEY
    );
    if (!decodedUser) {
      res.status(401).json({ error: "Token geçersiz veya süresi dolmuş" });
      return null;
    }

    console.log("Decoded User", decodedUser);
    return decodedUser;
  } catch (error) {
    console.log("Kullanıcı doğrulanırken bir hata oluştu", error);
    res.status(500).json({ error: "Bir hata oluştu, lütfen tekrar deneyin" });
    return null;
  }
  /* const reqHeader = req.headers["authorization"];
  console.log("reqHeader", reqHeader);
  const token = reqHeader && reqHeader.split(" ")[1];
  console.log("token", token);

  process.env.SECRET_KEY;
  const decodedUser = Authentication.verifyToken(token, process.env.SECRET_KEY);
  console.log("decoded User", decodedUser);

  return decodedUser; */
};

module.exports = { decodeUser };
