import React, { useState } from 'react';
import Select, { type SelectOption } from '@/components/ui/Select';

const SelectTestPage: React.FC = () => {
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

    const longOptions: SelectOption[] = [
        { value: 'opt1', label: 'Очень длинная опция с большим количеством текста' },
        { value: 'opt2', label: 'Короткая' },
        { value: 'opt3', label: 'Средняя опция' },
        { value: 'opt4', label: 'Еще одна длинная опция для тестирования' },
    ];

    return (
        <div style={{ 
            padding: '40px', 
            backgroundColor: '#f5f5f5', 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        }}>
            <h1>Тест компонента Select</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
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

                <div>
                    <h3>Селектор с длинными опциями</h3>
                    <Select
                        options={longOptions}
                        placeholder="Выберите длинную опцию"
                        onChange={(value) => console.log('Selected:', value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SelectTestPage;