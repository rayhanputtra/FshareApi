const transaksiModel = require("../models/transaksi");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

exports.create = (data) =>
  new Promise((resolve, reject) => {
    transaksiModel
      .create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Successful Transaction",
        });
      })
      .catch(() => {
        reject({
          sukses: false,
          msg: "Transaction Failed",
        });
      });
  });

exports.editstatus = (id, data) =>
  new Promise((resolve, reject) => {
    transaksiModel
      .updateOne(
        {
          _id: id,
        },
        { $set: data } // Menggunakan operator $set untuk memperbarui nilai status
      )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Data Edit Successful",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Data Edit Failed",
        })
      );
  });

exports.uploadBuktiBayar = (id, data) =>
  new Promise((resolve, reject) => {
    transaksiModel
      .updateOne({ _id: id }, { $set: data })
      .then(() => {
        resolve({
          sukses: true,
          msg: "Successful Transaction",
        });
      })
      .catch(() => {
        reject({
          sukses: false,
          msg: "Transaction failed",
        });
      });
  });

exports.getall = () =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "gitars",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
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

exports.getByIdUser = (id) =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "gitars",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
          {
            $match: {
              idUser: objectId(id),
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

exports.getbyBarang = (id) =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "gitars",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: {
              path: "$dataBarang",
              preserveNullAndEmptyArrays: true, // Menggunakan preserveNullAndEmptyArrays untuk menangani data null
            },
          },
          {
            $match: {
              idBarang: objectId(id),
            },
          },
          { $sort: { _id: -1 } },
        ])
        .then((data) => {
          if (data.length > 0) {
            resolve({
              sukses: true,
              msg: "Succeed",
              data: data[0],
            });
          } else {
            resolve({
              sukses: false,
              msg: "Data not found",
              data: null,
            });
          }
        })
        .catch((e) => {
          reject({
            sukses: false,
            msg: "Fail",
            data: null,
          });
        });
    } catch (error) {
      console.log(error);
      reject({
        sukses: false,
        msg: "An Error Occurred On The Server",
        data: null,
      });
    }
  });

exports.getByIdUserLimit = (id, limit) =>
  new Promise((resolve, reject) => {
    try {
      transaksiModel
        .aggregate([
          {
            $lookup: {
              from: "gitars",
              localField: "idBarang",
              foreignField: "_id",
              as: "dataBarang",
            },
          },
          {
            $unwind: "$dataBarang",
          },
          {
            $match: {
              idUser: objectId(id),
            },
          },
          { $sort: { _id: -1 } },
          {
            $limit: 2,
          },
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
