"use client";

import { useActionState } from "react";
import {
  signInAction,
  signUpAction,
  type AuthFormState,
} from "@/app/actions/auth";
import { fieldControlClass } from "@/components/editor/Field";
import { Button } from "@/components/ui/button";

const initialState: AuthFormState = {};

export function SignInForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signInAction, initialState);

  return (
    <form action={action} className="mt-8 space-y-4 text-left">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">E-posta</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="ornek@mail.com"
          className={fieldControlClass}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Şifre</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={fieldControlClass}
        />
      </label>
      {state.error ? (
        <p className="text-sm text-primary">{state.error}</p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 w-full rounded-full">
        {pending ? "Giriş yapılıyor…" : "Giriş yap"}
      </Button>
    </form>
  );
}

export function SignUpForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(signUpAction, initialState);

  return (
    <form action={action} className="mt-8 space-y-4 text-left">
      <input type="hidden" name="next" value={next} />
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">E-posta</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="ornek@mail.com"
          className={fieldControlClass}
        />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Şifre</span>
        <input
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          placeholder="En az 6 karakter"
          className={fieldControlClass}
        />
      </label>
      {state.error ? (
        <p className="text-sm text-primary">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-foreground">{state.success}</p>
      ) : null}
      <Button type="submit" disabled={pending} className="h-11 w-full rounded-full">
        {pending ? "Hesap oluşturuluyor…" : "Hesap oluştur"}
      </Button>
    </form>
  );
}
