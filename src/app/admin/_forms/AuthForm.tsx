/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/utils/auth-client";
import { createUser } from "@/app/admin/_actions/user-actions";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const createUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;
type CreateUserFormData = z.infer<typeof createUserSchema>;

function LoginForm() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (fomrdata: LoginFormData) => {
    setServerError("");
    setLoading(true);
    await signIn.email(
      {
        email: fomrdata.email,
        password: fomrdata.password,
      },
      {
        onError: (err) => {
          // toast error
          console.log(err.error.cause);
        },
        onSuccess: (res) => {
          // toast success
          // clear form
          reset();
          // redirect to /admin/users
          router.push("/admin/users");
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="admin-form-group">
        <label htmlFor="login-email">Email address</label>
        <input
          id="login-email"
          type="email"
          placeholder="admin@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="admin-error-text">{errors.email.message}</p>
        )}
      </div>
      <div className="admin-form-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="admin-error-text">{errors.password.message}</p>
        )}
      </div>
      {serverError && <p className="admin-server-error">{serverError}</p>}
      <button type="submit" disabled={loading} className="cute-button mt-1">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

function CreateUserForm({ onSuccess }: { onSuccess?: () => void }) {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: CreateUserFormData) => {
    setServerError("");
    setLoading(true);

    await signUp.email(data, {
      onError: (err) => {},
      onSuccess: (res) => {},
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="admin-form-group">
        <label htmlFor="create-name">Full name</label>
        <input
          id="create-name"
          type="text"
          placeholder="John Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className="admin-error-text">{errors.name.message}</p>
        )}
      </div>
      <div className="admin-form-group">
        <label htmlFor="create-email">Email address</label>
        <input
          id="create-email"
          type="email"
          placeholder="user@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="admin-error-text">{errors.email.message}</p>
        )}
      </div>
      <div className="admin-form-group">
        <label htmlFor="create-password">Password</label>
        <input
          id="create-password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
        />
        {errors.password && (
          <p className="admin-error-text">{errors.password.message}</p>
        )}
        <p className="text-xs text-gray-400">Minimum 8 characters</p>
      </div>
      {serverError && <p className="admin-server-error">{serverError}</p>}
      <button type="submit" disabled={loading} className="cute-button mt-1">
        {loading ? "Creating user..." : "Create user"}
      </button>
    </form>
  );
}

const AuthForm = ({
  type,
  onSuccess,
}: {
  type: "login" | "create";
  onSuccess?: () => void;
}) => {
  return (
    <div>
      {type === "login" ? (
        <LoginForm />
      ) : (
        <CreateUserForm onSuccess={onSuccess} />
      )}
    </div>
  );
};

export default AuthForm;
