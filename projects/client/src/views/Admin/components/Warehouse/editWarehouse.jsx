import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Stack,
  Select,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { InputField } from "../../../../components/input/InputField";
import { toast, ToastContainer } from "react-toastify";
import axios from "../../../../api/axios";

export const EditWarehouse = ({
  data,
  onClose,
  dataCities,
  dataProvince,
  provinces,
  city,
  reload,
  setReload,
}) => {
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("provinsi", values.provinsi);
      formData.append("kota", values.kota);
      formData.append("kode_pos", values.kode_pos);
      formData.append("file", values.file);

      const response = await axios.patch(`/warehouse/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Warehouse updated successfully");
      onClose();
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: data.name,
          address: data.address.address,
          provinsi: provinces,
          kota: city,
          kode_pos: data.address.kode_pos,
          file: data.image,
        }}
        onSubmit={(values, actions) => {
          handleSubmit(values);
          actions.resetForm();
          onClose();
        }}
        enableReinitialize={true}
      >
        {(props) => (
          <Box as={Form}>
            <FormControl>
              <InputField
                label="Warehouse Name"
                name="name"
                id="name"
                className="name"
                mb="10px"
                placeholder="Enter warehouse name"
              />
              <InputField
                label="Warehouse Address"
                name="address"
                id="address"
                className="address"
                mb="10px"
                placeholder="Enter warehouse address"
              />
              <FormControl>
                <FormLabel textColor={"black"}>Province</FormLabel>
                <Field
                  as={Select}
                  placeholder="Select province"
                  name="provinsi"
                  value={props.values.provinsi}
                  onChange={(e) => {
                    const selectedProvinceId = e.target.value;
                    props.setFieldValue("provinsi", selectedProvinceId);
                  }}
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
              </FormControl>
              <FormControl>
                <FormLabel textColor={"black"}>City</FormLabel>
                <Field
                  as={Select}
                  placeholder="Select city"
                  name="kota"
                  value={props.values.kota}
                  onChange={(e) => {
                    const selectedCityId = e.target.value;
                    props.setFieldValue("kota", selectedCityId);
                  }}
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
              <Stack
                direction="row"
                spacing="2"
                mt="3"
                justifyContent="flex-end"
              >
                <Button
                  colorScheme="green"
                  type="sumbit"
                  onClick={props.handleSubmit}
                  w={"full"}
                >
                  Save
                </Button>
              </Stack>
            </FormControl>
          </Box>
        )}
      </Formik>
    </>
  );
};
