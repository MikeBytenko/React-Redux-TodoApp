const router = require("express").Router();
const Notes = require("../models/notes");
const {noteSchema} = require('../validations/note')
const {validation} = require('../middleware/validation_joi')

router.get("/", read);
router.post("/", validation(noteSchema), create);
router.delete("/:id", del);
router.put("/:id", update);
router.delete("/", delAll);
router.put('/checked/:id', changeChecked)

async function read(req, res) {
  try {
    const data = await Notes.find();

    res.json({ data });

  } catch (err) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

async function create(req, res) {
  try {
    const { note, checked } = req.body;
    console.log(req.body)

    let newNote = new Notes({ note, checked });

    res.status(201).json(newNote)

    await newNote.save();

  } catch (err) {
    res.status(500).json({
      message: "An error occured",
    });
  }
}

async function update(req, res) {
    try{
    const { note, checked } = req.body;
    console.log( note, checked)

    const toUpdate= {
            ...(note && {note}),
            ...(checked && {checked}),
        }


    const updatedNote = await Notes.findByIdAndUpdate({_id: req.params.id}, toUpdate, {new: true})
    console.log(updatedNote)

    res.status(201).json(updatedNote)

    }catch(err) {
        res.status(500).json({
            message: "An error occured",
          }); 
    }
}

async function changeChecked(req, res){
  try{
    const {  checked } = req.body;
    console.log(checked)
    let note = await Notes.findById(req.params.id)
    note.checked = checked
    console.log(note)
    res.json(note)
  }catch(err) {
    res.status(500).json({
        message: "An error occured",
      }); 
}
}

async function del(req, res) {

    try{
      console.log(req.params.id)
        const deltedNote = await Notes.findByIdAndRemove(req.params.id);
        res.status(201).json(deltedNote)
    
        }catch(err) {
            res.status(500).json({
                message: "An error occured",
              }); 
        }
}
async function delAll(req, res) {

    try{
        const deleteAll = await Notes.deleteMany({});
        res.status(201).json(deleteAll)
    
        }catch(err) {
            res.status(500).json({
                message: "An error occured",
              }); 
        }
}
async function isChecked(req, res) {
    try {
      const CheckedArr = await Notes.find({checked: true});
      console.log(CheckedArr.length)
  
      res.status(200).json({ isChecked: CheckedArr.length });
  
    } catch (err) {
      res.status(500).json({
        message: "An error occured",
      });
    }
  }

module.exports = router
