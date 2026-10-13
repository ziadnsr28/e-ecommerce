"use client";
import { useState } from "react";
import { CheckCircle2, Zap, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterSchemaType } from "@/lib/Schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "@/components/ui/field-error";
import { postregister } from "@/services/auth.service";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleIcon, FacebookIcon } from "@/components/ui/social-icons";
import { authInputClass } from "@/lib/constants";

const FEATURES = [
  {
    icon: CheckCircle2,
    title: "Premium Quality",
    description: "High-quality products sourced from trusted suppliers",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your data and payments are completely protected",
  },
];

const OAUTH_PROVIDERS = [
  { name: "Google", Icon: GoogleIcon },
  { name: "Facebook", Icon: FacebookIcon },
];

const inputClass = authInputClass;

// Renders the registration page with new user account form, OAuth sign-up options, and marketing features.
export default function FreshCartSignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { isSubmitting }} = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
  });

  // Submits registration details to the signup API and redirects to login on success.
  async function onSubmit(formData: RegisterSchemaType) {
  try {
    const data = await postregister(formData);
    if (data?.message === "success") {
      toast.success("Account created successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      toast.error(data?.message || "Failed to create account. Please try again.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to create account. Please try again.");
  }
}


  return (
    <div className="mx-auto max-w-[1180px] px-6 py-14">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
        {/* Left: welcome / value props */}
        <div>
          <h1 className="mb-3 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>
          <p className="mb-8 max-w-[46ch] text-base leading-relaxed text-gray-500">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <div className="mb-9 flex flex-col gap-5">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex items-start gap-3.5">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-green-100 text-green-700">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h3 className="mb-0.5 text-[15px] font-bold text-gray-900">
                    {title}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-gray-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-[440px] rounded-2xl border border-gray-200 bg-green-50 px-6 py-5">
            <div className="mb-2.5 flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white">
                S
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900">
                  Sarah Johnson
                </div>
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3 w-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[13.5px] leading-relaxed text-gray-700">
              FreshCart has completely transformed my grocery shopping
              experience. The quality is outstanding and delivery is always
              on time. Highly recommend!
            </p>
          </div>
        </div>

        {/* Right: sign up form card */}
        <div className="rounded-[20px] border border-gray-200 bg-white px-8 py-8 shadow-sm">
          <h2 className="mb-1.5 text-[22px] font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mb-6 text-[13.5px] text-gray-500">
            Start your fresh journey with FreshCart today
          </p>

          <div className="mb-5 grid grid-cols-2 gap-3">
            {OAUTH_PROVIDERS.map(({ name, Icon }) => (
              <button
                key={name}
                type="button"
                className="flex items-center justify-center gap-2 rounded-[10px] border border-gray-200 px-2.5 py-2.5 text-[13.5px] font-semibold text-gray-900 transition hover:border-gray-300 hover:bg-gray-100"
              >
                <Icon className="h-4 w-4" />
                {name}
              </button>
            ))}
          </div>

          <div className="mb-5 flex items-center gap-3 text-xs text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            OR
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <Field label="Full Name">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} type="text" placeholder="John Doe" className={inputClass} />
                    {fieldState.error && <FieldError message={fieldState.error.message} />}
                  </>
                )}
              />
            </Field>

            <Field label="Email Address">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} type="email" placeholder="you@example.com" className={inputClass} />
                    {fieldState.error && <FieldError message={fieldState.error.message} />}
                  </>
                )}
              />
            </Field>

            <Field label="Password" hint="At least 8 characters, including letters and numbers">
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={`${inputClass} pr-14`}
                      />
                      {fieldState.error && <FieldError message={fieldState.error.message} />}
                    </>
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </Field>

            <Field label="Confirm Password">
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} type="password" placeholder="Re-enter your password" className={inputClass} />
                    {fieldState.error && <FieldError message={fieldState.error.message} />}
                  </>
                )}
              />
            </Field>

            <Field label="Phone Number">
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <Input {...field} type="tel" placeholder="+1 (555) 000-0000" className={inputClass} />
                    {fieldState.error && <FieldError message={fieldState.error.message} />}
                  </>
                )}
              />
            </Field>

            <Controller
              name="terms"
              control={control}
              render={({ field, fieldState }) => (
                <div className="mb-6 mt-1.5">
                  <label className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-gray-500">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="mt-0.5 flex-none accent-green-600"
                    />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="font-semibold text-green-700 hover:underline">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="font-semibold text-green-700 hover:underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {fieldState.error && <FieldError message={fieldState.error.message} />}
                </div>
              )}
            />


            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[10px] bg-green-600 py-3.5 text-[15px] font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? <div className="flex items-center justify-center">
                <Spinner className="text-white" />
              </div> : "Create My Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-green-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Renders a registration form field with a label, required asterisk, and optional helper hint.
function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-[13px] font-semibold text-gray-900">
        {label}
        <span className="ml-0.5 text-red-500">*</span>
      </label>
      {children}
      {hint && <div className="mt-1.5 text-[11.5px] text-gray-500">{hint}</div>}
    </div>
  );
}