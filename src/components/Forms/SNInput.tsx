import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
    label?: string;
    type?: string;
    name: string;
    size?: "small" | "medium";
};


const SNInput = ({ label, type="text", name, size="small" }: TInputProps) => {
    const {control} = useFormContext();
    return (
        <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField 
          {...field}
          label={label}
          variant="outlined"
          type={type}
          fullWidth={true}
          size={size}
          />
        )}
      />
    );
};

export default SNInput;