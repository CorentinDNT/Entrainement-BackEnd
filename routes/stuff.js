const express = require("express");
const Things = require("../models/Things");
const router = express.Router();

const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");

router.post("/", stuffController.createThing);
router.put("/:id", stuffController.modifyThing);
router.delete("/:id", stuffController.deleteThing);
router.get("/:id", stuffController.getOneThing);
router.use("/", stuffController.getAllThings);

module.exports = router;
