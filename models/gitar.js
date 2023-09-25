const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const gitarSchema = new Schema({
  idAdmin: {
    type: objectId,
  },
  uradmin: {
    type: String,
  },
  tlpadmin: {
    type: String,
  },
  nama: {
    type: String,
  },
  tipe: {
    type: String,
  },
  porsi: {
    type: String,
  },
  tgl: {
    type: String,
  },
  kadaluarsa: {
    type: String,
  },
  alamat: {
    type: String,
  },
  gambar: {
    type: String,
  },
  lokasi: {
    type: String,
  },
  verifikasi: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("gitar", gitarSchema);
