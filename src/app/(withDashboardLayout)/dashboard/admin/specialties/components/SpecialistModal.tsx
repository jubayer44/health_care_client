import SNForm from "@/components/Forms/SNForm";
import SNInput from "@/components/Forms/SNInput";
import SNModal from "@/components/Shared/SNModal/SNModal"
import { Grid, Button } from "@mui/material";
import { FieldValues } from "react-hook-form";
import SNFileUploader from '@/components/Forms/SNFileUploader';
import { modifyPayload } from "@/utils/modifyPayload";
import { useCreateSpecialtyMutation } from "@/redux/api/specialtiesApi";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialistModal = ({open, setOpen}: TProps) => {
    const [createSpecialty] = useCreateSpecialtyMutation();

    const handleSubmit = async (values: FieldValues) => {

        const data = modifyPayload(values);
        try{
        const res = await createSpecialty(data).unwrap();
        if(res?.id){
            toast.success(res?.message || "Specialty Created Successfully");
            setOpen(false);
        }
        }
        catch(err: any){
            console.error(err?.message)
        }
    }

    return (
        <SNModal open={open} setOpen={setOpen} title="Create a Specialty">
            <SNForm onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                   <SNInput name="title" size="small" placeholder="Specialty Name"/> 
                </Grid>
                <Grid item md={6}>
                   <SNFileUploader name="file" label="Choose a file"/>
                </Grid>
            </Grid>
            <Button type="submit" sx={{
                mt: 1
            }}>Create</Button>
            </SNForm>
        </SNModal>
    )
};

export default SpecialistModal;