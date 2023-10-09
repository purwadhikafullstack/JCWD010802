import { useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputField } from "../../../../../components/input/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import axios from "../../../../../api/axios";
import headersGen from "../../../../../api/headers";

export const EditAddress = ({
  id,
  dataCities,
  dataProvince,
  address,
  province,
  city,
  postal,
  onOpen,
  onClose,
  reload,
  setReload
}) => {
  const finalRef = useRef(null);
  const token = localStorage.getItem("token");
  const headers = headersGen(token)
  const CreateSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    kota: Yup.string().required("City is required"),
    provinsi: Yup.string().required("Province is required"),
    kode_pos: Yup.string().required("Postal code is required"),
  });

  const handleSubmit = async (data) => {
    try {
      const response = await axios.patch(`/address/update/${id}`, data, { headers }
      );
      toast.success("Address updated successfully");
      setReload(!reload)
      onClose();

      console.log(response);
    } catch (error) {
      toast.error("Error updating address");
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{
        address: address,
        provinsi: `${province}`,
        kota: `${city}`,
        kode_pos: postal,
      }}
      validationSchema={CreateSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        handleSubmit(values);
        actions.resetForm();
        onClose();
      }}
    >
      {(props) => (
        <Box as={Form}>
          <Modal
            finalFocusRef={finalRef}
            isOpen={onOpen}
            onClose={() => {
              onClose();
              props.resetForm();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit address</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box as={Form}>
                  <FormControl>
                    <InputField
                      label="Address"
                      name="address"
                      id="address"
                      className="address"
                      mb="10px"
                      placeholder="Enter your address"
                    />
                    <FormControl>
                      <FormLabel textColor={"black"}>Province</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select province"
                        name="provinsi"
                        onChange={(e) => {
                          const selectedProvinceId = e.target.value;
                          props.setFieldValue("provinsi", selectedProvinceId);
                        }}
                        value={props.values.provinsi}
                      >
                        {dataProvince.map((province) => (
                          <option
                            key={province.province_id}
                            value={province.province_id}
                          >
                            {province.province}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="provinsi"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel textColor={"black"}>City</FormLabel>
                      <Field
                        as={Select}
                        placeholder="Select city"
                        name="kota"
                        onChange={(e) => {
                          const selectedCityId = e.target.value;
                          props.setFieldValue("kota", selectedCityId);
                        }}
                        value={props.values.kota}
                      >
                        {dataCities
                          .filter(
                            (city) => city.province_id === props.values.provinsi
                          )
                          .map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                              {city.city_name}
                            </option>
                          ))}
                      </Field>
                      <ErrorMessage
                        component="div"
                        name="kota"
                        style={{ color: "red" }}
                      />
                    </FormControl>
                    <InputField
                      label="Postal code "
                      type="number"
                      name="kode_pos"
                      id="kode_pos"
                      className="kode_pos"
                      mb="10px"
                      placeholder="Input your postal code"
                    />
                  </FormControl>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  onClick={props.handleSubmit}
                >
                  Accept
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </Box>
      )}
    </Formik>
  );
};
