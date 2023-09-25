const gitarModel = require("../models/gitar");

exports.create = (data) =>
  new Promise((resolve, reject) => {
    gitarModel
      .create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Successfully Saved Data",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Failed to Save Data",
        });
      });
  });

exports.getData = () =>
  new Promise((resolve, reject) => {
    gitarModel
      .find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Successfully Retrieving Data",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Failed to Retrieve Data",
          data: [],
        })
      );
  });

const mongoose = require("mongoose");

exports.getByIdAdmin = (id) =>
  new Promise((resolve, reject) => {
    try {
      const objectId = mongoose.Types.ObjectId;
      gitarModel
        .aggregate([
          {
            $lookup: {
              from: "users",
              localField: "idAdmin", // Kolom pada koleksi saat ini
              foreignField: "_id", // Kolom pada koleksi "users" yang ingin dicocokkan
              as: "adminData", // Nama field untuk data admin yang di-lookup
            },
          },
          {
            $unwind: "$adminData",
          },
          {
            $match: {
              idAdmin: objectId(id),
            },
          },
          { $sort: { _id: -1 } },
        ])
        .then((data) => {
          resolve({
            sukses: true,
            msg: "Succeed",
            data: data,
          });
        })
        .catch((e) => {
          reject({
            sukses: false,
            msg: "Fail",
            data: [],
          });
        });
    } catch (error) {
      console.log(error);
    }
  });

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    gitarModel
      .findOne({
        _id: id,
      })
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Successfully Retrieving Data",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Failed to Retrieve Data",
          data: {},
        })
      );
  });

exports.edit = (id, data) =>
  new Promise((resolve, reject) => {
    gitarModel
      .updateOne(
        {
          _id: id,
        },
        data
      )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Data Edit Success",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Data Edit Failed",
        })
      );
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    gitarModel
      .deleteOne({
        _id: id,
      })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Data Deleted Successfully",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Failed to Delete Data",
        })
      );
  });
