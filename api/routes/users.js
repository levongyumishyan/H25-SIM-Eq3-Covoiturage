import express from 'express';

const router = express.Router();

const users = 
[
    {
        name: "Riggs",
        job: "Commando"
    }
]

router.get('/', (req,res) =>
{
    console.log(users)
})

router.post('/', (req,res) =>
{
    const user = req.body;

    users.push({...user, id: uuidv4()});

    res.send(`User with the name ${user.firstName} added to the database`)
});

export default router;