import { ComponentProps, useId } from "react";

import FormFieldContext from "@/contexts/forms/form-field-context";
import FormItemContext from "@/contexts/forms/form-item-context";
import { Root } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
} from "react-hook-form";

import useFormField from "@/hooks/use-form-field";

import { cn } from "@/utils/utils";

import { Label } from "@/components/ui/label";

const Form = FormProvider;

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    // Following line is giving an issue between prettier and eslint rules
    // eslint-disable-next-line indent
    ...props
    // eslint-disable-next-line indent
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

function FormItem({ className, ...props }: ComponentProps<"div">) {
    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                data-slot="form-item"
                className={cn("grid gap-2", className)}
                {...props}
            />
        </FormItemContext.Provider>
    );
}

function FormLabel({ className, ...props }: ComponentProps<typeof Root>) {
    const { error, formItemId } = useFormField();

    return (
        <Label
            data-slot="form-label"
            data-error={!!error}
            className={cn("data-[error=true]:text-destructive", className)}
            htmlFor={formItemId}
            {...props}
        />
    );
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            data-slot="form-control"
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            {...props}
        />
    );
}

function FormDescription({ className, ...props }: ComponentProps<"p">) {
    const { formDescriptionId } = useFormField();

    return (
        <p
            data-slot="form-description"
            id={formDescriptionId}
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

function FormMessage({ className, ...props }: ComponentProps<"p">) {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message) : props.children;

    if (!body) {
        return null;
    }

    return (
        <p
            data-slot="form-message"
            id={formMessageId}
            className={cn("text-destructive text-sm font-medium", className)}
            {...props}
        >
            {body}
        </p>
    );
}

export {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
