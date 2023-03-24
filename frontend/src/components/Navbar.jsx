import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Text,
  useColorMode,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Spacer,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsCart, BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutActionFn } from "../redux/authReducer/authActions";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  let { isAuth } = useSelector((store) => store.authReducer);

  const btnRef = React.useRef();
  const { colorMode, toggleColorMode } = useColorMode();

  // HANDLING LOGOUT FUNCTION.
  const handleLogoutOnClick = () => {
    dispatch(userLogoutActionFn());
  };

  return (
    <Box
      h={"80px"}
      position={"sticky"}
      top="0"
      zIndex={"10300"}
      px={{ base: "0px", md: "15px", xl: "15px" }}
    >
      {/* MAIN BOX  */}
      <Flex
        alignSelf={"center"}
        h="100%"
        border="0px solid white"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {/* 1ST BOX LOGO  AND CATEGORIES  */}
        {/* LOGO  */}
        <Link to="/">
          <Box ml="15px" color="#FF595A" fontWeight={"bold"}>
            Logo
          </Box>
        </Link>

        <HStack
          border="0px solid blue"
          spacing={{ base: "8px", md: "13px", xl: "15px" }}
          display={{ base: "flex", md: "flex", xl: "flex" }}
          alignItems={"center"}
        >
          // big display;
          <Box
            display={{ base: "none", md: "flex", xl: "flex" }}
            alignItems={"center"}
            gap={5}
          >
            {isAuth && (
              <Link to="/">
                <Text>Notes</Text>
              </Link>
            )}
            <Link to="#">
              <Text>About</Text>
            </Link>
            <Link to="#">
              <Text> Contacts</Text>
            </Link>
            {!isAuth && (
              <Link to="/login">
                <Button colorScheme={"blue"}>Login</Button>
              </Link>
            )}
            {!isAuth && (
              <Link to="/signup">
                <Button colorScheme={"blue"}>Signup</Button>
              </Link>
            )}
            {isAuth && (
              <Button onClick={handleLogoutOnClick} colorScheme={"red"}>
                Logout
              </Button>
            )}
            <Box
              display={{ base: "none", md: "block", xl: "block" }}
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              onClick={() => toggleColorMode()}
              p={"-2.5"}
              width="fit-content"
              zIndex={100000}
            >
              {colorMode === "light" ? (
                <BsToggle2Off fontSize={"25px"} color="black" />
              ) : (
                <BsToggle2On fontSize={"25px"} color="blue" />
              )}
            </Box>
          </Box>
          // big display
          <Box display={{ xl: "none", md: "none" }}>
            <IconButton
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <GiHamburgerMenu />}
              aria-label={"Open Menu"}
              onClick={isOpen ? onClose : onOpen}
            />

            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />

                <DrawerBody>
                  {!isAuth && (
                    <Flex
                      alignItems={"center"}
                      justifyContent={"space-evenly"}
                      my={8}
                    >
                      <Link to="/signup">
                        <Button
                          color={"#fff"}
                          bg="blue"
                          onClick={onClose}
                          colorScheme={"#fff"}
                          minW={"100px"}
                        >
                          SIGNUP
                        </Button>
                      </Link>

                      <Link to="/login">
                        <Button
                          color={"#fff"}
                          bg="blue"
                          onClick={onClose}
                          minW={"100px"}
                        >
                          LOGIN
                        </Button>
                      </Link>
                    </Flex>
                  )}
                  <hr />
                  <Flex mt="10px">
                    <Text>Toggle Theme</Text>
                    <Spacer />
                    <Box onClick={() => toggleColorMode()}>
                      {colorMode === "light" ? (
                        <BsToggle2Off fontSize={"30px"} color="black" />
                      ) : (
                        <BsToggle2On fontSize={"30px"} color="blue" />
                      )}
                    </Box>
                  </Flex>
                  <hr />
                  {isAuth && (
                    <Link to="/">
                      <Text onClick={onClose} m={3} fontSize={"14px"}>
                        Notes
                      </Text>
                    </Link>
                  )}
                  <hr />
                  <Link to="#">
                    {" "}
                    <Text onClick={onClose} m={3} fontSize={"14px"}>
                      About
                    </Text>
                  </Link>
                  <hr />
                  <Link to="#">
                    {" "}
                    <Text onClick={onClose} m={3} fontSize={"14px"}>
                      Contact
                    </Text>
                  </Link>
                  <hr />
                  <br />

                  {isAuth && (
                    <Button
                      onClick={handleLogoutOnClick}
                      minW={"100px"}
                      variant={"outline"}
                      colorScheme={"red"}
                    >
                      LOGOUT
                    </Button>
                  )}
                </DrawerBody>

                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box>
        </HStack>
        {/* TOGGLE COLOR MODE FOR SMALL SCREEN ICONS  */}
      </Flex>
    </Box>
  );
}
