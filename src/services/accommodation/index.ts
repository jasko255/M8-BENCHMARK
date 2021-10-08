import express from 'express'
import AccommodationModel from './schema.js'
import createHttpError from 'http-errors'

const accommodationRouter = express.Router()

accommodationRouter.post('/' , async (req, res, next ) => {
    try {
        const newAccommodation = new AccommodationModel(req.body)
        const {_id} = await newAccommodation.save()

        res.status(201).send({_id})
    } catch (error) {
        next(error)
        console.log(error);
    }
})

accommodationRouter.get('/', async (req, res, next) => {
    try {
        const accommodations = await AccommodationModel.find()
        res.send(accommodations)
    } catch (error) {
        next(error)
        console.log(error);
    }
})


accommodationRouter.get('/:accommodationId', async (req, res, next)=> {
    try {
        const accommodation = await AccommodationModel.findById(req.params.accommodationId)
        res.send(accommodation)
    } catch (error) {
        next(error)
        console.log(error);
    }
}
)

accommodationRouter.put('/:accommodationId', async (req, res, next)=> {
    try {
        const updatedAccommodation = await AccommodationModel.findByIdAndUpdate(
            req.params.accommodationId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if(updatedAccommodation){
            res.send(updatedAccommodation)
        }else{
            next(createHttpError(404, `Accommodation with _id ${req.params.accommodationId} not found!`));
        }
    } catch (error) {
        next(error)
    }
})



accommodationRouter.delete('/:accommodationId', async (req, res, next)=>{
    try {
        await AccommodationModel.findByIdAndRemove(req.params.accommodationId)
        res.json({ message: "Deleted" })
    } catch (error) {
        next(error)
    }
})



export default accommodationRouter