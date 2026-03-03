import yup from 'yup'

export const userSchema = yup.object({
    username: yup.string().trim().min(3, 'Username must be alleast 3 characters').required(),
    email: yup.string().email('The email is not valid one').required(),
    password: yup.string().min(4, 'Password must be atleast 4 characters').required()
})

export const validateUser = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body)
        next()
    } catch (error) {
        return res.status(400).json({
            errors: error.errors
        })
    }
}