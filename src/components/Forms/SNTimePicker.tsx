import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

type TTimePicker = {
    name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
};

const SNTimePicker = ({ name, size = "small", label, required, fullWidth = true, sx }: TTimePicker) => {
    const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={dayjs(new Date().toDateString())}
            render={({field: {onChange, value, ...field}}) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker 
                    label={label}
                    timezone='system'
                    {...field}
                    onChange={(time)=> onChange(time)}
                    value={value}
                    slotProps={{
                        textField: {
                            size: size,
                            required: required,
                            fullWidth: fullWidth,
                            variant: "outlined",
                            sx: {...sx},
                            error: isError,
                  helperText: isError
                    ? (formState.errors[name]?.message as string)
                    : "",
                        }
                    }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default SNTimePicker;