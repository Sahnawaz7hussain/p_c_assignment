import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

const initData = {
  title: "",
  description: "",
};

const Card = ({ note, deleteNoteOnClick, editNote }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateData, setUpdateData] = useState(initData);
  // console.log("note: ", note);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  return (
    <Box
      zIndex={2}
      pos={"relative"}
      minH={"150px"}
      w={"auto"}
      border={"1px solid blue"}
      borderRadius={"8px"}
      h={"auto"}
      py={"10px"}
      key={note._id}
    >
      <Heading textAlign={"center"} size={"md"}>
        {note.title}
      </Heading>
      <Text my={5} textAlign={"center"}>
        {note.description}
      </Text>
      <Flex
        pos={"absolute"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        gap={"2px"}
        mt={5}
        bottom={0}
        right={0}
      >
        <IconButton
          onClick={onOpen}
          fontSize={"15px"}
          bg={"transparent"}
          variant={"outline"}
          colorScheme={"blue"}
          border={"none"}
          mb={0}
          icon={<EditIcon />}
        />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Note</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  onChange={handleOnChange}
                  value={updateData.title}
                  placeholder="Title"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  onChange={handleOnChange}
                  value={updateData.description}
                  placeholder="description"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={() => editNote(note._id, updateData)}
                colorScheme="blue"
                mr={3}
              >
                Edit
              </Button>
              <Button colorScheme={"red"} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <IconButton
          onClick={() => deleteNoteOnClick(note._id)}
          fontSize={"15px"}
          bg={"transparent"}
          variant={"outline"}
          colorScheme={"red"}
          border={"none"}
          mb={0}
          icon={<DeleteIcon />}
        />
      </Flex>
    </Box>
  );
};

export default Card;
