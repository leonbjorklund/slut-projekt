import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useProducts } from "../context/productContext";

interface Props {
  productId: string;
}

function AlertDialogDelete({ productId }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef<HTMLButtonElement | null>(null);
  const { deleteProduct } = useProducts();

  const handleDelete = () => {
    deleteProduct(productId);
    onClose();
  };

  return (
    <>
      <Icon
        data-cy='admin-remove-product'
        onClick={onOpen}
        bg='base.100'
        color='black'
        borderRadius='none'
        boxSize={8}
        as={AiOutlineDelete}
        _hover={{ bg: "none", transform: "scale(1.2)" }}
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Are you sure you want to delete this product?
            </AlertDialogHeader>

            <AlertDialogBody>You can not undo this action.</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant='outline'
                borderColor='yellow.400'
                color='black'
                borderRadius='none'
                borderWidth='2px'
                ref={cancelRef}
                onClick={onClose}
              >
                Exit
              </Button>
              <Button
                data-cy='confirm-delete-button'
                colorScheme='red'
                onClick={handleDelete}
                ml={3}
                borderColor='red'
                borderRadius='none'
                borderWidth='2px'
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AlertDialogDelete;
