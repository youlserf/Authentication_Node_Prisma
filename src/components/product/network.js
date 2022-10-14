import { Router } from "express";
import * as Controller from "./controller";
const router = Router();

router.route('/').get(Controller.findAll)
router.route("/:id").get(Controller.detalle);
router.route('/').post(Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.deleteById)

export default router;