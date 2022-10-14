import { Router } from "express";
import * as Controller from "./controller";
const router = Router();

router.get('/', Controller.findAll)
router.route("/:id").get(Controller.detalle);
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.deleteById)

export default router;