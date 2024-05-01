import mongoose from 'mongoose'

const genreEnum = ['action', 'horror', 'sci-fi', 'animation', 'comedy', 'romance', 'police',
  'history', 'adventure', 'police', 'romantic-comedy', 'documentary']

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  directors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    required: true
  }],
  releaseDate: { type: Date, required: true },
  rating: { type: String, required: true },
  duration: { type: Number, required: true },
  genre: { type: String, required: true, enum: genreEnum },
  isActive: { type: Boolean, default: true }

}, { timestamps: true })

movieSchema.virtual('formattedDuration').get(function () {
  return this.duration + ' min'
})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
