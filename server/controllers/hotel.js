import Hotel from "../models/hotel";
import fs from "fs";

export const createHotel = async (req, res) => {
  console.log(req.fields);
  console.log(req.files);
  try {
    let fields = req.fields;
    let files = req.files;
    let hotel = new Hotel(fields);

    //handle image

    //we read image

    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }
    hotel.save((error, result) => {
      if (error) {
        console.log("Saving hotel error", error);
        res.status(400).send("Error saving");
      }
      res.status(200).send("Hotel created successfully");
    });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
};

export const getHotels = async (req, res) => {
  let allHotels = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(allHotels);
  res.json(allHotels);
};

//we will create another end point for image datas cause it is blob and large
