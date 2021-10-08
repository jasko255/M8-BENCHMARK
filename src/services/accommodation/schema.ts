import mongoose from 'mongoose'

const { Schema, model} = mongoose

const AccommodationSchema = new Schema (
    {
        name: { type: String, required: true },
        host: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        description: { type: String, required: true },
        maxGuestsNo: { type: Number, required: true },
        city: {type: String, required: true }
    }
)

export default model('Accommodation', AccommodationSchema)