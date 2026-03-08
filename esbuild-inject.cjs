// esbuild inject file to handle CommonJS modules
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
globalThis.require = require;
