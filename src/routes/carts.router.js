import { Router } from "express";
const router = Router();

const carts = []

router.get("/", (req, res) => {
    res.json(carts)
})


router.post("/", (req, res) => {
    const nuevocarts = req.body
    users.push(nuevocarts)
    res.send(" creado correctamente")
})

export default router