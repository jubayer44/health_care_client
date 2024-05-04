import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
    label?: string;
    type?: string;
    name: string;
    size?: "small" | "medium";
    sx?: SxProps;
    disabled?: boolean;
    required?: boolean;
};


const SNInput = ({ label, type="text", name, size="small", sx, disabled, required=false }: TInputProps) => {
    const {control} = useFormContext();
    return (
        <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField 
          {...field}
          sx={{...sx}}
          label={label}
          variant="outlined"
          type={type}
          fullWidth={true}
          size={size}
          disabled={disabled}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          />
        )}
      />
    );
};

export default SNInput;