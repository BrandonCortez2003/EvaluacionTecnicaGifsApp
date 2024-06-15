import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./shared/components/layout/layout.component'),
        children:[
            {
                path: 'gifs',
                loadComponent: () => import('./business/gifs/gifs.component')
            },
            
            {
                //la primera ruta que se mostrara
                path:'',
                redirectTo: 'gifs',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'gifs'
            }
        ]
    }
];
