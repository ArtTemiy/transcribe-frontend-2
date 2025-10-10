# Компонент Spacer

Простой и универсальный компонент для заполнения свободного пространства в flex-контейнерах. Использует `flex-grow: 1` по умолчанию для автоматического растягивания и занятия доступного пространства.

## Основные возможности

- ✅ Автоматическое заполнение свободного пространства (`flex-grow: 1`)
- ✅ Настраиваемые flex свойства (`grow`, `shrink`, `basis`)
- ✅ Полиморфность (может рендериться как любой HTML элемент)
- ✅ Минимальный размер и вес
- ✅ TypeScript поддержка
- ✅ Простота использования

## Импорт

```tsx
import Spacer from '~/components/ui/Spacer';
// или
import { Spacer } from '~/components/ui/Spacer';
```

## Базовое использование

```tsx
// Простое заполнение пространства
<Flex>
  <Button>Слева</Button>
  <Spacer />
  <Button>Справа</Button>
</Flex>

// Навигационная панель
<Flex as="nav" align="center">
  <div>Logo</div>
  <Spacer />
  <Button>Войти</Button>
</Flex>
```

## Свойства (Props)

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `className` | `string` | - | Дополнительные CSS классы |
| `grow` | `number` | `1` | CSS свойство flex-grow |
| `shrink` | `number` | `1` | CSS свойство flex-shrink |
| `basis` | `string \| number` | `'auto'` | CSS свойство flex-basis |
| `style` | `React.CSSProperties` | - | Inline стили |
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML элемент для рендера |

## Примеры использования

### Базовое заполнение пространства

```tsx
<Flex align="center">
  <Button>Начало</Button>
  <Spacer />
  <Button>Конец</Button>
</Flex>
```

### Навигационная панель

```tsx
<Flex as="nav" align="center">
  <Logo />
  <Spacer />
  <Flex gap="md">
    <NavLink>Главная</NavLink>
    <NavLink>О нас</NavLink>
    <Button>Войти</Button>
  </Flex>
</Flex>
```

### Множественные Spacer'ы

```tsx
// Равномерное распределение элементов
<Flex align="center">
  <Button>1</Button>
  <Spacer />
  <Button>2</Button>
  <Spacer />
  <Button>3</Button>
  <Spacer />
  <Button>4</Button>
</Flex>
```

### Разные значения flex-grow

```tsx
<Flex align="center">
  <Button>Начало</Button>
  <Spacer grow={1} />  {/* Занимает 1 часть */}
  <Button>Середина</Button>
  <Spacer grow={2} />  {/* Занимает 2 части */}
  <Button>Конец</Button>
</Flex>
```

### Вертикальный Spacer

```tsx
<Flex direction="column" style={{ height: '200px' }}>
  <Button>Верх</Button>
  <Spacer />
  <Button>Низ</Button>
</Flex>
```

### Карточка с действиями

```tsx
<Card>
  <h3>Заголовок</h3>
  <p>Содержимое карточки</p>
  <Flex align="center">
    <span>Дата создания</span>
    <Spacer />
    <Flex gap="sm">
      <Button variant="secondary">Редактировать</Button>
      <Button>Сохранить</Button>
    </Flex>
  </Flex>
</Card>
```

### Форма с выравниванием кнопок

```tsx
<form>
  <Input placeholder="Имя" />
  <Input placeholder="Email" />
  <Flex>
    <Spacer />  {/* Прижимает кнопки к правому краю */}
    <Flex gap="sm">
      <Button variant="secondary">Отмена</Button>
      <Button type="submit">Отправить</Button>
    </Flex>
  </Flex>
</form>
```

### Кастомные flex свойства

```tsx
<Flex>
  <Button>Фиксированный</Button>
  <Spacer 
    grow={3}           // Растет в 3 раза быстрее
    shrink={0}         // Не сжимается
    basis="100px"      // Базовый размер 100px
  />
  <Button>Другой фиксированный</Button>
</Flex>
```

### Spacer с содержимым

```tsx
<Flex align="center">
  <span>Начало</span>
  <Spacer style={{ textAlign: 'center', backgroundColor: '#f0f0f0' }}>
    Содержимое Spacer'а
  </Spacer>
  <span>Конец</span>
</Flex>
```

### Полиморфный Spacer

```tsx
// Как span для inline контекста
<Flex align="center">
  <span>Текст</span>
  <Spacer as="span" />
  <span>Другой текст</span>
</Flex>

// Как section для семантики
<Flex as="main">
  <aside>Боковая панель</aside>
  <Spacer as="section">
    Основное содержимое
  </Spacer>
</Flex>
```

### Сложный пример - панель инструментов

```tsx
<Flex align="center" gap="md">
  {/* Группа меню */}
  <Flex gap="xs">
    <Button>Файл</Button>
    <Button>Правка</Button>
    <Button>Вид</Button>
  </Flex>
  
  <Spacer />  {/* Основное пространство */}
  
  {/* Инструменты */}
  <Flex gap="xs">
    <Button>🔍</Button>
    <Button>⚙️</Button>
  </Flex>
  
  <Spacer grow={0.5} />  {/* Меньшее пространство */}
  
  {/* Пользователь */}
  <Flex gap="xs">
    <Button>Помощь</Button>
    <Button>Профиль</Button>
  </Flex>
</Flex>
```

## Когда использовать Spacer

### ✅ Хорошие случаи использования:
- Навигационные панели с логотипом слева и меню справа
- Карточки с заголовком и действиями по краям
- Формы с кнопками, прижатыми к правому краю
- Равномерное распределение элементов
- Вертикальное центрирование в высоких контейнерах

### ❌ Когда лучше использовать другие подходы:
- Для фиксированных отступов используйте [`gap`](../Flex/index.tsx:30) в Flex
- Для выравнивания используйте [`justify`](../Flex/index.tsx:18) в Flex
- Для простого центрирования используйте [`justify="center"`](../Flex/index.tsx:18)

## Сравнение с альтернативами

```tsx
// ❌ Вместо фиксированного отступа
<Flex>
  <Button>1</Button>
  <Spacer style={{ width: '20px' }} />
  <Button>2</Button>
</Flex>

// ✅ Лучше использовать gap
<Flex gap="md">
  <Button>1</Button>
  <Button>2</Button>
</Flex>

// ✅ Spacer для заполнения пространства
<Flex>
  <Button>Слева</Button>
  <Spacer />
  <Button>Справа</Button>
</Flex>
```

## Стилизация

Компонент имеет минимальные базовые стили:

```scss
.spacer {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
    min-width: 0;
    min-height: 0;
}
```

Вы можете переопределить стили через:
- `className` - дополнительные CSS классы
- `style` - inline стили
- CSS переменные (если добавлены)

## Доступность

- Spacer по умолчанию не влияет на доступность
- При добавлении содержимого учитывайте семантику
- Используйте подходящий HTML элемент через `as` prop

## Производительность

- Минимальный размер компонента
- Не добавляет лишних DOM узлов
- Использует только CSS flex свойства

## Тестирование

Для просмотра всех возможностей компонента перейдите на страницу [`/spacer-test`](../../../routes/spacer-test.tsx:1).

## Совместимость

Компонент совместим со всеми современными браузерами, поддерживающими CSS Flexbox.