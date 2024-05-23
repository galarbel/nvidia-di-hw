import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run nvidia-di-client:serve',
        production: 'nx run nvidia-di-client:preview',
      },
      ciWebServerCommand: 'nx run nvidia-di-client:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
