import { Router } from "express";
import * as Controller from "./controller";
const router = Router();

router.route('/signup').post(Controller.signup);
router.route('/signin').post(Controller.signin)

export default router;