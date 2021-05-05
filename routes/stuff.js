const express = require("express");
const Things = require("../models/Things");
const router = express.Router();

const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require("multer");

router.post("/", auth, multer, stuffController.createThing);
router.put("/:id", auth, stuffController.modifyThing);
router.delete("/:id", auth, stuffController.deleteThing);
router.get("/:id", auth, stuffController.getOneThing);
router.use("/", auth, stuffController.getAllThings);

module.exports = router;
