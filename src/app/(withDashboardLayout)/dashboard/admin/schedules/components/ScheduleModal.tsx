import SNForm from "@/components/Forms/SNForm";
import SNModal from "@/components/Shared/SNModal/SNModal"
import { Grid, Button } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import SNDatePicker from "@/components/Forms/SNDatePicker";
import SNTimePicker from "@/components/Forms/SNTimePicker";
import { useCreateScheduleMutation } from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeFormatter } from "@/utils/timeFormatter";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ScheduleModal = ({open, setOpen}: TProps) => {
    const [createSchedule] = useCreateScheduleMutation();
    

    const handleSubmit = async (values: FieldValues) => {

        values.startDate = dateFormatter(values.startDate);
        values.endDate = dateFormatter(values.endDate);
        values.startTime = timeFormatter(values.startTime);
        values.endTime = timeFormatter(values.endTime);

        try{
        const res = await createSchedule(values).unwrap();
        if(res?.length){
            toast.success(res?.data?.message || "Schedule Created Successfully");
            setOpen(false);
        }
        }
        catch(err: any){
            console.error(err?.message)
        }
    }

    return (
        <SNModal open={open} setOpen={setOpen} title="Create Schedule">
            <SNForm onSubmit={handleSubmit}>
            <Grid container spacing={2} width="400px">
                <Grid item md={12}>
                    <SNDatePicker name="startDate"/>
                </Grid>
                <Grid item md={12}>
                    <SNDatePicker name="endDate"/>
                </Grid>
                <Grid item md={12}>
                    <SNTimePicker name="startTime"/>
                </Grid>
                <Grid item md={12}>
                    <SNTimePicker name="endTime"/>
                </Grid>
            </Grid>
            <Button type="submit" sx={{
                mt: 1
            }}>Create</Button>
            </SNForm>
        </SNModal>
    )
};

export default ScheduleModal;