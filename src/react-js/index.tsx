import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import TableExperiment from './tableExperiment';

const container = document.getElementById('react-container');
const root = ReactDOMClient.createRoot(container);

root.render(
    <React.StrictMode>
        <TableExperiment />
    </React.StrictMode>
);