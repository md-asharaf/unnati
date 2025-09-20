"use client";

import { Login, loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { InputOTPForm } from "@/components/ui/otp-input";
import { login } from "@/queries/auth";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const { loading, admin } = useAuth();
    const [showOTP, setShowOTP] = useState(false);

    useEffect(() => {
        if (!loading && admin) {
            router.push("/dashboard");
        }
    }, [admin, loading,router]);

    const form = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: Login) => {
        setShowOTP(false)
        try {
            const { message } = await login(values.email)
            toast.success(message || "OTP sent to email")
            setShowOTP(true)
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Failed to send OTP. Please try again.")
        }
    };

    if (loading) {
        return <Loader text="Loading..." />
    }
    if (admin) {
        return null;
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary">
            <Card className="w-full max-w-md border-none shadow-none bg-transparent">
                {/* Header with steps */}
                <CardHeader className="flex flex-col items-center space-y-6">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Mail size={18} />
                            </div>
                            <span className="font-medium">Email</span>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground">
                                <Shield size={18} color="green" />
                            </div>
                            <span className="font-medium">Verify</span>
                        </div>
                    </div>

                    <div className="text-center space-y-1">
                        <CardTitle className="text-3xl font-bold">
                            Welcome back
                        </CardTitle>
                        <p className="text-primary/50 text-lg">
                            Sign in to admin dashboard
                        </p>
                    </div>
                </CardHeader>

                {/* Form */}
                <CardContent>
                    {showOTP ? (
                        <InputOTPForm email={form.getValues("email")} />
                    ) : (
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50"
                                                        size={18}
                                                    />
                                                    <Input
                                                        placeholder="Enter your email"
                                                        className="pl-10 bg-primary-foreground border-none focus-visible:ring-1 focus-visible:ring-gray-400"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    size="lg"
                                    type="submit"
                                    className="w-full bg-accent hover:bg-accent/80 text-primary"
                                >
                                    Send OTP →
                                </Button>
                            </form>
                        </Form>
                    )}

                    <p className="mt-6 text-sm text-center text-primary/50">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline text-primary">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline text-primary">
                            Privacy Policy
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
