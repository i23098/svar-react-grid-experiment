import React from "react";

import { Grid, Willow } from "@svar-ui/react-grid";
import "@svar-ui/react-grid/all.css";

import type { IColumnConfig, IRow } from "@svar-ui/react-grid";

export default function TableExperiment() {
    const columns: IColumnConfig[] = [
        { id: "city", header: "City" },
        { id: "description", header: "Description" }
    ];

    const data: IRow[] = [{
        "city": "New York",
        "description": "The city that never sleeps, famous for its landmarks and culture."
    }, {
        "city": "London",
        "description": "A historic global city, home to the Royal Family and iconic double-decker buses."
    }, {
        "city": "Tokyo",
        "description": "A vibrant mix of modern skyscrapers and traditional temples."
    }, {
        "city": "Paris",
        "description": "Known as the 'City of Love' and home to the Eiffel Tower."
    }, {
        "city": "Sydney",
        "description": "Australia's largest city, famous for its Opera House and harbor."
    }];

    return (
        <div style={{ width: "80%" }}>
            <Willow>
                <Grid
                    columns={columns}
                    data={data}
                />
            </Willow>
        </div>
    );
}
