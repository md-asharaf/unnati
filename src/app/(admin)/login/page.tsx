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
import { Loader2, Mail, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { InputOTPForm } from "@/components/ui/otp-input";
import { login } from "@/queries/auth";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
    const router = useRouter();
    const { loading, admin } = useAuth();
    const [showOTP, setShowOTP] = useState(false);
    useEffect(() => {
        if (!loading && admin) {
            router.push("/dashboard");
        }
    }, [admin, loading, router]);

    const form = useForm<Login>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (email: string) => login(email),
        onSuccess: () => {
            toast.success("OTP sent to your email")
            setShowOTP(true)
        },
        onError: () => {
            toast.error("Failed to send OTP. Please try again.")
        },
    })

    if (loading) {
        return <Loader text="Loading..." />
    }
    if (admin) {
        return null;
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-secondary/20 via-secondary/60 to-secondary">
            <Card className="w-full max-w-md border border-border">
                {/* Header with steps */}
                <CardHeader className="flex flex-col items-center space-y-6">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow">
                                <Mail size={18} />
                            </div>
                            <span className="font-medium text-foreground">Email</span>
                        </div>
                        <div className="flex items-center gap-2 ">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow">
                                <Shield size={18} className="text-green-600" />
                            </div>
                            <span className="font-medium text-foreground">Verify</span>
                        </div>
                    </div>

                    <div className="text-center space-y-1">
                        <CardTitle className="text-3xl font-bold text-foreground">
                            Welcome back
                        </CardTitle>
                        <p className="text-muted-foreground text-lg">
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
                                onSubmit={form.handleSubmit(({ email }) => mutate(email))}
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
                                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                                        size={18}
                                                    />
                                                    <Input
                                                        placeholder="Enter your email"
                                                        className="pl-10 bg-input border-border focus-visible:ring-primary"
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
                                    variant="secondary"
                                    className="w-full hover:bg-accent"
                                >
                                    {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Send OTP →"}
                                </Button>
                            </form>
                        </Form>
                    )}

                    <p className="mt-6 text-sm text-center text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline text-foreground">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="underline text-foreground">
                            Privacy Policy
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
