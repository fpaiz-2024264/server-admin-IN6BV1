import jwt from 'jsonwebtoken';

export const validateJWT = (req, res, next) => {

    // Configuración de JWT desde variables de entorno
    const jwtconfig = {
        secret: process.env.JWT_SECRET,
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
    };

    // Verificar que el secreto exista
    if (!jwtconfig.secret) {
        console.error(`Error de validación JWT: JWT_SECRET no está definido`);
        return res.status(500).json({
            success: false,
            message: `Configuración del servidor inválida: falta JWT_SECRET`
        });
    }

    // Leer token de headers: x-token o Authorization
    const token =
        req.header('x-token') ||
        req.header('Authorization')?.replace('Bearer', '').trim();

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No se proporcionó un token',
            error: 'MISSING_TOKEN'
        });
    }

    try {
        // Opciones de verificación
        const verifyOptions = {};
        if (jwtconfig.issuer) verifyOptions.issuer = jwtconfig.issuer;
        if (jwtconfig.audience) verifyOptions.audience = jwtconfig.audience;

        // Verificar token
        const decoded = jwt.verify(token, jwtconfig.secret, verifyOptions);

        // Log para debug: token sin role
        if (!decoded.role) {
            console.warn(
                `Token sin campo 'role' para usuario ${decoded.sub}. Payload:`,
                JSON.stringify(decoded, null, 2)
            );
        }

        // Guardar info del usuario en req.user
        req.user = {
            id: decoded.sub,           // userId del servicio de autenticación
            jti: decoded.jti,          // ID único del token
            iat: decoded.iat,          // Emitido en
            role: decoded.role || 'USER_ROLE', // Rol por defecto
        };

        next();

    } catch (error) {
        console.error('Error de validación JWT:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'El token ha expirado',
                error: 'TOKEN_EXPIRED',
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Token inválido',
                error: 'INVALID_TOKEN',
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Error al validar el token',
            error: 'TOKEN_VALIDATION_ERROR',
        });
    }
};
