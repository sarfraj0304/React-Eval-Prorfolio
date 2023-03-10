import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { Avatar, Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { HiOutlineStar } from "react-icons/hi";
import { BiGitRepoForked } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";
import Link from "next/link";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ data, data2 }) {
  const { items } = data2;
  console.log(items);
  const handleOpenPdf = () => {
    window.open(
      "https://drive.google.com/file/d/1krw77YhXRK1iY9WXAVadAUvl2odpNZka/view?usp=sharing",
      "_blank"
    );
  };

  const handleOpenProfile = () => {
    window.open(`${data.html_url}`, "_blank");
  };

  const handleOpenProject = (url) => {
    window.open(`${url}`, "_blank");
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        // bg="#335a77"
        display="flex"
        m={"auto"}
        mt="20px"
        width={"95%"}
        justifyContent="space-between"
      >
        {/* left div */}
        <Box
          textAlign={"center"}
          // height="500px"
          width="24%"
          // padding="5px"
          // borderRadius={"10px"}
        >
          {/* left 1st div */}
          <Box bg={"#4784b2"} padding="5px" borderRadius={"10px"} color="white">
            <Avatar src={data.avatar_url} size="2xl"></Avatar>
            <Text textAlign={"center"}>{data.name}</Text>
            <Text>@{data.login}</Text>
            <Text w="90%" m={"auto"} textAlign="center">
              Full-stack Developer | JavaScript | Typescript | NodeJS | ReactJS
              | HTML | CSS | Chakra-UI | Next Js
            </Text>
            <Box
              m={"auto"}
              mt={"20px"}
              width="60%"
              display={"flex"}
              justifyContent="space-between"
            >
              <Button onClick={handleOpenPdf} colorScheme={"yellow"}>
                Resume
              </Button>
              <Button onClick={handleOpenProfile} colorScheme={"green"}>
                Follow
              </Button>
            </Box>
          </Box>
          {/* left 2nd div */}
          <Box
            borderRadius={"10px"}
            mt="10px"
            p={"10px"}
            color="white"
            bg={"#4784b2"}
          >
            <Text fontSize={"20px"} fontWeight="bold">
              Education Background
            </Text>
            <Box textAlign="left" mt={"10px"}>
              <Box display="flex">
                <Text as={"mark"}>MASAI SCHOOL</Text>{" "}
                <Text ml={"20px"}>July,2022-Present</Text>
              </Box>
              <Text>Full Stack Web Development (Full Time)</Text>
            </Box>
            <Box textAlign="left" mt={"10px"}>
              <Box display="flex">
                <Text as={"mark"}>GGSIPU</Text>{" "}
                <Text ml={"20px"}>August,2017-December,2020</Text>
              </Box>
              <Text>B.Tech (Information Technology)</Text>
            </Box>
          </Box>
        </Box>
        {/* ``````````````````Projets```````````````````````````````` */}
        {/* right div */}
        <Box width="70%" borderRadius={"10px"} bg="#a8d4f6">
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
                onClick={() => handleOpenProject(el.html_url)}
                key={el.id}
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
      </Box>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.get(`https://api.github.com/users/sarfraj0304`);
  const res2nd = await axios.get(
    `https://api.github.com/search/repositories?q=user:sarfraj0304+fork:true&sort=updated&per_page=10&type=Repositories`
  );
  const data = await res.data;
  const data2 = await res2nd.data;
  return {
    props: { data, data2 },
  };
}
