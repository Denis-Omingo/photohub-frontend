import "@testing-library/jest-dom";
import { beforeAll } from 'vitest';

beforeAll(() => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
});