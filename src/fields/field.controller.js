import Field from './field.model.js';
 
export const createField = async (req, res) => {
    try {
        const fieldData = req.body;
 
        if (req.file) {
            fieldData.photo = req.file.path;
        }
 
        const field = new Field(fieldData);
        await field.save();
 
        res.status(201).json({
            success: true,
            message: 'Campo creado exitosamente',
            data: field
        })
 
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear campo.',
            error: error.message
        })
    }
}
try {
    
} catch (error) {
    
}
export const getFields = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true} = req.query;
 
        const filter = { isActive };
 
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1}
        }
 
        const fields = await Field.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);
 
        const total = await Field.countDocuments(filter);
       
        res.status(200).json({
            success: true,
            data: fields,
            pagination: {
                currentPage: page,
                totalPage: Math.ceil(total / limit),
                totalRecords: total,
                limit
            }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los campos.',
            error: error.message
        })
    }
   
}