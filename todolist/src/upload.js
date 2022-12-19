const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

module.exports.localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  next();
};

const s3 = new aws.S3({
  // iam 아이디와 비밀번호
  credentials: {
    accessKeyId: "AKIA44XT6DHIIFOFDBMY",
    secretAccessKey: "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",
  },
});

const s3Image = multerS3({
  // s3 버킷에 저장
  s3: s3,
  bucket: "todooo",
  acl: "public-read",
});

module.exports.image = multer({
  // 이미지 업로드
  dest: "upload/images/",
  limits: {
    fileSize: 10000000,
  },
  storage: s3Image,
});
