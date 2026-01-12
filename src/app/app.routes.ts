import { Routes } from '@angular/router';
import { CvPageComponent } from './components/cv-page/cv-page.component';

// Route configuration constants
const DEFAULT_LANGUAGE = 'en';
const ROOT_PATH = '';
const LANGUAGE_PARAM_PATH = ':lang';
const FULL_PATH_MATCH = 'full';

export const routes: Routes = [
    {
        path: ROOT_PATH,
        redirectTo: DEFAULT_LANGUAGE,
        pathMatch: FULL_PATH_MATCH
    },
    {
        path: LANGUAGE_PARAM_PATH,
        component: CvPageComponent
    },
    {
        path: '**',
        redirectTo: DEFAULT_LANGUAGE
    }
];

