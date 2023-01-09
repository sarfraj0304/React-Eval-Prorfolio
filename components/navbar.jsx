import { Box } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Box
      backgroundColor="#122635"
      padding="20px"
      color="gray.200"
      fontWeight="bold"
      fontSize="20px"
    >
      <Link href="/">Sarfraj Ahmad Raza</Link>
      <Link style={{ marginLeft: "40px" }} href="/projects">
        Projects
      </Link>
    </Box>
  );
};

export default Navbar;
