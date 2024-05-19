"use client";

import { useState } from "react";
import { useGetMyProfileQuery, useUpdateMyProfileMutation } from "@/redux/api/myProfileApi";
import { Box, Button, Container, Stack, Typography, styled } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "next/image";
import DoctorInformation from "./components/DoctorInformation";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SNAutoFileUploader from "@/components/Forms/SNAutoFileUploader";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const DoctorProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data, isLoading } = useGetMyProfileQuery({});
    const [updateMyProfile, {isLoading: uploading}] = useUpdateMyProfileMutation();

    const fileUploadHandler = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("data", JSON.stringify({}));
        try{
            await updateMyProfile(formData);
        }
        catch(e){console.error(e)}
    }

    if (isLoading) return <Typography>Loading...</Typography>
    return (
        <>
        <ProfileUpdateModal
           open={isModalOpen}
           setOpen={setIsModalOpen}
           id={data?.id}
        />
        <Container sx={{ mt: 4 }}>
           <Grid container spacing={4}>
              <Grid xs={12} md={4}>
                 <Box
                    sx={{
                       width: '100%',
                       overflow: 'hidden',
                       borderRadius: 1,
                    }}
                 >
                    <Image
                       height={300}
                       width={400}
                       src={data?.profilePhoto}
                       alt='User Photo'
                    />
                 </Box>
                 <Box my={3}>
                    {uploading ? (
                       <p>Uploading...</p>
                    ) : (
                       <SNAutoFileUploader
                          name='file'
                          label='Choose Your Profile Photo'
                          icon={<CloudUploadIcon />}
                          onFileUpload={fileUploadHandler}
                          variant='text'
                       />
                    )}
                 </Box>

                 <Button
                    fullWidth
                    endIcon={<ModeEditIcon />}
                    onClick={() => setIsModalOpen(true)}
                 >
                    Edit Profile
                 </Button>
              </Grid>
              <Grid xs={12} md={8}>
                 <DoctorInformation data={data} />
              </Grid>
           </Grid>
        </Container>
     </>
    )
};

export default DoctorProfile;