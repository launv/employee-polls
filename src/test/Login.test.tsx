import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Login from "../components/Login";
import store from "../store/store";

describe("Login", () => {
  it("should show error message when login failed", async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </MemoryRouter>
    );

    const loginButton = screen.getByText(/login/i);

    const userNameInput = screen.getByPlaceholderText("Username");
    fireEvent.change(userNameInput, { target: { value: "sarahedo" } });

    const passwordInput = screen.getByPlaceholderText("Password");
    fireEvent.change(passwordInput, { target: { value: "password1234" } });

    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);

    await waitFor(
      () => {
        const message = screen.getByText("Invalid user ID or password");
        expect(message).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  });
});
