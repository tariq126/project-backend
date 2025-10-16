const express = require('express');
const router =  express.Router({ mergeParams: true });
const restaurantController = require('../controllers/Restaurant.controller');
const {body} = require('express-validator');
const auth = require('../middleware/auth');

// --- Reusable validation rules ---
const restaurantValidationRules = [
    body('Name')
        .notEmpty()
        .withMessage('Name is required'),
    body('Location')
        .notEmpty()
        .withMessage('Location is required'),
    body('Email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is not valid'),
    body('Password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long'),
    body('Phone')
        .notEmpty()
        .withMessage('Phone is required')
        .isLength({min: 11})
        .withMessage('Enter a valid phone number'),
    body('Commercial_Num')
        .notEmpty()
        .withMessage('Commercial number is required')
];
// ---

router.post('/login', restaurantController.login);

router.route('/')
    .get(restaurantController.getAllRestaurants)
    // Use the validation rules for the POST route
    .post(restaurantValidationRules, restaurantController.addRestaurant);

router.route('/:restaurantId')
    .get(restaurantController.getRestaurant)
    // Use the validation rules and auth middleware for the PATCH route
    .patch(auth, restaurantValidationRules, restaurantController.updateRestaurant)
    .delete(auth, restaurantController.deleteRestaurant);

module.exports = router;