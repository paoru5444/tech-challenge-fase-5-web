import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

const TEST_UID = "e2e-test-uid";
const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "password123";

function base64url(payload: Record<string, unknown>) {
  return Buffer.from(JSON.stringify(payload))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fakeIdToken(uid: string, email: string) {
  const header = base64url({ alg: "none", typ: "JWT" });
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url({
    sub: uid,
    user_id: uid,
    iat: now,
    exp: now + 3600,
    auth_time: now,
    aud: "tech-challenge-fase-3-50140",
    iss: "https://securetoken.google.com/tech-challenge-fase-3-50140",
    email,
    email_verified: true,
    firebase: { sign_in_provider: "password" },
  });
  return `${header}.${payload}.fakesignature`;
}

async function mockSuccessfulLogin(page: Page) {
  await page.route("**/identitytoolkit.googleapis.com/**", async (route) => {
    const url = route.request().url();

    if (url.includes(":signInWithPassword")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          kind: "identitytoolkit#VerifyPasswordResponse",
          localId: TEST_UID,
          email: TEST_EMAIL,
          displayName: "Usuário Teste",
          idToken: fakeIdToken(TEST_UID, TEST_EMAIL),
          registered: true,
          refreshToken: "fake-refresh-token",
          expiresIn: "3600",
        }),
      });
      return;
    }

    if (url.includes(":lookup")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          kind: "identitytoolkit#GetAccountInfoResponse",
          users: [
            {
              localId: TEST_UID,
              email: TEST_EMAIL,
              displayName: "Usuário Teste",
              emailVerified: true,
              providerUserInfo: [
                {
                  providerId: "password",
                  email: TEST_EMAIL,
                  federatedId: TEST_EMAIL,
                },
              ],
              passwordHash: "fake-hash",
              passwordUpdatedAt: Date.now(),
              validSince: String(Math.floor(Date.now() / 1000)),
              disabled: false,
              createdAt: String(Date.now()),
              lastLoginAt: String(Date.now()),
            },
          ],
        }),
      });
      return;
    }

    await route.continue();
  });
}

test.describe("Login", () => {
  test("should be abel to do login with faz login com credenciais válidas e chega ao dashboard", async ({
    page,
  }) => {
    await mockSuccessfulLogin(page);

    await page.goto("/sign-in");

    await page.getByPlaceholder("john.doe@mail.com").fill(TEST_EMAIL);
    await page.getByPlaceholder("✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎").fill(TEST_PASSWORD);
    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL("/");
    await expect(page.getByText("Organize suas atividades")).toBeVisible();
  });
  //   page,
  // }) => {
  //   await mockFailedLogin(page);

  //   await page.goto("/sign-in");

  //   await page.getByPlaceholder("john.doe@mail.com").fill(TEST_EMAIL);
  //   await page
  //     .getByPlaceholder("✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎✴︎")
  //     .fill("wrong-password");
  //   await page.getByRole("button", { name: "Entrar" }).click();

  //   await expect(page).toHaveURL("/sign-in");
  // });
});
