import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";

const TopRatedDoctors = async () => {
  const res = await fetch(
    "http://localhost:5000/api/v1/doctor?page=1&limit=5",
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data: doctors } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20, 20, 0.1)",
        clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Our Top Rated Doctors
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          and top-quality surgery facilities right here.{" "}
        </Typography>
      </Box>
      <Container sx={{ margin: "30px auto" }}>
        <Grid container spacing={4}>
          {doctors.slice(2, 5).map((doctor: any) => (
            <Grid item md={4} xs={12} key={doctor.id}>
              <Card>
                <Box>
                  <Image
                    src={doctor.profilePhoto}
                    alt={doctor.name + " photo"}
                    width={500}
                    height={500}
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h4">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <PlaceIcon /> {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", pb: "20px" }}
                >
                  <Button size="small">Book Now</Button>
                  <Button size="small">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}
          >
            View ALL
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
