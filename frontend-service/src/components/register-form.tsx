import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    LOGIN_TITLE,
    REGISTER_CONFIRM_PASSWORD,
    REGISTER_DESCRIPTION,
    REGISTER_EMAIL,
    REGISTER_LOGIN_DESCRIPTION,
    REGISTER_PASSWORD,
    REGISTER_PASSWORD_PATTERN_MESSAGE,
    REGISTER_SUBMIT,
    REGISTER_TITLE,
    REGISTER_USERNAME,
} from "#src/utils/constants.ts";
import { encodeBase64 } from "#src/utils/utils.ts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "#src/components/ui/card.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "#src/components/ui/form.tsx";
import { Input } from "#src/components/ui/input.tsx";

import Button from "./ui/button";

const passwordRegexPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|[\]\\:";'<>?,./])[A-Za-z\d!@#$%^&*()_+-={}|[\]\\:";'<>?,./]{8,}$/;

const registerFormSchema = z
    .object({
        username: z.string().min(3, "Minimum 3 characters required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .regex(passwordRegexPattern, REGISTER_PASSWORD_PATTERN_MESSAGE),
        confirm: z
            .string()
            .regex(passwordRegexPattern, REGISTER_PASSWORD_PATTERN_MESSAGE),
    })
    .refine((data) => data.confirm === data.password, {
        message: "Passwords do not match",
        path: ["confirm"],
    });

type registerFormType = z.infer<typeof registerFormSchema>;

function RegisterForm() {
    const registerForm = useForm<registerFormType>({
        resolver: zodResolver(registerFormSchema),
    });

    function onRegisterFormSubmit(values: registerFormType) {
        const { username, email, password, confirm } = values;
        const encodedPassword = encodeBase64(password);
        const encodedConfirm = encodeBase64(confirm);
        const config: AxiosRequestConfig = {
            url: `${import.meta.env.VITE_SECRET_SANTA_SERVICE_BASE_URL}/register`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            data: {
                username,
                email,
                password: encodedPassword,
                confirm: encodedConfirm,
            },
        };

        // TODO: handle error and success responses
        axios(config);
    }

    return (
        <Card>
            <CardHeader className="text-center">
                <CardTitle>{REGISTER_TITLE}</CardTitle>
                <CardDescription>{REGISTER_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent className="justify-center">
                <Form {...registerForm}>
                    <form
                        onSubmit={registerForm.handleSubmit(
                            onRegisterFormSubmit,
                        )}
                        className="space-y-4"
                    >
                        <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{REGISTER_USERNAME}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="santa-claus"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{REGISTER_EMAIL}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="santa.claus@north.pole"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{REGISTER_PASSWORD}</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={registerForm.control}
                            name="confirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        {REGISTER_CONFIRM_PASSWORD}
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {REGISTER_SUBMIT}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="justify-around">
                <CardDescription className="text-center">
                    {REGISTER_LOGIN_DESCRIPTION}{" "}
                    <Button variant="link" size="xs" asChild>
                        {/* TODO: maybe add pre-fetching to mimic nextjs' Link */}
                        <a href="/login">{LOGIN_TITLE}</a>
                    </Button>
                </CardDescription>
            </CardFooter>
        </Card>
    );
}

export default RegisterForm;
