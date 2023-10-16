import {
  Box,
  Button,
  Select,
  FormControl,
  FormLabel,
  Stack,
  Input,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputField } from "../../../../components/input/InputField";
import { toast, ToastContainer } from "react-toastify";
import axios from "../../../../api/axios";
import headersGen from "../../../../api/headers";
import * as Yup from "yup";

export const AddWarehouse = ({
  dataCities,
  dataProvince,
  reload,
  setReload,
  onClose,
}) => {
  const token = localStorage.getItem("token");
  const headers = headersGen(token);
  const WarehouseSchema = Yup.object().shape({
    name: Yup.string().required("Warehouse name is required"),
    address: Yup.string().required("Please fill address detail"),
    kota: Yup.number().required("City is required"),
    provinsi: Yup.string().required("Province is required"),
    kode_pos: Yup.string().required("Postal code is required"),
    file: Yup.mixed().required("Please choose warehouse image"),
  });
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("kota", data.kota);
      formData.append("provinsi", data.provinsi);
      formData.append("kode_pos", data.kode_pos);
      await axios.post(`/warehouse`, formData, { headers });
      toast.success("Warehouse added successfully");
      onClose();
      setReload(!reload);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          address: "",
          kota: "",
          provinsi: "",
          kode_pos: "",
          file: null,
        }}
        validationSchema={WarehouseSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
          onClose();
        }}
      >
        {(props) => (
          <Box as={Form}>
            <FormControl>
              <InputField
                label="Name"
                name="name"
                id="name"
                className="name"
                mb="10px"
                placeholder="Enter warehouse name"
              />
            </FormControl>
            <FormControl>
              <InputField
                label="Addess"
                name="address"
                id="address"
                className="address"
                mb="10px"
                placeholder="Enter warehouse address"
              />
            </FormControl>
            <FormControl>
              <FormLabel textColor={"black"}>Province</FormLabel>
              <Field
                as={Select}
                placeholder="Select province"
                name="provinsi"
                onChange={(e) => {
                  const selectedProvinceId = e.target.value;
                  props.setFieldValue("provinsi", selectedProvinceId);
                  props.setFieldValue("kota", "");
                }}
                value={props.values.provinsi}
              >
                {dataProvince?.map((province) => (
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
                  .filter((city) => city.province_id === props.values.provinsi)
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
            <FormControl>
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
            <FormControl>
              <FormLabel textColor={"black"}>Image</FormLabel>
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
              <ErrorMessage
                component="div"
                name="file"
                style={{ color: "red" }}
              />
            </FormControl>
            <Stack direction="row" spacing="2" mt="3" justifyContent="flex-end">
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={() => props.handleSubmit()}>
                Add
              </Button>
            </Stack>
          </Box>
        )}
      </Formik>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
};
