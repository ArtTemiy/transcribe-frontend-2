import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Настройка MSW для Node.js (SSR)
export const server = setupServer(...handlers);