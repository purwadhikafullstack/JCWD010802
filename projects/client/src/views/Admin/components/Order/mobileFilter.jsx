import React, { useState } from 'react';
import {
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  HStack,
  Select,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

export const SuperFilterComponent = ({
    search,
    handleSearch,
    filterWarehouse,
    onFilterWarehouse,
    filterShipping,
    onFilterShipping,
    filterStatus,
    onFilterStatus,
    dateFilter,
    onFilterDate,
    sortDirection,
    onSortDirection,
    handleResetFilter,
    warehouse,
    statusList,
}) => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        variant={'outline'}
        display={{ base: 'block', md: 'none' }} 
      >
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => setIsOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Options</DrawerHeader>
          <DrawerBody>
            <InputGroup>
              <Input
                variant="outline"
                placeholder="Search Invoice Number"
                _placeholder={{ color: 'black' }}
                value={search}
                type={'search'}
                color={'black'}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                borderColor={'2px solid black'}
                w="100%"
              />
              <InputLeftElement>
                <Icon as={BsSearch} color={'gray.500'} />
              </InputLeftElement>
            </InputGroup>

            <Stack p={5} w={'100%'} gap={2}>
            <Select
        placeholder="Warehouse"
        value={filterWarehouse}
        onChange={(e) => onFilterWarehouse(e.target.value)}
        mb={2}
      >
        <option value="">All Warehouse</option>
        {warehouse.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Shipping Method"
        value={filterShipping}
        onChange={(e) => onFilterShipping(e.target.value)}
        mb={2}
      >
        <option value="">All</option>
        <option value="jne">JNE</option>
        <option value="tiki">TIKI</option>
        <option value="pos">POS INDONESIA</option>
      </Select>

      <Select
        placeholder="Status"
        value={filterStatus}
        onChange={(e) => onFilterStatus(e.target.value)}
        mb={2}
      >
        <option value="">All Status</option>
        {statusList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Date Range"
        value={dateFilter}
        onChange={(e) => onFilterDate(e.target.value)}
        mb={2}
      >
        <option value="">All</option>
        <option value="today">Today</option>
        <option value="last7">Last 7 Days</option>
        <option value="last30">Last 30 Days</option>
      </Select>

      <Select
        placeholder="Sort by Date"
        value={sortDirection}
        onChange={(e) => onSortDirection(e.target.value)}
        mb={2}
      >
        <option value="asc">Oldest</option>
        <option value="desc">Newest</option>
      </Select>
              <Button onClick={handleResetFilter} variant={'ghost'}>
                Clear Filter
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

