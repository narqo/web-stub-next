import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { configureStore } from './store';
import createRoutes from './routes';

export default () => ({ url }, next) => {
    const store = configureStore();
    const routes = createRoutes(store);

    match({ routes, location: url }, (err, redirect, props) => {
        if (err) {
            next(err);
        } else if (redirect) {
            next(null, redirect);
        } else if (props) {
            const initialHtml = renderToString(
                <Provider store={store}>
                    <RouterContext {...props}/>
                </Provider>
            );

            const initialState = store.getState();
            const locals = {
                title: 'My Page',
                html: initialHtml,
                links: ['https://yastatic.net/bem-components/3.0.0/desktop/bem-components.css'],
                scripts: ['/build/assets/client.js'],
            };

            next(null, null, renderFullPage(locals, initialState));
        } else {
            next();
        }
    });
};

function renderFullPage(locals, initialState = {}) {
    const links = locals.links.map(url => `<link rel="stylesheet" href="${url}"/>`);
    const scripts = locals.scripts.map(url => `<script src="${url}"></script>`);

    return `<!doctype html>
        <html>
        <head>
            <meta charset="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <title>${locals.title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ${links}
        </head>
        <body>
            <div id="approot">${locals.html}</div>
            <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
            ${scripts}
        </body>
        </html>`;
}
