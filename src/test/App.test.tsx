import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import store from "../store/store";

describe("App", () => {
  it("should render the login form", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const loginButton = screen.getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
  });
});
