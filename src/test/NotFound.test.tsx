import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import NotFound from "../components/NotFound";

describe("NotFound", () => {
  test("should match snapshot", async () => {
    const html = render(
      <MemoryRouter>
        <Provider store={store}>
          <NotFound />
        </Provider>
      </MemoryRouter>
    );

    expect(html).toMatchSnapshot();
  });
});
