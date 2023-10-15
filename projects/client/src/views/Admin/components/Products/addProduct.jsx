import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Formik, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { InputField } from "../../../../components/input/InputField";
import { TextareaField } from "../../../../components/input/TextAreaField";
import { SelectField } from "../../../../components/input/SelectField";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import axios from "../../../../api/axios";
import headersGen from "../../../../api/headers";

export const AddProduct = ({ isOpen, onClose, category, reload }) => {
  const token = localStorage.getItem("token");
  const ProductSchema = Yup.object().shape({
    product: Yup.string().required("Product's name is required"),
    description: Yup.string().required("Please enter product description"),
    price: Yup.number()
      .required("Please enter product's price")
      .min(1000, "Please enter product's price"),
    weight: Yup.number().required("Please enter product's weight"),
    category: Yup.number().required("Please enter product's category"),
    file: Yup.mixed().required("Please choose product image"),
  });
  const initialValues = {
    product: "",
    description: "",
    category: "",
    price: "",
    weight: "",
    file: "",
  };
  const headers = headersGen(token);
  const handleSubmit = async (value) => {
    const data = new FormData();
    data.append("name", value.product);
    data.append("description", value.description);
    data.append("categoryId", value.category);
    data.append("price", value.price);
    data.append("file", value.file);
    data.append("weight", value.weight);
    try {
      const response = await axios.post("/product", data, { headers });
      toast.success("successfully added new product", {
        position: "top-right",
        autoClose: 3000,
      });
      onClose();
      reload();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add new product", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={initialValues}
              validationSchema={ProductSchema}
              onSubmit={(value, action) => {
                handleSubmit(value);
              }}
            >
              {(props) => (
                <Flex as={Form} direction="column" w="full">
                  <InputField
                    label="Product Name"
                    name="product"
                    id="product"
                    className="product"
                    type="text"
                    placeholder="Product Name"
                  />
                  <TextareaField
                    label="Product Description"
                    name="description"
                    id="description"
                    className="description"
                    type="text"
                    placeholder="Product Description"
                  />
                  <SelectField
                    label="Product Category"
                    name="category"
                    id="category"
                    className="category"
                    placeholder="Product Category"
                  >
                    {category?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </SelectField>
                  <InputField
                    label="Product Price"
                    name="price"
                    id="price"
                    className="price"
                    type="text"
                    placeholder="0"
                  />
                  <InputField
                    label="Product Weight"
                    name="weight"
                    id="weight"
                    className="weight"
                    type="text"
                    placeholder="0"
                  />
                  <FormControl>
                    <FormLabel textColor={"black"}>Image</FormLabel>
                    <ErrorMessage
                      component="div"
                      name="file"
                      style={{ color: "red" }}
                    />
                    <Input
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                          const allowedFileTypes = [
                            "image/jpeg",
                            "image/jpg",
                            "image/png",
                            "image/gif",
                          ];
                          if (allowedFileTypes.includes(selectedFile.type)) {
                            props.setFieldValue("file", selectedFile);
                          } else {
                            toast.error(
                              "Invalid file type. Please select a valid image file.",
                              {
                                position: toast.POSITION.TOP_RIGHT,
                                autoClose: 2000,
                              }
                            );
                          }
                        }
                      }}
                      variant="flushed"
                      type="file"
                      name="file"
                      placeholder="Choose file"
                      mb={4}
                      bgColor={"white"}
                      accept=".jpg, .jpeg, .png, .gif"
                    />
                  </FormControl>
                  <Flex justifyContent="flex-end" gap={2}>
                    <Button
                      onClick={onClose}
                      mt={4}
                      bg={"red.500"}
                      color={"white"}
                      _hover={{ bg: "red.700" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      mt={4}
                      bg="#517664"
                      color="white"
                      _hover={{ bg: "#2d3319" }}
                    >
                      + Add Product
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
