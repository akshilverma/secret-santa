import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const passwordRegexPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}|[\]\\:";'<>?,./])[A-Za-z\d!@#$%^&*()_+-={}|[\]\\:";'<>?,./]{8,}$/;
const passwordPatternMessage =
    "Password should contain at least 1 lowercase character, 1 uppercase character, 1 number, 1 special character and should be at least 8 characters long";

const registerFormSchema = z
    .object({
        username: z.string().min(3, "Minimum 3 characters required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .regex(passwordRegexPattern, passwordPatternMessage),
        confirm: z.string().regex(passwordRegexPattern, passwordPatternMessage),
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
        console.log("submit", values);
    }

    return (
        <Form {...registerForm}>
            <form
                onSubmit={registerForm.handleSubmit(onRegisterFormSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={registerForm.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
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
                            <FormLabel>Email</FormLabel>
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
                            <FormLabel>Password</FormLabel>
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
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default RegisterForm;
