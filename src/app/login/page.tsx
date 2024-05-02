"use client"

import assets from "@/assets";
import { loginUser } from "@/services/actions/loginUser";
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
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { storeUserInfo } from "@/services/auth.services";

export interface IUserLoginData {
  email: string
  password: string
}

const LoginPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserLoginData>()
  const onSubmit: SubmitHandler<IUserLoginData> = async (values) => {
    try{
      const res = await loginUser(values);
      if(res.success === true){
        toast.success(res.message)
        storeUserInfo({accessToken: res.data.accessToken});
        router.push('/')
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
                Login Sunshine Health Care
              </Typography>
            </Box>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Grid container spacing={2} my={1}>
                
                <Grid item md={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    fullWidth={true}
                    size="small"
                    {...register("email")}
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth={true}
                    size="small"
                    {...register("password")}
                  />
                </Grid>
              </Grid>
              <Typography component="p" fontSize={14} fontWeight={300} textAlign="right" >Forgat Password</Typography>
              <Button type="submit" fullWidth={true} sx={{ margin: "10px 0" }}>
                Login
              </Button>
              <Typography component="p" fontSize={18} fontWeight={300} sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                  <Link href="/register" color="blue">
                  Register
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
