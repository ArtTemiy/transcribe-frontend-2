import React from 'react';

import { Button } from '../Button';
import { Card } from '../Card';
import Flex from '../Flex';
import Spacer from './index';

export const SpacerExample: React.FC = () => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f5f7f9' }}>
            <h1>Примеры использования компонента Spacer</h1>

            {/* Базовый пример */}
            <Card>
                <h2>Базовое использование Spacer</h2>
                <p>Spacer заполняет свободное пространство между элементами</p>
                <Flex align="center" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>Слева</Button>
                    <Spacer />
                    <Button variant="secondary">Справа</Button>
                </Flex>
            </Card>

            {/* Навигационная панель */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Навигационная панель</h2>
                <Flex as="nav" align="center" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Logo</div>
                    <Spacer />
                    <Flex gap="md">
                        <Button variant="secondary">Главная</Button>
                        <Button variant="secondary">О нас</Button>
                        <Button>Войти</Button>
                    </Flex>
                </Flex>
            </Card>

            {/* Множественные Spacer'ы */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Множественные Spacer'ы</h2>
                <p>Несколько Spacer'ов равномерно распределяют пространство</p>
                <Flex align="center" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>1</Button>
                    <Spacer />
                    <Button>2</Button>
                    <Spacer />
                    <Button>3</Button>
                    <Spacer />
                    <Button>4</Button>
                </Flex>
            </Card>

            {/* Разные значения grow */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Разные значения flex-grow</h2>
                <p>Spacer'ы с разными значениями grow занимают пропорциональное пространство</p>
                <Flex align="center" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>Начало</Button>
                    <Spacer grow={1} style={{ backgroundColor: '#e3f2fd', textAlign: 'center', padding: '5px' }}>
                        grow=1
                    </Spacer>
                    <Button>Середина</Button>
                    <Spacer grow={2} style={{ backgroundColor: '#f3e5f5', textAlign: 'center', padding: '5px' }}>
                        grow=2 (в 2 раза больше)
                    </Spacer>
                    <Button>Конец</Button>
                </Flex>
            </Card>

            {/* Вертикальный Spacer */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Вертикальный Spacer</h2>
                <p>Spacer работает и в вертикальных flex-контейнерах</p>
                <Flex 
                    direction="column" 
                    style={{ 
                        border: '1px dashed #ccc', 
                        padding: '10px', 
                        height: '200px' 
                    }}
                >
                    <Button fullWidth>Верхняя кнопка</Button>
                    <Spacer />
                    <Button fullWidth variant="secondary">Нижняя кнопка</Button>
                </Flex>
            </Card>

            {/* Карточка с действиями */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Карточка с действиями</h2>
                <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
                    <h3 style={{ margin: '0 0 8px 0' }}>Заголовок карточки</h3>
                    <p style={{ margin: '0 0 16px 0', color: '#666' }}>
                        Описание карточки с некоторым содержимым
                    </p>
                    <Flex align="center">
                        <span style={{ fontSize: '14px', color: '#888' }}>
                            Создано: 10.10.2024
                        </span>
                        <Spacer />
                        <Flex gap="sm">
                            <Button variant="secondary">Редактировать</Button>
                            <Button>Сохранить</Button>
                        </Flex>
                    </Flex>
                </div>
            </Card>

            {/* Форма с кнопками */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Форма с кнопками</h2>
                <form style={{ border: '1px dashed #ccc', padding: '20px' }}>
                    <Flex direction="column" gap="md">
                        <input 
                            type="text" 
                            placeholder="Имя" 
                            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                        <Flex>
                            <Spacer />
                            <Flex gap="sm">
                                <Button variant="secondary" type="button">
                                    Отмена
                                </Button>
                                <Button type="submit">
                                    Отправить
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </form>
            </Card>

            {/* Кастомные свойства */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Кастомные flex свойства</h2>
                <p>Spacer с кастомными значениями flex-grow, flex-shrink и flex-basis</p>
                <Flex align="center" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <Button>Фиксированный</Button>
                    <Spacer 
                        grow={3} 
                        shrink={0} 
                        basis="100px"
                        style={{ 
                            backgroundColor: '#fff3e0', 
                            textAlign: 'center', 
                            padding: '10px',
                            border: '1px solid #ffcc02'
                        }}
                    >
                        grow=3, shrink=0, basis=100px
                    </Spacer>
                    <Button>Другой фиксированный</Button>
                </Flex>
            </Card>

            {/* Spacer как другой элемент */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Spacer как span</h2>
                <p>Spacer может рендериться как любой HTML элемент</p>
                <Flex align="center" style={{ border: '1px dashed #ccc', padding: '10px' }}>
                    <span>Начало</span>
                    <Spacer as="span" style={{ backgroundColor: '#e8f5e8', textAlign: 'center' }}>
                        Spacer как span
                    </Spacer>
                    <span>Конец</span>
                </Flex>
            </Card>

            {/* Сложный пример */}
            <Card style={{ marginTop: '20px' }}>
                <h2>Сложный пример - панель инструментов</h2>
                <div style={{ 
                    border: '1px solid #ddd', 
                    borderRadius: '8px', 
                    padding: '12px',
                    backgroundColor: '#f8f9fa'
                }}>
                    <Flex align="center" gap="md">
                        <Flex gap="xs">
                            <Button variant="secondary">Файл</Button>
                            <Button variant="secondary">Правка</Button>
                            <Button variant="secondary">Вид</Button>
                        </Flex>
                        
                        <Spacer />
                        
                        <Flex gap="xs">
                            <Button variant="secondary">🔍</Button>
                            <Button variant="secondary">⚙️</Button>
                        </Flex>
                        
                        <Spacer grow={0.5} />
                        
                        <Flex gap="xs">
                            <Button variant="secondary">Помощь</Button>
                            <Button>Профиль</Button>
                        </Flex>
                    </Flex>
                </div>
            </Card>
        </div>
    );
};

export default SpacerExample;