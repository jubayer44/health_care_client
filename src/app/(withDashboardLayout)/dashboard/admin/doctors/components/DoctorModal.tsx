import SNForm from "@/components/Forms/SNForm";
import SNInput from "@/components/Forms/SNInput";
import SNSelectField from "@/components/Forms/SNSelectField";
import SNFullScreenModal from "@/components/Shared/SNModal/SNFullScreenModal";
import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({open, setOpen}: TProps) => {
  const [createDoctor] = useCreateDoctorMutation();

    
    const handleFormSubmit = async (values: FieldValues) => {

      values.doctor.experience = Number(values.doctor.experience);
      values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
      const data = modifyPayload(values);

        try{
        const res = await createDoctor(data).unwrap();
        if(res?.id){
            toast.success(res.message || "Doctor Created Successfully");
            setOpen(false);
        }
        }
        catch(err: any){
            console.error(err?.message)
        }
    };

    const defaultValues = {
        doctor: {
          email: "",
          name: "",
          contactNumber: "",
          address: "",
          registrationNumber: "",
          gender: "",
          experience: 0,
          appointmentFee: 0,
          qualification: "",
          currentWorkingPlace: "",
          designation: "",
          profilePhoto: "",
        },
        password: "",
      };
    

    return (
        <SNFullScreenModal open={open} setOpen={setOpen} title="Create a Dcotor">
            <SNForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.name"
              label="Name"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.email"
              type="email"
              label="Email"
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="password"
              type="password"
              label="Password"
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.contactNumber"
              label="Contract Number"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.address"
              label="Address"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.registrationNumber"
              label="Registration Number"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.experience"
              type="number"
              label="Experience"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNSelectField
              items={Gender}
              name="doctor.gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.appointmentFee"
              type="number"
              label="AppointmentFee"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.qualification"
              label="Qualification"
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <SNInput
              name="doctor.designation"
              label="Designation"
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit">Create</Button>
      </SNForm>
        </SNFullScreenModal>
    )
};

export default DoctorModal;