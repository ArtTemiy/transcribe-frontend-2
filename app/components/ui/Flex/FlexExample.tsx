import React from 'react';

import { Button } from '../Button';
import { Card } from '../Card';
import Flex from './index';

export const FlexExample: React.FC = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f7f9' }}>
            <h1>Примеры использования компонента Flex</h1>

            {/* Базовый пример */}
            <Card>
                <h2>Базовый горизонтальный Flex</h2>
                <Flex gap="md" align="center">
                    <Button>Кнопка 1</Button>
                    <Button variant="secondary">Кнопка 2</Button>
                    <Button variant="success">Кнопка 3</Button>
                </Flex>
            </Card>

            {/* Вертикальный Flex */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Вертикальный Flex</h2>
                <Flex direction="column" gap="sm" align="start">
                    <Button fullWidth>Полная ширина</Button>
                    <Button>Обычная кнопка</Button>
                    <Button variant="secondary">Вторичная</Button>
                </Flex>
            </Card>

            {/* Justify content примеры */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Justify Content - Space Between</h2>
                <Flex justify="between" align="center" style={{ padding: '10px', border: '1px dashed #ccc' }}>
                    <Button>Слева</Button>
                    <Button variant="secondary">По центру</Button>
                    <Button variant="success">Справа</Button>
                </Flex>
            </Card>

            <Card style={{ marginTop: '20px' }}>
                <h2>Justify Content - Center</h2>
                <Flex justify="center" gap="md" style={{ padding: '10px', border: '1px dashed #ccc' }}>
                    <Button>Кнопка 1</Button>
                    <Button variant="secondary">Кнопка 2</Button>
                </Flex>
            </Card>

            {/* Wrap пример */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Flex Wrap</h2>
                <Flex wrap="wrap" gap="sm" style={{ maxWidth: '300px', border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>Кнопка 1</Button>
                    <Button>Кнопка 2</Button>
                    <Button>Кнопка 3</Button>
                    <Button>Кнопка 4</Button>
                    <Button>Кнопка 5</Button>
                </Flex>
            </Card>

            {/* Разные gap'ы */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Разные размеры Gap</h2>
                
                <h3>Gap XS (4px)</h3>
                <Flex gap="xs" style={{ marginBottom: '10px' }}>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </Flex>

                <h3>Gap MD (16px)</h3>
                <Flex gap="md" style={{ marginBottom: '10px' }}>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </Flex>

                <h3>Gap XL (30px)</h3>
                <Flex gap="xl">
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                </Flex>
            </Card>

            {/* Кастомный gap */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Кастомный Gap (50px)</h2>
                <Flex gap={50}>
                    <Button>Кнопка 1</Button>
                    <Button>Кнопка 2</Button>
                </Flex>
            </Card>

            {/* Разные gapX и gapY */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Разные Gap X и Gap Y</h2>
                <Flex wrap="wrap" gapX="lg" gapY="xs" style={{ maxWidth: '250px', border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button>4</Button>
                </Flex>
            </Card>

            {/* Align items */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Align Items</h2>
                
                <h3>Align Start</h3>
                <Flex align="start" gap="md" style={{ height: '80px', border: '1px dashed #ccc', padding: '10px', marginBottom: '10px' }}>
                    <Button>Высокая</Button>
                    <div style={{ height: '60px', backgroundColor: '#e0e0e0', padding: '10px' }}>Высокий блок</div>
                    <Button>Кнопка</Button>
                </Flex>

                <h3>Align Center</h3>
                <Flex align="center" gap="md" style={{ height: '80px', border: '1px dashed #ccc', padding: '10px', marginBottom: '10px' }}>
                    <Button>Высокая</Button>
                    <div style={{ height: '60px', backgroundColor: '#e0e0e0', padding: '10px' }}>Высокий блок</div>
                    <Button>Кнопка</Button>
                </Flex>

                <h3>Align End</h3>
                <Flex align="end" gap="md" style={{ height: '80px', border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>Высокая</Button>
                    <div style={{ height: '60px', backgroundColor: '#e0e0e0', padding: '10px' }}>Высокий блок</div>
                    <Button>Кнопка</Button>
                </Flex>
            </Card>

            {/* Inline flex */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Inline Flex</h2>
                <p>
                    Текст до 
                    <Flex inline gap="xs" align="center" style={{ margin: '0 10px' }}>
                        <Button style={{ fontSize: '12px', padding: '4px 8px', minHeight: 'auto', minWidth: 'auto' }}>Inline</Button>
                        <span>элемент</span>
                    </Flex>
                    текст после
                </p>
            </Card>

            {/* Flex properties */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Flex Properties</h2>
                <Flex gap="md" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>Фиксированный</div>
                    <Flex grow={1} justify="center" align="center" style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
                        Растягивается (flex-grow: 1)
                    </Flex>
                    <div style={{ backgroundColor: '#e0e0e0', padding: '10px' }}>Фиксированный</div>
                </Flex>
            </Card>

            {/* Полная ширина и высота */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Full Width & Height</h2>
                <div style={{ height: '100px', border: '1px dashed #ccc' }}>
                    <Flex fullWidth fullHeight justify="center" align="center" style={{ backgroundColor: '#f9f9f9' }}>
                        <Button>Центрированная кнопка</Button>
                    </Flex>
                </div>
            </Card>

            {/* Использование как другой HTML элемент */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Flex как section</h2>
                <Flex as="section" direction="column" gap="md" style={{ border: '1px solid #ccc', padding: '20px' }}>
                    <h3>Заголовок секции</h3>
                    <p>Содержимое секции в flex контейнере</p>
                    <Flex gap="sm">
                        <Button>Действие 1</Button>
                        <Button variant="secondary">Действие 2</Button>
                    </Flex>
                </Flex>
            </Card>
        </div>
    );
};

export default FlexExample;