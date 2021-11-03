
const express = require('express');
const router = express.Router();
const verifySignUp = require("../middlewares/verifySignUp.js");
const authJwt = require("../middlewares/authJwt.js")
const controller = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const categoryController = require("../controllers/category.controller");


/********************************** AUTH ROUTES /**********************************/

/**
 * @swagger
 * /auth/signup:
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
router.post(
    "/auth/signup",
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    controller.signup
);

/**
 * @swagger
 * /auth/signin:
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
router.post("/auth/signin", controller.signin);

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
router.get("/user/all-user", [authJwt.verifyToken, authJwt.isAdmin], userController.allUser)

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
router.get("/user/one-user", [authJwt.verifyToken, [authJwt.isModerator]], userController.onUser)

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
router.put("/user/update-user", [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.isModerator], userController.updateUser)

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
router.put("/user/update-params-user", [authJwt.verifyToken, verifySignUp.checkDuplicateUsernameOrEmail, authJwt.isModerator], userController.updateParamasUser)

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
router.delete("/user/delete-user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUser)

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
router.put("/user/authoritie-user/:id", [authJwt.verifyToken, authJwt.isAdmin], userController.authoritieUser)

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
 *              type: "string"
 *              example: "ytyVgh"
 *     responses:
 *       201:
 *         description: Created
 *     security:
 *      - bearerAuth: []
 */
router.post('/category/add-category', [authJwt.verifyToken, authJwt.isAdmin], categoryController.addCategory)


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
router.get('/category/all-category', [authJwt.verifyToken, authJwt.isAdmin], categoryController.allCategorys)

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
router.put('/category/update-category/:id', [authJwt.verifyToken, authJwt.isAdmin], categoryController.updateCategory)




module.exports = router;
