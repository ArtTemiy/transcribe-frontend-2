import React, { useState } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Select, { type SelectOption } from '@/components/ui/Select';

const Page = () => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [selectedValue2, setSelectedValue2] = useState<string>('option2');

    const options: SelectOption[] = [
        { value: 'option1', label: 'Label' },
        { value: 'option2', label: 'Label' },
        { value: 'option3', label: 'Label' },
        { value: 'option4', label: 'Label' },
        { value: 'option5', label: 'Label' },
        { value: 'option6', label: 'Label' },
        { value: 'option7', label: 'Label' },
    ];

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div>
                <h1>Spinner</h1>
                <p>clockwise</p>
                <LoadingSpinner direction='clockwise' />
                <p>counterclockwise</p>
                <LoadingSpinner direction='counterclockwise' />
            </div>
            
            <div>
                <h1>Select Component</h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px' }}>
                    <div>
                        <h3>Базовый селектор</h3>
                        <Select
                            options={options}
                            value={selectedValue}
                            placeholder="Content"
                            onChange={setSelectedValue}
                        />
                        <p>Выбранное значение: {selectedValue || 'не выбрано'}</p>
                    </div>

                    <div>
                        <h3>Селектор с предустановленным значением</h3>
                        <Select
                            options={options}
                            value={selectedValue2}
                            onChange={setSelectedValue2}
                        />
                        <p>Выбранное значение: {selectedValue2}</p>
                    </div>

                    <div>
                        <h3>Отключенный селектор</h3>
                        <Select
                            options={options}
                            value="option1"
                            disabled={true}
                            onChange={() => {}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
