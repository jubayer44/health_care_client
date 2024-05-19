import { Box, Stack, Typography, styled } from "@mui/material";


const StyleInformationBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#f4f7fe",
    borderRadius: theme.spacing(1),
    width: "45%",
    padding: "8px 16px",
    '& p': {
        fontWeigth: 600,
    }
}))

const DoctorInformation = ({data}: any) => {
    return (
        <>
            <Typography variant="h5" color="primary.main">Personal Information</Typography>
                    <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap="wrap" >
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Name</Typography>
                            <Typography>{data?.name}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Email</Typography>
                            <Typography>{data?.email}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Contact</Typography>
                            <Typography>{data?.contactNumber}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Gender</Typography>
                            <Typography>{data?.gender}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Address</Typography>
                            <Typography>{data?.address}</Typography>
                        </StyleInformationBox>
                        
                    </Stack>
                    <Typography variant="h5" color="primary.main">Professional Information</Typography>
                    <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap="wrap" >
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Role</Typography>
                            <Typography>{data?.role}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Qualification</Typography>
                            <Typography>{data?.qualification}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Designation</Typography>
                            <Typography>{data?.designation}</Typography>
                        </StyleInformationBox>
                        <StyleInformationBox>
                            <Typography variant="caption" color="secondary">Appointment Fee</Typography>
                            <Typography>{data?.appointmentFee}</Typography>
                        </StyleInformationBox>
                        
                    </Stack>
        </>
    )
};

export default DoctorInformation;