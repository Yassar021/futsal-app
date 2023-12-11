import React, { useEffect, useRef, useState } from 'react'
import LayoutVenue from '../../../layout/LayoutVenue'
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Center, Container, Flex, Spinner, Stack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchAddField, fetchDeleteField, fetchEditField, fetchField, fetchFieldTypes } from '../../../store/reducers/venueFields'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import FieldAddModal from './addModal'
import FieldEditModal from './editModal'
import { VenueField } from '../../../types/type'

function VenueFields() {
  const { isLoading, list, types } = useAppSelector(state => state.venueField)
  const dispatch = useAppDispatch();


  const alertRef = useRef();
  const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();

  const { isOpen: isAddModalOpen, onOpen: openAddModal, onClose: closeAddModal } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure();

  const [selectedField, setSelectedField] = useState<VenueField | null>(null);

  useEffect(() => {
    dispatch(fetchField());
    dispatch(fetchFieldTypes());
  }, [])

  const handleAdd = async (data: { name: string, type_id: number }) => {
    await dispatch(fetchAddField(data));
    closeAddModal();
  }

  const handleDelete = (field: VenueField) => {
    setSelectedField(field)
    openAlert()
  }

  const handleDeleteConfirm = async () => {
    await dispatch(fetchDeleteField(selectedField.id))
    closeAlert();
    setSelectedField(null);
  }

  const handleEdit = async (data: { id: number, name: string, type_id: number }) => {
    await dispatch(fetchEditField(data));
    setSelectedField(null)
    closeEditModal();
  }

  return (
    <LayoutVenue pageTitle={'Atur Lapangan'}>
      <Container maxW='6xl'>
        <Box mb='60px' borderRadius={'5px'} shadow='xl' bgColor={'#fff'} width={'100%'} >
          <Box borderRadius={'5px'} width={'100%'} height='60px' bgColor='#1B262C' py='16px'>
            <Center>

            </Center>
          </Box>
          <Center padding={"30px"}>
            <Stack width={"100%"}>
              <Flex justifyContent={"flex-end"}>
                <Button color='#fff'
                  onClick={openAddModal}
                  leftIcon={<AddIcon />}
                  fontFamily={'DM Sans'}
                  bgColor={'#0F4C75'}
                  _hover={{ bg: '#0F4C75' }}
                  fontWeight={'500'}
                  _active={{
                    bg: '#0F4C75',
                    transform: 'scale(0.98)',
                  }} >
                  Tambah
                </Button>
              </Flex>
              {
                isLoading ?
                  <Spinner />
                  :
                  <TableContainer width={"100%"}>
                    <Table variant='simple'>
                      <Thead>
                        <Tr>
                          <Th>Nama Lapangan</Th>
                          <Th>Jenis Lapangan</Th>
                          <Th>Aksi</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          list.map(item => (
                            <Tr>
                              <Td>{item.name}</Td>
                              <Td>{item.type.name}</Td>
                              <Td>
                                <Stack spacing={4} direction='row' align='center'>
                                  <Button color='#fff'
                                    onClick={() => {
                                      openEditModal()
                                      setSelectedField(item)
                                    }}
                                    fontFamily={'DM Sans'}
                                    bgColor={'#0F4C75'}
                                    _hover={{ bg: '#0F4C75' }}
                                    fontWeight={'500'}
                                    _active={{
                                      bg: '#0F4C75',
                                      transform: 'scale(0.98)',
                                    }} size='xs'>
                                    Edit
                                  </Button>

                                  <Button color='#fff'
                                    onClick={() => handleDelete(item)}
                                    fontFamily={'DM Sans'}
                                    leftIcon={<DeleteIcon />}
                                    colorScheme='red'
                                    fontWeight={'500'}
                                    size='xs'>
                                    Hapus
                                  </Button>
                                </Stack>
                              </Td>
                            </Tr>
                          ))
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
              }
            </Stack>
          </Center>
        </Box>
      </Container>
      {
        isAddModalOpen && <FieldAddModal onSubmit={handleAdd} onClose={closeAddModal} />
      }
      {
        (isEditModalOpen && selectedField) && <FieldEditModal field={selectedField} onSubmit={handleEdit} onClose={closeEditModal} />
      }

      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={alertRef}
        onClose={closeAlert}
        isOpen={isAlertOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Hapus?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Apakah anda yakin?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={alertRef} onClick={() => {
              setSelectedField(null)
              closeAlert()
            }}>
              Batalkan
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleDeleteConfirm}>
              Lanjutkan
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </LayoutVenue>
  )
}

export default VenueFields