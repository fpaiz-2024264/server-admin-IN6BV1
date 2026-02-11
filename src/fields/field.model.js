'use strict';

import mongoose from "mongoose";


const fieldSchema = mongoose. Schema(
    {
        fieldName: {
            type: String,
            required: [true, 'El nombre del campo es requerido'],
            trim: true,
            maxLength: [100, 'El nombre no puede exceder 100 caracteres'],
        },
        fieldType: {
            type: String,
            required: [true, 'El tipo de campo es requerido'],
            enum: {
                values: ['NATURAL', 'SINTETICA', 'CONCRETO' ],
                message: 'Tipo de superficie no válida',

            },
        },
        capacity: {
            type: String,
            required: [true, 'La capacidad es requerida'],
            enum: {
                values: ['FUTBOL_5', 'FUTBOL_7', 'FUTBOL_11'],
                message: 'Capacidad no valida'
            }
        },
        pricePerHour: {
            type: Number,
            required: [true, 'El precio por hora es requerido'],
            min: [0, 'El precio debe ser mayor o igual a 0']
        },
        descripcion:{
            type: String,
            trim: true,
            maxLength: [500, 'La descripcion no puede exceder 500 caracteres']

        },
        photo: {
            type: String,
            default: null,
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
    
)
fieldSchema.index({ isActive: 1});
fieldSchema.index({ fieldType: 1});
fieldSchema.index({ isActive: 1, fieldType: 1});
 
export default mongoose.model('Field', fieldSchema);
