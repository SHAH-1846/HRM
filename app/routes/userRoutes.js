const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const accessControl = require('../utils/access-control').accessControl;


const setAccessControl = (access_type) => {
    return (req, res, next) => {
        accessControl(access_type, req, res, next)
    }
};


router.get('/users',setAccessControl('*'),userController.fetchAll);
router.get('/users/profile',setAccessControl('*'),userController.fetchProfile);
router.get('/users/:id',setAccessControl('*'),userController.fetchOne);
router.post('/add-new-user',setAccessControl('*'), userController.addNewUser);
router.put('/edit-user/:id',setAccessControl('*'), userController.editUser);

module.exports = router;