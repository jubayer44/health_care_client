"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import { modifyPayload } from "@/utils/modifyPayload";
import { registerPatient } from "../../services/actions/registerPatient";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";
import { loginUser } from "@/services/actions/loginUser";


interface IPatientFormData {
  password: string
  patient: {
    name: string
    email: string
    contactNumber: string
    address: string
  }
}

const RegisterPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPatientFormData>()
  const onSubmit: SubmitHandler<IPatientFormData> = async (values) => {
    const data = modifyPayload(values)
    try{
      const res = await registerPatient(data);
      if(res.success === true){
        const result = await loginUser({email: values.patient.email, password: values.password});
      if(result.success === true){
        toast.success(res.message)
        storeUserInfo({accessToken: result.data.accessToken});
        router.push('/')
      }
      }
    }
    catch(err: any){
      console.error(err.message)
    }
  }
  return (
    <Container
    >
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} alt="" width={50} height={50} />
            </Box>
            <Box>
              <Typography variant="h6" mt={1} fontWeight={700}>
                Patient Register
              </Typography>
            </Box>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth={true}
                    size="small"
                    {...register("patient.name")}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth={true}
                    size="small"
                    {...register("patient.email")}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="password"
                    variant="outlined"
                    type="password"
                    fullWidth={true}
                    size="small"
                    {...register("password")}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Contact"
                    variant="outlined"
                    type="tel"
                    fullWidth={true}
                    size="small"
                    {...register("patient.contactNumber")}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    type="text"
                    fullWidth={true}
                    size="small"
                    {...register("patient.address")}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth={true} sx={{ margin: "10px 0" }}>
                Register
              </Button>
              <Typography component="p" fontSize={18} fontWeight={300} sx={{ textAlign: "center" }}>
                Already have an account?{" "}
                  <Link href="/login" color="blue">
                  Login
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
