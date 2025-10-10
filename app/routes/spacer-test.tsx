import type { Route } from './+types/spacer-test';

import SpacerExample from '~/components/ui/Spacer/SpacerExample';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'Spacer Component Test' },
        { name: 'description', content: 'Тестирование компонента Spacer' },
    ];
}

export default function SpacerTest() {
    return <SpacerExample />;
}