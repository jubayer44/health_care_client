"use client";

import SNForm from "@/components/Forms/SNForm";
import SNInput from "@/components/Forms/SNInput";
import SNSelectField from "@/components/Forms/SNSelectField";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();

  const { data, isLoading } = useGetDoctorQuery(params?.doctorId);
  const [updateDoctor] = useUpdateDoctorMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.appointmentFee = Number(values.appointmentFee);
    values.id = params?.doctorId;

    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.id) {
        toast.success("Doctor Updated Successfully!!!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    appointmentFee: data?.appointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };
  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Doctor Info
      </Typography>
      {isLoading ? (
        "Loading..."
      ) : (
        <SNForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="name"
                label="Name"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="contactNumber"
                label="Contract Number"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="address"
                label="Address"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="registrationNumber"
                label="Registration Number"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="experience"
                type="number"
                label="Experience"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="appointmentFee"
                type="number"
                label="AppointmentFee"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="qualification"
                label="Qualification"
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="currentWorkingPlace"
                label="Current Working Place"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <SNInput
                name="designation"
                label="Designation"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </SNForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;