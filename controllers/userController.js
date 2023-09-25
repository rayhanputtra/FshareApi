const userModel = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          reject({
            sukses: false,
            msg: "User Name Has Already Registered",
          });
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash;
            userModel
              .create(data)
              .then(() =>
                resolve({
                  sukses: true,
                  msg: "Successful Registration",
                })
              )
              .catch(() =>
                reject({
                  sukses: false,
                  msg: "Registration failed",
                })
              );
          });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            resolve({
              sukses: true,
              msg: "Login Successful",
              data: user,
            });
          } else {
            reject({
              sukses: false,
              msg: "Your password is wrong",
            });
          }
        } else {
          reject({
            sukses: false,
            msg: "Unregistered Username",
          });
        }
      });
  });
// exports.editrating = (id, data) =>
//   new Promise((resolve, reject) => {
//     userModel
//       .updateOne(
//         {
//           _id: id,
//         },
//         { $set: data } // Menggunakan operator $set untuk memperbarui nilai status
//       )
//       .then(() =>
//         resolve({
//           sukses: true,
//           msg: "Berhasil Memberkan Rating",
//         })
//       )
//       .catch(() =>
//         reject({
//           sukses: false,
//           msg: "Gagal Memberikan Rating",
//         })
//       );
//   });

exports.getAllUser = () =>
  new Promise((resolve, reject) => {
    userModel
      .find()
      .then((users) => {
        resolve({
          sukses: true,
          msg: "Successfully Retrieving User Data",
          data: users,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Failed to Retrieve User Data",
        })
      );
  });

exports.editData = (id, data) =>
  new Promise((resolve, reject) => {
    if (data.password) {
      bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) {
          console.log(err); // Tambahkan pesan log untuk debugging
          reject({
            sukses: false,
            msg: "Data Edit Failed",
          });
        } else {
          data.password = hash;
          updateData(id, data, resolve, reject);
        }
      });
    } else {
      updateData(id, data, resolve, reject);
    }
  });

function updateData(id, data, resolve, reject) {
  userModel
    .updateOne(
      {
        _id: id,
      },
      data
    )
    .then(() =>
      resolve({
        sukses: true,
        msg: "Data Edit Successful",
      })
    )
    .catch((error) => {
      console.log(error); // Tambahkan pesan log untuk debugging
      reject({
        sukses: false,
        msg: "Data Edit Failed",
      });
    });
}
