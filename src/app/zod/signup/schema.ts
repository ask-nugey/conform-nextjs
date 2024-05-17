import { Intent } from "@conform-to/react";
import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export function createSignupSchema(
  intent: Intent | null,
  options?: {
    // isUsernameUnique is only defined on the server
    isUsernameUnique: (username: string) => Promise<boolean>;
  }
) {
  return z
    .object({
      username: z
        .string({ required_error: "Username is required" }) // ユーザ名は必須
        .regex(
          /^[a-zA-Z0-9]+$/,
          "Invalid username: only letters or numbers are allowed" // ユーザ名は英数字のみ許可
        )
        // スキーマをパイプしてユーザ名が有効な場合のみ実行
        .pipe(
          z.string().superRefine((username, ctx) => {
            const isValidatingUsername =
              intent === null ||
              (intent.type === "validate" &&
                intent.payload.name === "username"); // ユーザ名のバリデーションを実行するかどうかをチェック

            if (!isValidatingUsername) {
              ctx.addIssue({
                code: "custom",
                message: conformZodMessage.VALIDATION_SKIPPED, // バリデーションがスキップされたことを示すメッセージ
              });
              return;
            }

            if (typeof options?.isUsernameUnique !== "function") {
              ctx.addIssue({
                code: "custom",
                message: conformZodMessage.VALIDATION_UNDEFINED, // バリデーションが定義されていないことを示すメッセージ
                fatal: true, // 致命的なエラー
              });
              return;
            }

            return options.isUsernameUnique(username).then((isUnique) => {
              if (!isUnique) {
                ctx.addIssue({
                  code: "custom",
                  message: "Username is already used", // ユーザ名が既に使用されていることを示すメッセージ
                });
              }
            });
          })
        ),
    })
    .and(
      z
        .object({
          password: z.string({ required_error: "Password is required" }), // パスワードは必須
          confirmPassword: z.string({
            required_error: "Confirm password is required", // 確認用パスワードは必須
          }),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Password does not match", // パスワードが一致しない場合のメッセージ
          path: ["confirmPassword"], // エラーが表示されるフィールド
        })
    );
}
