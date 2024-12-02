const express = require("express");
const MusicaControl = require("../control/musicaControl.js");
const router = express.Router();
const musicaController = new MusicaControl();

router.get("/", (req, res) => musicaController.getAll(req, res));
router.get("/:id", (req, res) => musicaController.getByCodigo(req, res));
router.delete("/:id", (req, res) => musicaController.delete(req, res));
router.post("/", (req, res) => musicaController.create(req, res));
router.put("/:id", (req, res) => musicaController.update(req, res));
router.post("/filtrar", (req, res) => musicaController.filtrar(req, res));

module.exports = router;
