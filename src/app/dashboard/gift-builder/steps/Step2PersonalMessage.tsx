/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as yup from 'yup';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import LocationPickerMap from '@/components/LocationPickerMap';

dayjs.extend(isSameOrAfter);

export default function Step2PersonalMessage({ giftData, setGiftData, nextStep, prevStep }: any) {

    const [formData, setFormData] = useState({
        date: giftData.recipient?.date || '',
        name: giftData.recipient?.name || '',
        phone: giftData.recipient?.phone || '',
        address: giftData.recipient?.address || '',
        latlng: giftData.recipient?.latlng || null,
        message: giftData.message || ''
    });

    const [errors, setErrors] = useState<any>({});

    const validationSchema = yup.object().shape({
        date: yup.string()
            .required('La fecha y hora son obligatorias')
            .test('is-future', 'La fecha y hora deben ser futuras', value => {
                return value ? dayjs(value).isSameOrAfter(dayjs()) : false;
            }),
        name: yup.string().required('El nombre es obligatorio'),
        phone: yup.string()
            .required('El teléfono es obligatorio')
            .matches(/^\+?\d{7,15}$/, 'Teléfono inválido, incluye código de país si es necesario'),
        message: yup.string().required('El mensaje es obligatorio'),
        address: yup.string().required('La dirección es obligatoria')
    });

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        try {
            await (yup.reach(validationSchema, name) as yup.AnySchema).validate(value);
            setErrors((prev: any) => ({ ...prev, [name]: undefined }));
        } catch (err: any) {
            setErrors((prev: any) => ({ ...prev, [name]: err.message }));
        }
    };

    const handleNext = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            setGiftData({
                ...giftData,
                message: formData.message,
                recipient: {
                    date: formData.date,
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    latlng: formData.latlng
                }
            });
            nextStep();
        } catch (err: any) {
            const validationErrors: any = {};
            err.inner.forEach((e: any) => {
                validationErrors[e.path] = e.message;
            });
            setErrors(validationErrors);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6 text-center">📦 Datos de Envío & Mensaje</h2>

            <div className="flex flex-col gap-4">
                {/* Fecha y Hora */}
                <div>
                    <label className="block mb-1 font-medium">📅 Fecha y Hora de Envío</label>
                    <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        min={dayjs().format('YYYY-MM-DDTHH:mm')}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.date ? 'border-red-500' : ''}`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>

                {/* Nombre */}
                <div>
                    <label className="block mb-1 font-medium">👤 Nombre del Destinatario</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Teléfono */}
                <div>
                    <label className="block mb-1 font-medium">📞 Teléfono</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full border rounded p-2 ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Dirección */}
                <div>
                    <label className="block mb-1 font-medium">📍 Dirección (Selecciona en el mapa)</label>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                {/* Mapa */}
                <LocationPickerMap
                    initialPosition={formData.latlng}
                    onLocationChange={({ position, address }: any) => {
                        setFormData((prev: any) => ({
                            ...prev,
                            address: address,
                            latlng: position
                        }));
                        setErrors((prev: any) => ({ ...prev, address: undefined }));
                    }}
                />

                {/* Mensaje */}
                <div>
                    <label className="block mb-1 font-medium">💌 Mensaje Personalizado</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full h-32 p-3 border rounded ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
            </div>

            <div className="flex justify-between mt-6">
                <button onClick={prevStep} className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded">
                    Atrás
                </button>
                <button onClick={handleNext} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
                    Siguiente: Confirmar Pedido
                </button>
            </div>
        </div>
    );
}
