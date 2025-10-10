import type { Route } from './+types/flex-test';

import FlexExample from '~/components/ui/Flex/FlexExample';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Flex Component Test' },
        { name: 'description', content: 'Тестирование компонента Flex' },
    ];
}

export default function FlexTest() {
    return <FlexExample />;
}