import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { JmModule } from './main.module';

import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
	enableProdMode();
}

const platform = platformBrowserDynamic();
platform.bootstrapModule(JmModule);