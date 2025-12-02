import {Schema, model} from "mongoose";

const EventSchema = new Schema ({
    titulo: {type: String, required: true},
    descricao: {type: String},
    data: {type: Date, required: true},
    local: {type: String, required: true},
    valor: {type: Number, required: true}
});

export default model("Evento", EventSchema)