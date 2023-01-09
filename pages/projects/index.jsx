import { Box, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { BiGitRepoForked } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";
import { HiOutlineStar } from "react-icons/hi";

const Projects = ({ data }) => {
  const { items } = data;
  const handleOpenProfile = () => {
    window.open(`${data.html_url}`, "_blank");
  };
  const handleOpenProject = (url) => {
    window.open(`${url}`, "_blank");
  };
  return (
    <Box
      //   height="600px"
      width="90%"
      borderRadius={"10px"}
      bg="#a8d4f6"
      m={"auto"}
      mt="30px"
    >
      <Box>
        <Heading textAlign={"center"}>Projects</Heading>
      </Box>
      {/* main holder Projects */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(3,1fr)"
        gap={"20px"}
        padding="10px"
      >
        {/* inner seperate Projects */}

        {items.map((el) => (
          <Box
            key={el.id}
            onClick={() => handleOpenProject(el.html_url)}
            borderRadius="10px"
            padding={"10px"}
            bg={"#4784b2"}
            color="white"
            mt={"20px"}
            cursor="pointer"
          >
            <Text
              w={"100%"}
              display={"flex"}
              // justifyContent="space-around"
              alignItems={"center"}
              fontSize="20px"
              mb={"10px"}
            >
              <BsFolder fontSize={"25px"} />
              {el.name}
            </Text>
            {/* fork count data */}
            <Box
              display={"flex"}
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Box
                width={"35%"}
                display={"flex"}
                justifyContent="space-between"
                alignItems={"center"}
                fontSize="14px"
              >
                <Text
                  w={"50%"}
                  display={"flex"}
                  justifyContent="space-around"
                  alignItems={"center"}
                >
                  <HiOutlineStar fontSize={"20px"} />
                  {el.forks_count}
                </Text>
                <Text
                  w={"50%"}
                  display={"flex"}
                  justifyContent="space-around"
                  alignItems={"center"}
                >
                  <BiGitRepoForked fontSize={"20px"} />
                  {el.stargazers_count}
                </Text>
              </Box>
              <Box>
                <Text>{el.language}</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Projects;

export async function getStaticProps() {
  const res = await axios.get(
    `https://api.github.com/search/repositories?q=user:sarfraj0304+fork:true&sort=updated&per_page=10&type=Repositories`
  );

  const data = await res.data;
  return {
    props: { data },
  };
}
