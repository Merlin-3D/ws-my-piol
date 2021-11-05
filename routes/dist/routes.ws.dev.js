"use strict";

var express = require('express');

var router = express.Router();

var verifySignUp = require("../middlewares/verifySignUp.js");

var authJwt = require("../middlewares/authJwt.js");

var controller = require("../controllers/auth.controller");

var userController = require("../controllers/user.controller");

var categoryController = require("../controllers/category.controller");

var propertyController = require("../controllers/property.controller");
/********************************** AUTH ROUTES /**********************************/

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags: [User]
 *     parameters:
 *      - in: body
 *        name: signup
 *        description: CREATE NEW USER
 *        schema:
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            roles:
 *              type: object
 *              example: ["admin","moderator","user"]
 *     responses:
 *       201:
 *         description: Created
 */


router.post("/user/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup);
/**
 * @swagger
 * /user/signin:
 *   post:
 *     tags: [User]
 *     parameters:
 *      - in: body
 *        name: signin
 *        description: SIGNIN EXIST USER
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */

router.post("/user/signin", controller.signin);
/********************************** USER ROUTES /**********************************/

/**
 * @swagger
 * /user/all-user:
 *   get:
 *     tags: [User]
 *     description: All deferent users 
 *     responses:
 *       200:
 *         description: Returns all user
 *     security:
 *      - bearerAuth: []
 */

router.get("/user/all-user", [authJwt.verifyToken, authJwt.isAdmin], userController.allUser);
/**
 * @swagger
 * /user/one-user:
 *   get:
 *     tags: [User]
 *     description: One users 
 *     responses:
 *       200:
 *         description: Returns one user
 *     security:
 *      - bearerAuth: []
 */

router.get("/user/one-user", [authJwt.verifyToken, [authJwt.isModerator]], userController.onUser);
/**
 * @swagger
 * /user/update-user:
 *   put:
 *     tags: [User]
 *     parameters:
 *      - in: body
 *        name: Update user
 *        description: update one user
 *        schema:
 *          type: object
 *          properties:
 *            username:
 *              type: string
 *            email:
 *              type: string
 *            profil:
 *              type: string
 *            phone:
 *              type: integer
 *            sexe:
 *              type: string
 *            birthday:
 *              type: string
 *            district:
 *              type: string
 *            city:
 *              type: string
 *  
 *     responses:
 *       201:
 *         description: Created
 *     security:
 *      - bearerAuth: []
 */

router.put("/user/update-user", [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.isModerator], userController.updateUser);
/**
 * @swagger
 * /user/update-password:
 *   put:
 *     tags: [User]
 *     parameters:
 *      - in: body
 *        name: Update password user
 *        description: update password user
 *        schema:
 *          type: object
 *          properties:
 *            password:
 *              type: string
 *  
 *     responses:
 *       201:
 *         description: Created
 *     security:
 *      - bearerAuth: []
 */

router.put("/user/update-password", [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.isModerator], userController.updatePassword);
/**
 * @swagger
 * /user/update-params-user:
 *   put:
 *     tags: [User]
 *     produces:
 *      - application/json
 *     parameters:
 *      - in: body
 *        name: catchphrase
 *        description: Update params user
 *        schema:
 *          type: object
 *          properties:
 *            lang:
 *              type: string
 *            notify:
 *              type: boolean
 *            position:
 *              type: boolean
 *  
 *     responses:
 *       201:
 *         description: boolean
 *     security:
 *      - bearerAuth: []
 */

router.put("/user/update-params-user", [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.isModerator], userController.updateParamasUser);
/**
 * @swagger
 * /user/delete-user/{id}:
 *   delete:
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: delete one user.
 *     description: Delete a catchphrase by id
 *     responses:
 *       200:
 *         description: return user as delete
 *     security:
 *      - bearerAuth: []
 */

router["delete"]("/user/delete-user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser);
/**
 * @swagger
 * /user/authoritie-user/{id}:
 *   put:
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: user id.
 *      - in: body
 *        name: active
 *        description: activate treu or false
 *        schema:
 *          type: object
 *          properties:
 *            active:
 *              type: boolean
 *              required: true
 *     description: active account by id
 *     responses:
 *       200:
 *         description: return user has been desabled
 *     security:
 *      - bearerAuth: []
 */

router.put("/user/authoritie-user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.authoritieUser);
/********************************** CATEGORY ROUTES /**********************************/

/**
 * @swagger
 * /category/add-category:
 *   post:
 *     tags: [Category]
 *     parameters:
 *      - in: body
 *        name: signin
 *        description: Create category
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: string
 *              example: "nom categorie"
 *     responses:
 *       201:
 *         description: Created
 *     security:
 *      - bearerAuth: []
 */

router.post('/category/add-category', [authJwt.verifyToken, authJwt.isAdmin], categoryController.addCategory);
/**
 * @swagger
 * /category/all-category:
 *   get:
 *     tags: [Category]
 *     description: all categorys 
 *     responses:
 *       200:
 *         description: Returns categorys
 *     security:
 *      - bearerAuth: []
 */

router.get('/category/all-category', [authJwt.verifyToken, authJwt.isAdmin], categoryController.allCategorys);
/**
 * @swagger
 * /category/update-category/{id}:
 *   put:
 *     tags: [Category]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: category id.
 *      - in: body
 *        name: title
 *        description: update category
 *        schema:
 *          type: object
 *          properties:
 *            title:
 *              type: boolean
 *              required: true
 *     description: update category by id
 *     responses:
 *       200:
 *         description: return Category has been edit
 *     security:
 *      - bearerAuth: []
 */

router.put('/category/update-category/:id', [authJwt.verifyToken, authJwt.isAdmin], categoryController.updateCategory);
/********************************** PROPERTY ROUTES /**********************************/

/**
 * @swagger
 * /property/add-property:
 *   post:
 *     tags: [Property]
 *     parameters:
 *      - in: body
 *        name: property
 *        description: Create property
 *        schema:
 *          type: object
 *          properties:
 *            category:
 *              type: string
 *              example: "6181d643678551d42a595e07"
 *              required: true
 *            type_offer:
 *              type: string
 *            district:
 *              type: string
 *            city:
 *              type: string
 *            bathroom:
 *              type: integer
 *            superficy:
 *              type: integer
 *            stage:
 *              type: integer
 *            garage:
 *              type: integer
 *            description:
 *              type: string
 *            totalFloor:
 *              type: integer
 *            availablity:
 *              type: boolean
 *            typeProperty:
 *              type: string
 *            cost:
 *              type: integer
 *            bail:
 *              type: integer
 *            state:
 *              type: integer
 *            price:
 *              type: integer
 *              required: true
 *            verification:
 *              type: boolean
 *            pictures:
 *              type: object
 *              example: ["https://static.onzemondial.com/photo_article/202595/92167/1200-L-liga.jpg","https://static.onzemondial.com/photo_article/202595/92167/1200-L-liga.jpg"]
 *              required: true
 *            long:
 *              type: double
 *              example: "4.2222222411144122"
 *            lat:
 *              type: double
 *              example: "8.1414256656656565"
 *     responses:
 *       201:
 *         description: Created new property
 *     security:
 *      - bearerAuth: []
 */

router.post('/property/add-property', [authJwt.verifyToken, authJwt.isModerator], propertyController.addProperty);
/**
* @swagger
* /property/all-property:
*   get:
*     tags: [Property]
*     description: all categorys property
*     responses:
*       200:
*         description: Returns all property
*     security:
*      - bearerAuth: []
*/

router.get('/property/all-property', [authJwt.verifyToken, authJwt.isModerator], propertyController.allPropertys);
/**
 * @swagger
 * /property/from-category/{id}:
 *   get:
 *     tags: [Property]
 *     description: all propertys
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: category id.
 *     responses:
 *       200:
 *         description: Returns list all propertys
 *     security:
 *      - bearerAuth: []
 */

router.get('/property/from-category/:id', [authJwt.verifyToken, authJwt.isModerator], propertyController.getFromCategory);
/**
* @swagger
* /property/from-user/{id}:
*   get:
*     tags: [Property]
*     description: all propertys for one user
*     parameters:
*      - in: path
*        name: id
*        required: true
*        type: string
*        description: user id.
*     responses:
*       200:
*         description: Returns list all propertys
*     security:
*      - bearerAuth: []
*/

router.get('/property/from-user/:id', [authJwt.verifyToken, authJwt.isModerator], propertyController.getFromUser);
/**
 * @swagger
 * /property/delete-property/{id}:
 *   delete:
 *     tags: [Property]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: delete one property.
 *     description: Delete a property by id
 *     responses:
 *       200:
 *         description: return property as been delete
 *     security:
 *      - bearerAuth: []
 */

router["delete"]("/property/delete-property/:id", [authJwt.verifyToken, authJwt.isModerator], propertyController.deleteProperty);
/**
 * @swagger
 * /property/update-property:
 *   put:
 *     tags: [Property]
 *     parameters:
 *      - in: body
 *        name: property
 *        description: Create property
 *        schema:
 *          type: object
 *          properties:
 *            category:
 *              type: string
 *              example: "6181d643678551d42a595e07"
 *              required: true
 *            type_offer:
 *              type: string
 *            district:
 *              type: string
 *            city:
 *              type: string
 *            bathroom:
 *              type: integer
 *            superficy:
 *              type: integer
 *            stage:
 *              type: integer
 *            garage:
 *              type: integer
 *            description:
 *              type: string
 *            totalFloor:
 *              type: integer
 *            availablity:
 *              type: boolean
 *            typeProperty:
 *              type: string
 *            cost:
 *              type: integer
 *            bail:
 *              type: integer
 *            state:
 *              type: integer
 *            price:
 *              type: integer
 *              required: true
 *     responses:
 *       201:
 *         description: Update one property
 *     security:
 *      - bearerAuth: []
 */

router.post('/property/update-property', [authJwt.verifyToken, authJwt.isModerator], propertyController.updateOneProperty);
module.exports = router;