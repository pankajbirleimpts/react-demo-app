import React from "react";
import { Grid } from "semantic-ui-react";
export default function NoPage() {
  return (
    <Grid centered columns={6} style={{ height: "400px" }}>
      <Grid.Row verticalAlign="middle">
        <Grid.Column>
          <h2 className="ui icon header">
            <i aria-hidden="true" className="settings icon"></i>
            400 Error
            <div className="sub header">The page is not found</div>
          </h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
