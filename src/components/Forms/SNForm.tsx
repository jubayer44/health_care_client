import { useForm, FormProvider, useFormContext, SubmitHandler, FieldValues } from "react-hook-form"

type TFormConfig = {
  resolver?: any,
  defaultValues?: Record<string, any>
}

type TFormProps = {
    children: React.ReactNode
    onSubmit: SubmitHandler<FieldValues>
} & TFormConfig;

const SNForm = ({children, onSubmit, resolver, defaultValues}: TFormProps) => {
    const formConfig: TFormConfig = {};

    if(resolver){
      formConfig['resolver'] = resolver
    };

    if(defaultValues){
      formConfig['defaultValues'] = defaultValues;
    }

    const methods = useForm(formConfig)
  const formSubmit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    methods.reset()
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