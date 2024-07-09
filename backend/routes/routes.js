const Router = require('koa-router')

const userController = require('../controllers/users');

const router = new Router();

// Define routes
router.get('/api/users/:id', userController.getUserById);
router.post('/api/users', userController.createUser);
router.get('/api/users', userController.getAllUsers);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);
router.get('/api/managers/:managerId/employees', userController.getManagerAndEmployees);

// Apply middleware for allowed methods

router.use(router.allowedMethods());

module.exports = router
