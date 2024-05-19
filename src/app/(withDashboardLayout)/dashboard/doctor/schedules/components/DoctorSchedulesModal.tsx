import SNModal from "@/components/Shared/SNModal/SNModal";
import SNForm from "@/components/Forms/SNForm";
import SNDatePicker from "@/components/Forms/SNDatePicker";
import { Grid, Button, Stack } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MultipleSelectField from './MultipleSelectField';
import dayjs, { Dayjs } from 'dayjs';
import { useGetAllSchedulesQuery } from '@/redux/api/scheduleApi';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { useCreateDoctorScheduleMutation } from "@/redux/api/doctorScheduleApi";


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};



const DoctorSchedulesModal = ({open, setOpen}: TProps) => {
    const [selectedDate, setSelectedDate] = useState(
        dayjs(new Date()).toISOString()
     );
  
     const [selectedScheduleIds, setSelectedScheduleIds] = useState<string[]>([]);

     console.log(selectedScheduleIds);
  
     const query: Record<string, any> = {};
  
     if (!!selectedDate) {
        query['startDate'] = dayjs(selectedDate)
           .hour(0)
           .minute(0)
           .millisecond(0)
           .toISOString();
        query['endDate'] = dayjs(selectedDate)
           .hour(23)
           .minute(59)
           .millisecond(999)
           .toISOString();
     }
  
     const { data } = useGetAllSchedulesQuery(query);
     const schedules = data?.data;
  
     const [createDoctorSchedule, { isLoading }] =
     useCreateDoctorScheduleMutation();
  
  
     const onSubmit = async () => {
        try {
           const res = await createDoctorSchedule({
              scheduleIds: selectedScheduleIds,
           });
           console.log(res);
           setOpen(false);
        } catch (error) {
           console.log(error);
        }
     };
    

    return (
        <SNModal open={open} setOpen={setOpen} title="Create a Schedule">
       <Stack direction={'column'} gap={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DatePicker
                  label='Controlled picker'
                  value={dayjs(selectedDate)}
                  onChange={(newValue) =>
                     setSelectedDate(dayjs(newValue).toISOString())
                  }
                  sx={{ width: '100%' }}
               />
            </LocalizationProvider>
            <MultipleSelectField
               schedules={schedules}
               selectedScheduleIds={selectedScheduleIds}
               setSelectedScheduleIds={setSelectedScheduleIds}
            />

            <LoadingButton
               size='small'
               onClick={onSubmit}
               loading={isLoading}
               loadingIndicator='Submitting...'
               variant='contained'
            >
               <span>Submit</span>
            </LoadingButton>
         </Stack>
        </SNModal>
    );
};

export default DoctorSchedulesModal;
