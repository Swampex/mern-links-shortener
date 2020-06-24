const {Router} = require('express')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router();

router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля должна быть 6 символов')
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log('body on server:', req.body);
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неверные данные при регистрации'})
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});
        if(candidate) {
            return res.status(400).json({message: "Такой пользователь уже существует."})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({email, password: hashedPassword});
        await user.save();
        res.status(201).json({message: "Пользователь создан"});
    }
    catch (e) {
        res.status(500).json({message: "Произошла ошибка. Обратитесь к администратору системы."})
    }
})

router.post('/login',
    [
        check('email', 'Формат email некорректный').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').isLength({min: 1})
    ],
    async (req, res) => {
    try {
        console.log('login тело запроса',req.body)
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неверные данные при авторизации'
            })
        }

        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: "Пользователь не найден."})
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({message: 'Пароль некорректный.'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecretKey'),
            {expiresIn: '1h'}
        )

        res.json({token, userid: user.id})
    }
    catch (e) {
        res.status(500).json({message: "Произошла ошибка. Обратитесь к администратору системы."})
    }
})

module.exports = router
