import { AddIcon, SpinnerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import {
  deleteNoteActionFn,
  editNoteActionFn,
  getNotesActionFn,
  postNoteActionFn,
} from "../redux/noteReducer/notesActions";

const initNote = {
  title: "",
  description: "",
};
const Home = () => {
  const dispatch = useDispatch();
  const [newNote, setNewNote] = useState(initNote);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, isError, notes } = useSelector(
    (store) => store.notesReducer
  );

  // handle onchage on newNote;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };
  // add new note function;
  const addNewNoteOnClick = () => {
    let { title, description } = newNote;
    if (!title || !description) return;
    dispatch(postNoteActionFn(newNote))
      .then((res) => {
        console.log("res:new note: ", res);
        onClose();
        getNotes();
      })
      .catch((err) => {
        console.log("newnote err: ", err);
      });
  };
  //   console.log("newNote: ", newNote);

  const deleteNoteOnClick = (id) => {
    dispatch(deleteNoteActionFn(id))
      .then((res) => {
        getNotes();
      })
      .catch((err) => {
        console.log("err");
      });
  };
  // handle update
  const editNote = (id, data) => {
    let { title, description } = data;
    if (!title || !description) return;
    dispatch(editNoteActionFn(id, data))
      .then((res) => {
        onClose();
        getNotes();
      })
      .catch((err) => {
        console.log("err: ");
      });
  };

  function getNotes() {
    dispatch(getNotesActionFn());
  }

  useEffect(() => {
    getNotes();
  }, []);
  // console.log("store:Home: ", notes.notes);

  return (
    <Box zIndex={1} px={["2%", "5%", "7%"]} mt={"25px"}>
      {isLoading && <Box as="span"> Loading... </Box>}
      {isError && (
        <Box as="span" color={"red"}>
          Error found!
        </Box>
      )}
      <Button
        onClick={onOpen}
        my={"8px"}
        colorScheme={"blue"}
        rightIcon={<AddIcon />}
      >
        Add new Note
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new Note</ModalHeader>
          <ModalCloseButton colorScheme={"red"} />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                onChange={handleOnChange}
                value={newNote.title}
                placeholder="Title"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                onChange={handleOnChange}
                value={newNote.description}
                mb={4}
                placeholder="Description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant={"outline"}
              mr={3}
              onClick={onClose}
              colorScheme={"red"}
            >
              Close
            </Button>
            <Button
              isLoading={isLoading}
              onClick={addNewNoteOnClick}
              colorScheme={"blue"}
            >
              {isLoading ? <SpinnerIcon /> : "ADD"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid columns={[1, 2, 4]} spacingX="40px" spacingY="20px">
        {notes?.notes?.length > 0 &&
          notes?.notes.map((note, idx) => (
            <Card
              deleteNoteOnClick={deleteNoteOnClick}
              editNote={editNote}
              key={idx}
              note={note}
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
