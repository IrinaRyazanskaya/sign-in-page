export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInSuccess = {
  user: {
    email: string;
  };
  token: string;
};

export type SignInErrorCode =
  | "INVALID_CREDENTIALS"
  | "ACCOUNT_LOCKED"
  | "TOO_MANY_ATTEMPTS"
  | "SERVER_ERROR"
  | "NETWORK_ERROR";

export class SignInApiError extends Error {
  code: SignInErrorCode;
  status: number;

  constructor(message: string, code: SignInErrorCode, status: number) {
    super(message);
    this.name = "SignInApiError";
    this.code = code;
    this.status = status;
  }
}

const MOCK_USER = {
  email: "demo@company.com",
  password: "Password123",
};

const simulateLatency = () => 600 + Math.floor(Math.random() * 800);

export const signIn = async ({ email, password }: SignInPayload): Promise<SignInSuccess> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail.includes("network")) {
        reject(new SignInApiError("Не удалось установить соединение. Проверьте сеть.", "NETWORK_ERROR", 0));
        return;
      }

      if (normalizedEmail.includes("server")) {
        reject(new SignInApiError("На сервере произошла ошибка. Попробуйте позже.", "SERVER_ERROR", 500));
        return;
      }

      if (normalizedEmail.includes("locked")) {
        reject(
          new SignInApiError("Аккаунт заблокирован. Свяжитесь с поддержкой.", "ACCOUNT_LOCKED", 423),
        );
        return;
      }

      if (normalizedEmail.includes("attempt")) {
        reject(
          new SignInApiError("Превышено количество попыток входа. Повторите позже.", "TOO_MANY_ATTEMPTS", 429),
        );
        return;
      }

      if (normalizedEmail !== MOCK_USER.email || password !== MOCK_USER.password) {
        reject(new SignInApiError("Неверный email или пароль.", "INVALID_CREDENTIALS", 401));
        return;
      }

      resolve({
        user: {
          email: MOCK_USER.email,
        },
        token: "mock-token",
      });
    }, simulateLatency());
  });
