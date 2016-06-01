import React from 'react';
import Link from 'react-islands/components/Link';
import { withRouter } from 'react-router';

const PageIndex = ({ router }) => (
    <div>
        <h1>Environment: {process.env.NODE_ENV}</h1>
        <p>
            <Link theme="islands" size="s" url={router.createHref('/')}>Go to main page</Link>
        </p>
    </div>
);

export default withRouter(PageIndex);
