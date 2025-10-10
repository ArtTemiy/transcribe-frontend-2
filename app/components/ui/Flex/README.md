# Компонент Flex

Универсальный компонент для создания flex-контейнеров с полным набором CSS Flexbox свойств.

## Основные возможности

- ✅ Все CSS Flexbox свойства
- ✅ Предустановленные размеры gap
- ✅ Кастомные значения gap
- ✅ TypeScript поддержка
- ✅ Полиморфный компонент (может рендериться как любой HTML элемент)
- ✅ Совместимость с существующими стилями проекта

## Импорт

```tsx
import Flex from '~/components/ui/Flex';
// или
import { Flex } from '~/components/ui/Flex';
```

## Базовое использование

```tsx
// Простой горизонтальный flex
<Flex gap="md">
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <div>Элемент 3</div>
</Flex>

// Вертикальный flex
<Flex direction="column" gap="sm">
  <div>Элемент 1</div>
  <div>Элемент 2</div>
</Flex>
```

## Свойства (Props)

### Основные свойства

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `children` | `React.ReactNode` | - | Дочерние элементы |
| `className` | `string` | - | Дополнительные CSS классы |

### Flex Direction

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` | Направление главной оси |

```tsx
<Flex direction="column">...</Flex>
<Flex direction="row-reverse">...</Flex>
```

### Justify Content (главная ось)

| Свойство | Тип | Описание |
|----------|-----|----------|
| `justify` | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | Выравнивание по главной оси |

```tsx
<Flex justify="center">...</Flex>
<Flex justify="between">...</Flex>
<Flex justify="evenly">...</Flex>
```

### Align Items (поперечная ось)

| Свойство | Тип | Описание |
|----------|-----|----------|
| `align` | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | Выравнивание по поперечной оси |

```tsx
<Flex align="center">...</Flex>
<Flex align="start">...</Flex>
<Flex align="stretch">...</Flex>
```

### Align Content (многострочные контейнеры)

| Свойство | Тип | Описание |
|----------|-----|----------|
| `alignContent` | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly' \| 'stretch'` | Выравнивание строк в многострочном контейнере |

```tsx
<Flex wrap="wrap" alignContent="center">...</Flex>
```

### Flex Wrap

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `wrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` | Перенос элементов |

```tsx
<Flex wrap="wrap">...</Flex>
<Flex wrap="wrap-reverse">...</Flex>
```

### Gap (промежутки)

| Свойство | Тип | Описание |
|----------|-----|----------|
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | Промежуток между элементами |
| `gapX` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | Горизонтальный промежуток |
| `gapY` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | Вертикальный промежуток |

#### Предустановленные размеры gap:
- `xs` = 4px
- `sm` = 8px  
- `md` = 16px
- `lg` = 24px
- `xl` = 30px

```tsx
// Предустановленные размеры
<Flex gap="md">...</Flex>
<Flex gapX="lg" gapY="sm">...</Flex>

// Кастомные размеры
<Flex gap={20}>...</Flex>
<Flex gapX={15} gapY={25}>...</Flex>
```

### Flex свойства контейнера

| Свойство | Тип | Описание |
|----------|-----|----------|
| `flex` | `string \| number` | CSS свойство flex |
| `grow` | `number` | CSS свойство flex-grow |
| `shrink` | `number` | CSS свойство flex-shrink |
| `basis` | `string \| number` | CSS свойство flex-basis |

```tsx
<Flex grow={1}>...</Flex>
<Flex flex="1 0 auto">...</Flex>
<Flex basis="200px">...</Flex>
```

### Дисплей

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `inline` | `boolean` | `false` | Использовать inline-flex вместо flex |

```tsx
<Flex inline>...</Flex>
```

### Размеры

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `fullWidth` | `boolean` | `false` | Занимать всю доступную ширину |
| `fullHeight` | `boolean` | `false` | Занимать всю доступную высоту |

```tsx
<Flex fullWidth>...</Flex>
<Flex fullHeight>...</Flex>
```

### Полиморфность

| Свойство | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `as` | `keyof JSX.IntrinsicElements` | `'div'` | HTML элемент для рендера |

```tsx
<Flex as="section">...</Flex>
<Flex as="header">...</Flex>
<Flex as="main">...</Flex>
```

## Примеры использования

### Центрирование контента

```tsx
<Flex justify="center" align="center" fullHeight>
  <div>Центрированный контент</div>
</Flex>
```

### Навигационная панель

```tsx
<Flex as="nav" justify="between" align="center" fullWidth>
  <Logo />
  <Flex gap="md">
    <NavLink>Главная</NavLink>
    <NavLink>О нас</NavLink>
    <NavLink>Контакты</NavLink>
  </Flex>
  <Button>Войти</Button>
</Flex>
```

### Карточки с равной высотой

```tsx
<Flex gap="lg" align="stretch">
  <Card>Контент карточки 1</Card>
  <Card>Контент карточки 2 с большим количеством текста</Card>
  <Card>Карточка 3</Card>
</Flex>
```

### Форма с кнопками

```tsx
<Flex direction="column" gap="md">
  <Input placeholder="Email" />
  <Input placeholder="Пароль" type="password" />
  <Flex gap="sm" justify="end">
    <Button variant="secondary">Отмена</Button>
    <Button>Войти</Button>
  </Flex>
</Flex>
```

### Адаптивная сетка

```tsx
<Flex wrap="wrap" gap="md" justify="center">
  <Card style={{ minWidth: '300px', flex: '1 1 300px' }}>Карточка 1</Card>
  <Card style={{ minWidth: '300px', flex: '1 1 300px' }}>Карточка 2</Card>
  <Card style={{ minWidth: '300px', flex: '1 1 300px' }}>Карточка 3</Card>
</Flex>
```

## Тестирование

Для просмотра всех возможностей компонента перейдите на страницу `/flex-test`.

## Совместимость

Компонент использует современные CSS Flexbox свойства и совместим со всеми современными браузерами.