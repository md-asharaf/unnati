"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifyLogin, verifyLoginSchema } from "@/schemas";
import { verifyLogin } from "@/queries/auth";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export function InputOTPForm({ email }: { email: string }) {
    const { login } = useAuth();
    const form = useForm<VerifyLogin>({
        resolver: zodResolver(verifyLoginSchema),
        defaultValues: {
            email,
            otp: "",
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (values: VerifyLogin) => verifyLogin(values.email, values.otp),
        onSuccess: ({ data }) => {
            login(data.admin, data.accessToken, data.refreshToken);
            toast.success("Login successful!")
        },
        onError: () => {
            toast.error("Invalid OTP. Please try again.")
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => mutate(values))} className="space-y-6">
                <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>OTP : </FormLabel>
                            <FormControl className="flex flex-col items-center">
                                <InputOTP
                                    maxLength={6}
                                    minLength={6}
                                    value={field.value}
                                    onChange={field.onChange}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/80 text-primary"
                >
                    {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : "Verify OTP →"}
                </Button>
            </form>
        </Form>
    );
}
