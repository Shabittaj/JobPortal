import JWT from 'jsonwebtoken';

export const userAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next('Auth Failed');
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.user = {
            firstName: payload.firstName,
            role: payload.role,
            email: payload.email,
            userId: payload.userId
        };
        next();
    } catch (error) {
        console.error(error);  // Log the error for debugging purposes
        next('Auth Failed');
    }
};
