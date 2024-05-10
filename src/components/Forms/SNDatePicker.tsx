import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { SxProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type TDatePicker = {
    name: string;
    size?: "small" | "medium";
    label?: string;
    required?: boolean;
    fullWidth?: boolean;
    sx?: SxProps
};

const SNDatePicker = ({ name, size = "small", label, required, fullWidth = true, sx }: TDatePicker) => {
    const { control } = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={dayjs(new Date().toDateString())}
            render={({field: {onChange, value, ...field}}) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker 
                    label={label}
                    timezone='system'
                    disablePast
                    {...field}
                    onChange={(date)=> onChange(date)}
                    value={value || Date.now()}
                    slotProps={{
                        textField: {
                            size: size,
                            required: required,
                            fullWidth: fullWidth,
                            variant: "outlined",
                            sx: {...sx}
                        }
                    }}
                    />
                </LocalizationProvider>
            )}
        />
    );
};

export default SNDatePicker;