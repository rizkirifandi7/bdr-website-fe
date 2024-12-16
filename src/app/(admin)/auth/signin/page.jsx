"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { setCookie } from "@/actions/cookies";

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email must be valid email.",
    })
    .trim()
    .min(1, "Email cannot be empty"),
  password: z.string().trim().min(1, "Password cannot be empty"),
});

const PageLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    router.prefetch("/dashboard/home");
    router.prefetch("/dashboard-home/menu");
  }, [router]);

  const onLogin = async (data) => {
    setIsLoading(true);
    const { email, password } = data;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { role, data: { token } } = response.data;

      setCookie("auth_session", token);
      toast.success("Login berhasil.");

      if (role === "admin" || role === "pegawai") {
        router.push("/dashboard/home");
      } else if (role === "adminhome") {
        router.push("/dashboard-home/menu");
      } else {
        toast.error("Anda tidak memiliki akses.");
      }
    } catch (error) {
      toast.error("Email atau password salah.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-between">
      <div className="flex justify-center items-center w-full h-full bg-white">
        <Card className="w-[450px]">
          <CardHeader>
            <div className="flex flex-col justify-center items-center my-8 gap-2 ">
              <Image src="/logobdr.png" width={80} height={80} alt="" />
              <p className="text-base font-bold">Bakso Dono Reborn</p>
            </div>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Masukan email dan password anda untuk masuk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onLogin)}
                className=" space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="p-6 text-base"
                          placeholder="masukkan email..."
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className=" p-6 text-base"
                          placeholder="masukkan password..."
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <button
                  type="submit"
                  className={`w-full p-3 rounded-lg flex items-center justify-center bg-black text-white hover:bg-slate-800 ${isLoading ? "cursor-not-allowed" : ""
                    }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin h-5 w-5 mr-3 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PageLogin;