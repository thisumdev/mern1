const router = require("express").Router();
let Student = require("../models/Student");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  //Age type is number theerefor request should be innnumber format
  const age = Number(req.body.age);
  const gender = req.body.gender;

  const newStudent = new Student({
    name,
    age,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json("Student Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Displaying all
router.route("/display").get((req, res) => {
  Student.find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/:id").put(async (req, res) => {
  //Fetching id of backend url which is auto given by mongodb
  let userID = req.params.id;

  const { name, age, gender } = req.body;

  const updateStudent = {
    name,
    age,
    gender,
  };

  //Await function waits the proccess until the relevant tasks happen
  const update = await Student.findByIdAndUpdate(userID, updateStudent)
    .then(() => {
      res.status(200).send({ status: "User updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Student.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "User deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

//Displaying one student
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;

  const user = await Student.findById(userID)
    .then((Student) => {
      res.status(200).send({ status: "User fetched", data: Student });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error wiht fetching user", error: err.message });
    });
});
//res.status(200).send({status: "User updated", user: update})

module.exports = router;
