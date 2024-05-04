"use client";
import assets from "@/assets";
import SNForm from "@/components/Forms/SNForm";
import SNInput from "@/components/Forms/SNInput";
import { loginUser } from "@/services/actions/loginUser";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { registerPatient } from "../../services/actions/registerPatient";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const patientValidationSchema = z.object({
  password: z.string().min(5, "Password must be at least 5 characters"),
  patient: z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Email is required"),
    contactNumber: z
      .string()
      .regex(/^\d{11}$/, "Please enter a valid phone number"),
    address: z.string().min(5, "Address is required"),
  }),
});

const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
}

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res.success === true) {
        const result = await loginUser({
          email: values.patient.email,
          password: values.password,
        });
        if (result.success === true) {
          toast.success(res.message);
          storeUserInfo({ accessToken: result.data.accessToken });
          setError("");
          router.push("/");
        } else {
          setError(res.message);
        }
      }
    } catch (err: any) {
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
                Patient Register
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
            onSubmit={handleRegister}
            defaultValues={defaultValues}
            resolver={zodResolver(patientValidationSchema)}
          >
            <Box>
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <SNInput label="Name" name="patient.name" />
                </Grid>
                <Grid item md={6}>
                  <SNInput label="Email" type="email" name="patient.email" />
                </Grid>
                <Grid item md={6}>
                  <SNInput label="password" type="password" name="password" />
                </Grid>
                <Grid item md={6}>
                  <SNInput
                    label="Contact"
                    type="tel"
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid item md={6}>
                  <SNInput label="Address" type="text" name="patient.address" />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth={true} sx={{ margin: "10px 0" }}>
                Register
              </Button>
              <Typography
                component="p"
                fontSize={18}
                fontWeight={300}
                sx={{ textAlign: "center" }}
              >
                Already have an account?{" "}
                <Link href="/login" color="blue">
                  Login
                </Link>
              </Typography>
            </Box>
          </SNForm>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
