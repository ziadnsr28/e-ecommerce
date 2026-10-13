"use client";
import { useState } from "react";
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  Headphones,
  ShieldCheck as SslIcon,
  Users,
  Star,
} from "lucide-react";
import register from "@/assets/rigister.png";
import Image from "next/image";
import Link from "next/link";
import { FieldError } from "@/components/ui/field-error";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginSchema, loginSchemaType } from "@/lib/Schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Field } from "@/components/ui/field";
import { signIn } from "next-auth/react";
import { GoogleIcon, FacebookIcon } from "@/components/ui/social-icons";
import { authInputClass } from "@/lib/constants";

const OAUTH_PROVIDERS = [
  { name: "Continue with Google", Icon: GoogleIcon },
  { name: "Continue with Facebook", Icon: FacebookIcon },
];

const TRUST_POINTS = [
  { Icon: Truck, label: "Free Delivery" },
  { Icon: ShieldCheck, label: "Secure Payment" },
  { Icon: Headphones, label: "24/7 Support" },
];

const CARD_BADGES = [
  { Icon: SslIcon, label: "SSL Secured" },
  { Icon: Users, label: "80k+ Users" },
  { Icon: Star, label: "4.9 Rating" },
];

const inputClass = authInputClass;

// Renders the login page with credentials form, OAuth sign-in options, and marketing information.
export default function FreshCartLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      keepSignedIn: false,
    },
  });

  // Submits credentials to NextAuth signIn handler and navigates to the storefront or safe callbackUrl on success.
  async function onSubmit(formData: loginSchemaType) {
    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    if (response?.ok) {
      toast.success("Login successful!");
      // Read callbackUrl from URL if present and validate that it is a safe relative path
      const params = new URLSearchParams(window.location.search);
      const rawCallbackUrl = params.get("callbackUrl");
      let destination = "/";
      if (rawCallbackUrl && rawCallbackUrl.startsWith("/") && !rawCallbackUrl.startsWith("//")) {
        destination = rawCallbackUrl;
      }
      router.replace(destination);
    } else {
      toast.error("Failed to login. Please try again.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* Left: illustration + marketing copy (hidden on mobile) */}
        <div className="hidden flex-col items-center text-center md:flex">
          <div className="relative flex h-[20rem] w-[20rem] items-center justify-center lg:h-[25rem] lg:w-[25rem] mb-6">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-green-200/60 blur-sm" />

            <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
              <Image
                src={register}
                alt="FreshCart shopping cart full of fresh vegetables"
                width={300}
                height={300}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <h2 className="mb-3 text-xl font-extrabold text-gray-900 lg:text-2xl">
            FreshCart - Your One-Stop Shop for Fresh Products
          </h2>
          <p className="mb-6 max-w-[38ch] text-sm leading-relaxed text-gray-500">
            Join thousands of happy customers who trust FreshCart for their
            daily grocery needs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {TRUST_POINTS.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                <Icon className="h-4 w-4 text-green-600" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right: login card */}
        <div className="mx-auto w-full max-w-[420px] rounded-[20px] border border-gray-200 bg-white px-7 py-8 shadow-sm sm:px-8 animate-fade-in-up">
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="mb-2 flex items-center gap-1.5 text-lg font-extrabold text-gray-900">
              <ShoppingCart className="h-5 w-5 text-green-600" />
              FreshCart
            </div>
            <h1 className="mb-1 text-xl font-extrabold text-gray-900">
              Welcome Back!
            </h1>
            <p className="text-[13.5px] text-gray-500">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          <div className="mb-5 flex flex-col gap-3">
            {OAUTH_PROVIDERS.map(({ name, Icon }) => (
              <button
                key={name}
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-gray-200 py-2.5 text-[13.5px] font-semibold text-gray-900 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100 active:scale-[0.98]"
              >
                <Icon className="h-4 w-4" />
                {name}
              </button>
            ))}
          </div>

          <div className="mb-5 flex items-center gap-3 text-[11px] font-medium tracking-wide text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            OR CONTINUE WITH EMAIL
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <Field label="Email Address">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className={inputClass}
                    />
                    {fieldState.error && <FieldError message={fieldState.error.message} />}
                  </>
                )}
              />
            </Field>

            <div className="relative mb-1">
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`${inputClass} pr-14`}
                    />
                    {fieldState.error && <FieldError message={fieldState.error.message} />}
                  </>
                )}
              />
              <div className="mb-1.5 flex items-center mt-5 justify-between">
                <label className="text-[13px] font-semibold text-gray-900">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-semibold text-green-700 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 bottom-[45px] -translate-y-1/2 text-xs text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <Controller
              name="keepSignedIn"
              control={control}
              render={({ field }) => (
                <label className="mb-5 mt-3 flex items-center gap-2 text-[13px] text-gray-600">
                  <input
                    type="checkbox"
                    checked={Boolean(field.value)}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="accent-green-600"
                  />
                  Keep me signed in
                </label>
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[10px] bg-green-600 py-3 text-[15px] font-bold text-white transition-all duration-200 hover:bg-green-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>







          <p className="mt-5 text-center text-sm text-gray-500">
            New to FreshCart?{" "}
            <Link href="/register" className="font-bold text-green-700 hover:underline">
              Create an account
            </Link>
          </p>

          <div className="mt-6 flex items-center justify-center gap-5 border-t border-gray-100 pt-5">
            {CARD_BADGES.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
                <Icon className="h-3.5 w-3.5" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}