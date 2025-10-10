import type { Route } from './+types/textarea-test';

import TextAreaExample from '~/components/ui/input/TextArea/TextAreaExample';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'TextArea Component Test' },
        { name: 'description', content: 'Тестирование компонента TextArea' },
    ];
}

export default function TextAreaTest() {
    return <TextAreaExample />;
}