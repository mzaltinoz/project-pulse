type SupabaseAuthErrorDetails = {
  message?: string;
  code?: string;
  name?: string;
  status?: number;
};

export function getAuthErrorMessage(error: SupabaseAuthErrorDetails) {
  const message = error.message ?? "";
  const normalizedMessage = message.toLowerCase();

  if (normalizedMessage.includes("invalid login credentials")) {
    return "E-posta adresiniz veya şifreniz hatalı.";
  }

  if (
    normalizedMessage.includes("user already registered") ||
    normalizedMessage.includes("already registered")
  ) {
    return "Bu e-posta adresi zaten kullanımda.";
  }

  console.error("Supabase auth error", {
    message: error.message,
    code: error.code,
    name: error.name,
    status: error.status,
  });

  return "Bir hata oluştu, lütfen tekrar deneyin.";
}
