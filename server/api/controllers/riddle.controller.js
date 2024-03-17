const mongoose = require('mongoose');
const Riddle = require('../models/riddle.model');
const Subject = require('../models/subject.model')
const Difficulty = require('../models/difficulty.model')


module.exports = {
  getAllRiddle: (req, res) => {
    // Find all  Riddle in the database
    Riddle.find(x => ((!req.params.difficulty || x.difficulty == req.params.difficulty)&&((!req.params.subject || x.Subject == req.params.subject))) && (!req.params.age || x.age == req.params.age)).populate({ path: 'subjectId', select: 'subject_riddle' }).populate({ path: 'difficultyId', select: 'difficulty_riddle' }).populate({ path: 'ageId', select: 'age_range' })
      .then(riddles => {
        res.status(200).json(riddles);
      })
      .catch(err => {
        // Error finding  Riddle
        res.status(500).json({ error: 'Failed to get  Riddle' });
      });
  },
  getById: (req, res) => {
    const id = req.params.riddleId;

    // Find the  Riddle in the database
    Riddle.findOne({ id })
      .then(foundIdRiddle => {
        if (foundIdeRiddle) {
          //  Riddle found, return it
          res.json(foundRiddle);
        } else {
          // Riddle not found
          res.status(404).json({ error: 'Riddle not found' });
        }
      })
      .catch(err => {
        // Error finding Riddle
        res.status(500).json({ error: 'Failed to get Riddle' });
      });
  },
  createRiddle: (req, res) => {
    console.log(req.file);
    const imagePath = req.file.path;

    const { riddlename, question, solution, subjectId, difficultyId } = req.body;

    // Check if subjectId and difficultyId exist
    if (!subjectId || !difficultyId) {
      return res.status(400).json({ error: 'subjectId and difficultyId are required' });
    }

    // Check if subjectId is an existing category
    Subject.findById(subjectId)
      .then(subject => {
        if (!subject) {
          return res.status(400).json({ error: 'subjectId does not exist' });
        }


        // Check if difficultyId is an existing category
        Difficulty.findById(difficultyId)
          .then(difficulty => {
            if (!difficulty) {
              return res.status(400).json({ error: 'difficultyId does not exist' });
            }

            // Create a new Riddle
            const newRiddle = new Riddle({ riddlename, question, solution, subjectId, difficultyId, imagePath });

            // Save the new Riddle to the database
            newRiddle.save()
              .then(createdRiddle => {
                // Riddle created successfully, return the created Riddle
                res.json(createdRiddle);
              })
              .catch(err => {
                // Error saving Riddle
                res.status(500).json({ error: 'Failed to create Riddle' });
              });
          })
          .catch(err => {
            // Error finding difficulty
            res.status(500).json({ error: 'Failed to find difficulty' });
          });
      })
      .catch(err => {
        // Error finding subject
        res.status(500).json({ error: 'Failed to find subject' });
      });
  },
  updatedRiddle: (req, res) => {
    const id = req.params.riddleId;
    console.log(req.file);
    const { path: image } = req.file;
    const { riddlename, question, solution, subjectId, difficultyId } = req.body;

    // Check if subjectId and difficultyId exist
    if (!subjectId || !difficultyId) {
      return res.status(400).json({ error: 'subjectId and difficultyId are required' });
    }

    // Check if subjectId is an existing category
    Subject.findById(subjectId)
      .then(subject => {
        if (!subject) {
          return res.status(400).json({ error: 'subjectId does not exist' });
        }

        // Check if difficultyId is an existing category
        Difficulty.findById(difficultyId)
          .then(difficulty => {
            if (!difficulty) {
              return res.status(400).json({ error: 'difficultyId does not exist' });
            }

            // Find the Riddle in the database and update its properties
            Riddle.findOneAndUpdate({ id }, { riddlename, question, solution, subjectId, difficultyId, image }, { new: true })
              .then(updatedRiddle => {
                if (updatedRiddle) {
                  // Riddle updated successfully, return the updated Riddle
                  res.json(updatedRiddle);
                } else {
                  // Riddle not found
                  res.status(404).json({ error: 'Riddle not found' });
                }
              })
              .catch(err => {
                // Error updating Riddle
                res.status(500).json({ error: 'Failed to update Riddle' });
              });
          })
          .catch(err => {
            // Error finding difficulty
            res.status(500).json({ error: 'Failed to find difficulty' });
          });
      })
      .catch(err => {
        // Error finding subject
        res.status(500).json({ error: 'Failed to find subject' });
      });


  },
  deleteRiddle: (req, res) => {
    const id = req.params.riddleId;

    // Find the Riddle in the database and delete it
    Riddle.findByIdAndDelete(id)
      .then(deletedIdRiddle => {
        if (deletedIdRiddle) {
          // Riddle deleted successfully
          res.json({ message: 'Riddle deleted successfully' });
        } else {
          // Riddle not found
          res.status(404).json({ error: 'Riddle not found' });
        }
      })
      .catch(error => {
        // Error deleting Riddle
        res.status(500).json({ error: 'Failed to delete Riddle' });
      });
  },
}
