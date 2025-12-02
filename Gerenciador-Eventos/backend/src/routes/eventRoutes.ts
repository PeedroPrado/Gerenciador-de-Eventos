import { Router } from "express"
import Event from "../models/event";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const { titulo } = req.query;
    const filtro = titulo ? { titulo: new RegExp(String(titulo), "i") } : {};
    const eventos = await Event.find(filtro);
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar eventos", detalhes: err });
  }
});

// Criar evento
router.post("/", async (req, res) => {
    try{
        const novoEvento = await Event.create(req.body);
        res.status(201).json({mensagem: "Evento criado", evento: novoEvento });
    } catch (err){
        res.status(400).json({ erro: "Erro ao criar evento", detalhes: err});
    }
});

// Atualizar evento
router.put("/:id", async (req, res) => {
  try {
    const evento = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ mensagem: "Evento atualizado!", evento });
  } catch {
    res.status(400).json({ erro: "Erro ao atualizar evento" });
  }
});

// Deletar evento
router.delete("/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ mensagem: "Evento removido!"})
    } catch {
        res.status(400).json({ erro: "Erro ao remover evento" });
    }
});

export default router;
