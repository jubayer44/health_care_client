import { Box, Container, Link, Stack, Typography } from "@mui/material";
import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";
import Image from "next/image";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" gap={4} justifyContent={"center"}>
          <Typography color={"white"} component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color={"white"}>Health Plans</Typography>
          <Typography color={"white"}>Medicine</Typography>
          <Typography color={"white"}>Diagnostics</Typography>
          <Typography color={"white"}>NGOs</Typography>
        </Stack>
        <Stack direction="row" gap={2} justifyContent="center" py={3}>
          <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          <Image src={instagramIcon} width={30} height={30} alt="facebook" />
          <Image src={twitterIcon} width={30} height={30} alt="facebook" />
          <Image src={linkedIcon} width={30} height={30} alt="facebook" />
        </Stack>
        <Box sx={{
          border: "1px dashed lightgray",
          my: 2
        }}></Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color={"white"}>
            Copyright ©2024. Sunshine Health Care All rights reserved.
          </Typography>
          <Typography variant="h5" fontWeight={600} color={"white"}>
            <Box component="span" color="primary.main">
              Sunshine
            </Box>{" "}
            Health Care
          </Typography>
          <Typography color={"white"}>
            Terms & Conditions | Privacy Policy
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
