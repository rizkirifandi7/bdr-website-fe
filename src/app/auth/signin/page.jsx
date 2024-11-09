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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";

import LogoBDR from "@/assets/logobdr.png";

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

const Login = () => {
	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLogin = async (data) => {
		try {
			console.log(data);
		} catch (error) {
			console.error("Error login:", error);
		}
	};

	return (
		<div className="flex h-screen w-full items-center justify-between">
			<div className="flex justify-center items-center w-full h-full bg-white">
				<Card className="w-[450px]">
					<CardHeader>
						<div className="flex flex-col justify-center items-center my-8 gap-2">
							<Image src={LogoBDR} alt="" className="w-20" />
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
													className="text-white placeholder:text-slate-400 p-6 text-base"
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
													className="text-white placeholder:text-slate-400 p-6 text-base"
													placeholder="masukkan password..."
													{...field}
													type="password"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full p-6 ">
									Login
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default Login;
