"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { createUser } from "../_actions/user-actions";
import { redirect, RedirectType } from "next/navigation";

const userSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  // const router = useRouter();

  const onSubmit = async (data: unknown) => {
    const result = userSchema.safeParse(data);
    if (!result.success) {
      // toast e message
      console.error(result.error.cause || "Invalid form data");
      return;
    }

    const parsedData = result.data;

    const createdUser = await createUser(parsedData);
    if (!createdUser.success) {
      // toast e message
      console.error(createdUser.message || "Failed to create user");
      // clear form
      return;
    }
    reset();
    redirect("/admin/users", RedirectType.replace);

    console.log(parsedData);
  };

  return (
    <div>
      <h1 className="page-heading">Create User</h1>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
        <label htmlFor="name">Name</label>
        <input {...register("name")} placeholder="Name" />
        {errors.name && <p>{errors.name.message}</p>}
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          placeholder="Password"
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          {...register("confirmPassword")}
          placeholder="Confirm Password"
          type="password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <button className="add-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
