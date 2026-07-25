import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IUser } from "~/domain/entities/user";
import { authenticatorReducer } from "~/modules/auth/store/slices";
import Home from "~/modules/home/screens/home";
import { taskReducer } from "~/modules/home/store/slices";
import { setupReducer } from "~/modules/setup/store/slices";

vi.mock("~/firebase/config", () => ({
  db: {},
  auth: {},
}));

const { collectionMock, docMock, setDocMock, getDocsMock, queryMock } =
  vi.hoisted(() => ({
    collectionMock: vi.fn(),
    docMock: vi.fn(),
    setDocMock: vi.fn(),
    getDocsMock: vi.fn(),
    queryMock: vi.fn((ref: unknown) => ref),
  }));

vi.mock("firebase/firestore", () => ({
  collection: collectionMock,
  doc: docMock,
  setDoc: setDocMock,
  getDoc: vi.fn(),
  getDocs: getDocsMock,
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: queryMock,
}));

const mockUser: IUser = {
  uid: "user-1",
  email: "user@example.com",
  displayName: "Test User",
  photoURL: null,
  emailVerified: true,
  phoneNumber: null,
  isAnonymous: false,
  providerId: "password",
  tenantId: null,
};

function renderHome() {
  const store = configureStore({
    reducer: {
      user: authenticatorReducer,
      task: taskReducer,
      setup: setupReducer,
    },
    preloadedState: {
      user: {
        user: mockUser,
        isAuthenticated: true,
        status: "idle" as const,
        error: null,
      },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/"]}>
        <Home />
      </MemoryRouter>
    </Provider>,
  );

  return store;
}

describe("Create Task", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    collectionMock.mockReturnValue({ path: "users/user-1/tasks" });
    docMock.mockReturnValue({ id: "generated-task-id" });
    setDocMock.mockResolvedValue(undefined);
    getDocsMock.mockResolvedValue({ docs: [] });
  });

  it("should be able to create a new task", async () => {
    const user = userEvent.setup();
    const store = renderHome();

    await waitFor(() => expect(getDocsMock).toHaveBeenCalled());

    await user.click(
      screen.getByRole("button", { name: "Criar nova atividade" }),
    );

    await user.type(
      screen.getByPlaceholderText("Assistir ao módulo 01*"),
      "Nova atividade de teste",
    );
    await user.type(
      screen.getByPlaceholderText("Finalizar as aulas 01 e 02*"),
      "Descrição de teste",
    );

    await user.click(screen.getByRole("button", { name: "Criar atividade" }));

    await waitFor(() => expect(setDocMock).toHaveBeenCalledTimes(1));

    expect(setDocMock).toHaveBeenCalledWith(
      { id: "generated-task-id" },
      {
        title: "Nova atividade de teste",
        description: "Descrição de teste",
        checked: false,
      },
    );

    expect(
      await screen.findByText("Nova atividade de teste"),
    ).toBeInTheDocument();

    expect(store.getState().task.tasks).toHaveLength(1);
    expect(store.getState().task.tasks[0]).toMatchObject({
      id: "generated-task-id",
      title: "Nova atividade de teste",
      checked: false,
    });

    expect(screen.queryByText("Nova atividade")).not.toBeInTheDocument();
  });
});
