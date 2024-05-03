import { useForm, FormProvider, useFormContext, SubmitHandler, FieldValues } from "react-hook-form"

type TFormProps = {
    children: React.ReactNode
    onSubmit: SubmitHandler<FieldValues>
}

const SNForm = ({children, onSubmit}: TFormProps) => {
    const methods = useForm()
  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
}

    return (
        <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(formSubmit)}>
        {children}
      </form>
    </FormProvider>
    );
};

export default SNForm;