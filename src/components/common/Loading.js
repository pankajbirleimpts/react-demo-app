import React from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
export default function Loading({ isLoading = false }) {
  return (
    <Dimmer className="custom-loader" active={isLoading} inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}
