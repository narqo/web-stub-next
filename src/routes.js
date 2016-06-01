import App from './components/App';
import PageIndex from './components/PageIndex';
import PageNotFound from './components/PageNotFound';

export default function createRoutes() {
    return {
        path: '/',
        component: App,
        indexRoute: { component: PageIndex },
        childRoutes: [
            { path: '*', component: PageNotFound },
        ]
    };
}
