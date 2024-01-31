const exppress = require('express')
const router = exppress.Router();
const DB = require('../models/DB')

async function usersJSON(){
    return await DB.fetchUsers();
}

// console.log(usersJSON());
router.get('/',async (req,res)=>{
    const data = await usersJSON()
    res.send({data:data})
})

module.exports = router
