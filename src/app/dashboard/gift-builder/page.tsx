'use client';

import { useState } from 'react';
import Step1GiftBuilder from './steps/Step1GiftBuilder';
import Step2PersonalMessage from './steps/Step2PersonalMessage';
import Step3ReviewConfirm from './steps/Step3ReviewConfirm';

export default function GiftBuilderPage() {

    const [activeStep, setActiveStep] = useState(1);
    const [giftData, setGiftData] = useState({
        products: [],
        message: '',
        recipient: {
            date: '',
            name: '',
            phone: '',
            address: '',
            latlng: null
        }
    });

    const nextStep = () => setActiveStep(prev => prev + 1);
    const prevStep = () => setActiveStep(prev => prev - 1);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white">
            {/* Stepper Visual */}
            <div className="flex justify-between mb-10">
                {['Armar Regalo', 'Mensaje', 'Confirmación'].map((label, index) => (
                    <div key={index} className={`flex-1 text-center ${activeStep === index + 1 ? 'font-bold text-blue-600' : 'text-gray-400'}`}>
                        {label}
                    </div>
                ))}
            </div>

            {/* Renderizado Dinámico por Paso */}
            {activeStep === 1 && (
                <Step1GiftBuilder giftData={giftData} setGiftData={setGiftData} nextStep={nextStep} />
            )}
            {activeStep === 2 && (
                <Step2PersonalMessage giftData={giftData} setGiftData={setGiftData} nextStep={nextStep} prevStep={prevStep} />
            )}
            {activeStep === 3 && (
                <Step3ReviewConfirm giftData={giftData} prevStep={prevStep} />
            )}
        </div>
    );
}