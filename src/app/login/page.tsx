"use client";
import { useState } from "react";
import assets from "@/assets";
import SNForm from "@/components/Forms/SNForm";
import SNInput from "@/components/Forms/SNInput";
import { loginUser } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const validationSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const LoginPage = () => {
  const {refetch} = useGetSingleUserQuery({});
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await loginUser(values);
      if (res.success === true) {
        refetch()
        toast.success(res.message);
        storeUserInfo({ accessToken: res.data.accessToken });
        setError("");
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error(err.message);
    }
  };
  return (
    <Container>
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
          {error && (
            <Box>
              <Typography
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  backgroundColor: "red",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  my: 2,
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <SNForm
            onSubmit={handleLogin}
            resolver={zodResolver(validationSchema)}
            defaultValues={{ email: "", password: "" }}
          >
            <Box>
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <SNInput name="email" label="Email" type="email" />
                </Grid>
                <Grid item md={6}>
                  <SNInput name="password" label="Password" type="password" />
                </Grid>
              </Grid>
              <Typography
                component="p"
                fontSize={14}
                fontWeight={300}
                textAlign="right"
              >
                Forgat Password
              </Typography>
              <Button type="submit" fullWidth={true} sx={{ margin: "10px 0" }}>
                Login
              </Button>
              <Typography
                component="p"
                fontSize={18}
                fontWeight={300}
                sx={{ textAlign: "center" }}
              >
                Don&apos;t have an account?{" "}
                <Link href="/register" color="blue">
                  Register
                </Link>
              </Typography>
            </Box>
          </SNForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
